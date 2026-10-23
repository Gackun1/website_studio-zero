document.documentElement.classList.add("js");

document.addEventListener("DOMContentLoaded", () => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* header: 背景切り替えと下スクロール時の格納 */
  const header = document.querySelector("[data-header]");
  let lastY = window.scrollY;
  const onScroll = () => {
    const y = window.scrollY;
    header.classList.toggle("is-scrolled", y > 40);
    header.classList.toggle("is-hidden", y > 400 && y > lastY && !document.body.classList.contains("menu-open"));
    lastY = y;
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* drawer menu */
  const menuButton = document.querySelector("[data-menu-button]");
  const drawer = document.querySelector("[data-drawer]");
  // メニューを開いている間は背後の本文を操作・フォーカス不可にする
  const background = document.querySelectorAll("#main, .site-footer, .skip-link");
  const setMenu = (open) => {
    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.querySelector(".menu-button__label").textContent = open ? "Close" : "Menu";
    document.body.classList.toggle("menu-open", open);
    document.body.classList.toggle("is-locked", open);
    background.forEach((el) => (el.inert = open));
    if (open) {
      drawer.hidden = false;
      requestAnimationFrame(() => drawer.classList.add("is-open"));
      drawer.querySelector("a").focus();
    } else {
      drawer.classList.remove("is-open");
      setTimeout(() => {
        if (!drawer.classList.contains("is-open")) drawer.hidden = true;
      }, 450);
    }
  };
  menuButton.addEventListener("click", () => setMenu(menuButton.getAttribute("aria-expanded") !== "true"));
  // Tab でドロワーの外（ヘッダーのロゴ・ボタン以外）へ抜けないよう循環させる
  drawer.addEventListener("keydown", (e) => {
    if (e.key !== "Tab") return;
    const links = drawer.querySelectorAll("a");
    if (!e.shiftKey && document.activeElement === links[links.length - 1]) {
      e.preventDefault();
      menuButton.focus();
    }
  });
  menuButton.addEventListener("keydown", (e) => {
    if (e.key !== "Tab" || !document.body.classList.contains("menu-open")) return;
    e.preventDefault();
    const links = drawer.querySelectorAll("a");
    (e.shiftKey ? links[links.length - 1] : links[0]).focus();
  });
  drawer.addEventListener("click", (e) => {
    if (e.target.closest("a")) setMenu(false);
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && document.body.classList.contains("menu-open")) {
      setMenu(false);
      menuButton.focus();
    }
  });
  window.matchMedia("(min-width: 901px)").addEventListener("change", (e) => {
    if (e.matches) setMenu(false);
  });

  /* hero slideshow */
  const slides = document.querySelectorAll(".hero__slide");
  // 閲覧中に「視差効果を減らす」が有効になった場合も再生を止める
  const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (slides.length > 1) {
    let current = 0;
    let paused = false;
    const toggle = document.querySelector("[data-hero-toggle]");
    toggle.addEventListener("click", () => {
      paused = !paused;
      toggle.setAttribute("aria-pressed", String(paused));
      toggle.textContent = paused ? "Play" : "Pause";
      toggle.closest(".hero").classList.toggle("is-paused", paused);
    });
    setInterval(() => {
      if (document.hidden || paused || motionQuery.matches) return;
      slides[current].classList.remove("is-active");
      current = (current + 1) % slides.length;
      const next = slides[current];
      next.loading = "eager";
      next.classList.add("is-active");
    }, 6000);
  }

  /* reveal on scroll */
  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !reduceMotion) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8% 0px" }
    );
    reveals.forEach((el, i) => {
      el.style.transitionDelay = `${(i % 4) * 90}ms`;
      io.observe(el);
    });
  } else {
    reveals.forEach((el) => el.classList.add("is-visible"));
  }

  /* gallery filter */
  const filter = document.querySelector("[data-filter]");
  const items = [...document.querySelectorAll(".gallery-item")];
  if (filter) {
    const known = new Set([...filter.querySelectorAll("button")].map((b) => b.dataset.cat));
    const apply = (cat) => {
      if (!known.has(cat)) cat = "all";
      filter.querySelectorAll("button").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.cat === cat)));
      items.forEach((item) => {
        item.hidden = cat !== "all" && item.dataset.cat !== cat;
      });
    };
    filter.addEventListener("click", (e) => {
      const button = e.target.closest("button");
      if (!button) return;
      apply(button.dataset.cat);
      history.replaceState(null, "", button.dataset.cat === "all" ? location.pathname : `#${button.dataset.cat}`);
    });
    apply(location.hash.slice(1) || "all");
    window.addEventListener("hashchange", () => apply(location.hash.slice(1) || "all"));
  }

  /* lightbox */
  const dialog = document.querySelector("[data-lightbox-dialog]");
  if (dialog && typeof dialog.showModal === "function") {
    const q = (s) => dialog.querySelector(s);
    const img = q("[data-lb-img]");
    let index = -1;
    const visible = () => items.filter((i) => !i.hidden).map((i) => i.querySelector("[data-lightbox]"));
    const show = (btn) => {
      const d = btn.dataset;
      img.src = d.src;
      img.alt = d.title;
      q("[data-lb-title]").textContent = d.title;
      q("[data-lb-cat]").textContent = d.catLabel;
      q("[data-lb-date]").textContent = d.date;
      q("[data-lb-caption]").textContent = d.caption;
      q("[data-lb-link]").href = d.href;
      index = visible().indexOf(btn);
    };
    const step = (dir) => {
      const list = visible();
      show(list[(index + dir + list.length) % list.length]);
    };
    let opener = null;
    document.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-lightbox]");
      if (!btn) return;
      opener = btn;
      show(btn);
      dialog.showModal();
      document.body.classList.add("is-locked");
    });
    q("[data-lb-prev]").addEventListener("click", () => step(-1));
    q("[data-lb-next]").addEventListener("click", () => step(1));
    q("[data-lb-close]").addEventListener("click", () => dialog.close());
    dialog.addEventListener("click", (e) => {
      if (e.target === dialog || e.target.classList.contains("lightbox__inner")) dialog.close();
    });
    dialog.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") step(-1);
      if (e.key === "ArrowRight") step(1);
    });
    dialog.addEventListener("close", () => {
      document.body.classList.remove("is-locked");
      if (opener) opener.focus();
    });
    // 画像上の一本指の横スワイプだけを作品送りとして扱う
    const figure = q(".lightbox__figure");
    let touch = null;
    figure.addEventListener(
      "touchstart",
      (e) => {
        touch = e.touches.length === 1 ? { id: e.touches[0].identifier, x: e.touches[0].clientX, y: e.touches[0].clientY } : null;
      },
      { passive: true }
    );
    figure.addEventListener("touchend", (e) => {
      const t = touch && [...e.changedTouches].find((c) => c.identifier === touch.id);
      if (t && e.touches.length === 0) {
        const dx = t.clientX - touch.x;
        const dy = t.clientY - touch.y;
        if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) step(dx > 0 ? -1 : 1);
      }
      touch = null;
    });
    figure.addEventListener("touchcancel", () => (touch = null));
  }

  /* contact: DM 用の文面を作る */
  const form = document.querySelector("[data-template-form]");
  if (form) {
    const work = new URLSearchParams(location.search).get("work");
    if (work) {
      form.querySelector("[data-work-input]").value = work.replace(/^MASUKU-(\d+)$/, "“MASUKU” -$1-");
      form.type.value = "作品の購入について";
    }
    const output = form.querySelector("[data-template-output]");
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const f = form.elements;
      const lines = [
        "実験空間 Studio Zero 東條様",
        "",
        `【ご用件】${f.type.value}`,
        f.work.value.trim() ? `【作品】${f.work.value.trim()}` : null,
        "",
        f.body.value.trim(),
        "",
        f.name.value.trim(),
        f.reply.value.trim() ? `連絡先：${f.reply.value.trim()}` : null,
      ].filter((l) => l !== null);
      const text = lines.join("\n");
      output.textContent = text;
      try {
        await navigator.clipboard.writeText(text);
        form.querySelector('[type="submit"]').textContent = "コピーしました";
      } catch {
        form.querySelector('[type="submit"]').textContent = "上の文面を選択してコピーしてください";
      }
    });
  }
});

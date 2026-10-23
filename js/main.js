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
  const setMenu = (open) => {
    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.querySelector(".menu-button__label").textContent = open ? "Close" : "Menu";
    document.body.classList.toggle("menu-open", open);
    document.body.classList.toggle("is-locked", open);
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
  if (slides.length > 1 && !reduceMotion) {
    let current = 0;
    setInterval(() => {
      if (document.hidden) return;
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
    const apply = (cat) => {
      if (!filter.querySelector(`[data-cat="${cat}"]`)) cat = "all";
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
    let touchX = null;
    dialog.addEventListener("touchstart", (e) => (touchX = e.touches[0].clientX), { passive: true });
    dialog.addEventListener("touchend", (e) => {
      if (touchX === null) return;
      const dx = e.changedTouches[0].clientX - touchX;
      if (Math.abs(dx) > 60) step(dx > 0 ? -1 : 1);
      touchX = null;
    });
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

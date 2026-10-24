// 静的ページ生成スクリプト（依存パッケージなし）。
// 使い方: node scripts/build.mjs  → ルート直下と product/ 以下の HTML を書き出す。
import { writeFileSync, mkdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { site, nav, masuku, categories, works, activities } from "./data.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const posts = JSON.parse(readFileSync(join(root, "scripts/posts.json"), "utf8"));
const year = new Date().getFullYear();

const esc = (s = "") =>
  String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
const igUrl = (id) => `https://www.instagram.com/p/${posts[id].code}/`;
const fmtDate = (iso) => iso.replaceAll("-", ".");
const catLabel = Object.fromEntries(categories.map((c) => [c.key, c.label]));

const icon = {
  instagram:
    '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="12" cy="12" r="4.2" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="17.4" cy="6.6" r="1.1" fill="currentColor"/></svg>',
  facebook:
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M13.5 21v-7.6h2.6l.4-3h-3V8.5c0-.9.3-1.5 1.5-1.5h1.6V4.3c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4V10.4H8v3h2.4V21h3.1z"/></svg>',
  arrow:
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h15m-5-5 5 5-5 5" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>',
  ext: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 4h6v6m0-6-9 9M18 14v6H4V6h6" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>',
};

const stamps = ["038", "002", "078", "036", "065", "022", "025", "000", "040", "023"];

function layout({ path, title, description = site.description, body, bodyClass = "", ogImage = "images/ogp.jpg", jsonLd, absolute = false }) {
  const depth = path.split("/").length - 1;
  // 404 はどの階層の URL でも表示されるため、パスを絶対 URL にする
  const b = absolute ? site.url : "../".repeat(depth);
  const canonical = site.url + path.replace(/index\.html$/, "");
  const fullTitle = title ? `${title} | ${site.name}` : `${site.name} — 地方の街角からだって、何かを発信したい。`;
  // はがきの切手にはページごとに違う作品を貼る
  const stamp = stamps[[...path].reduce((n, c) => n + c.charCodeAt(0), 0) % stamps.length];
  const current = (href) => (path === href ? ' aria-current="page"' : "");
  const navLinks = nav
    .map((n) => `<li><a href="${b}${n.href}"${current(n.href)}><span class="en">${n.label}</span><span class="ja">${n.ja}</span></a></li>`)
    .join("");
  return `<!doctype html>
<html lang="ja">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
${absolute ? `<meta name="robots" content="noindex">` : ""}
<title>${esc(fullTitle)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${canonical}">
<meta property="og:type" content="${path === "index.html" ? "website" : "article"}">
<meta property="og:site_name" content="${esc(site.name)}">
<meta property="og:title" content="${esc(fullTitle)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${site.url}${ogImage}">
<meta property="og:locale" content="ja_JP">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#111418">
<link rel="icon" href="${b}images/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="${b}images/apple-touch-icon.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400;1,500&family=Shippori+Mincho:wght@400;500;600&family=Zen+Kaku+Gothic+New:wght@400;500&display=swap">
<link rel="stylesheet" href="${b}css/style.css">
<script src="${b}js/main.js" defer></script>
${jsonLd ? `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>` : ""}
</head>
<body class="${bodyClass}">
<a class="skip-link" href="#main">本文へスキップ</a>
<header class="site-header" data-header>
  <div class="site-header__inner">
    <a class="site-header__logo" href="${b}index.html" aria-label="${esc(site.name)} ホーム">
      <img class="logo-dark" src="${b}images/logo.png" alt="" width="800" height="163">
      <img class="logo-light" src="${b}images/logo-white.png" alt="" width="800" height="163">
    </a>
    <nav class="site-nav" aria-label="メインメニュー">
      <ul>${nav
        .filter((n) => n.href !== "index.html")
        .map((n) => `<li><a href="${b}${n.href}"${current(n.href)}>${n.label}</a></li>`)
        .join("")}</ul>
    </nav>
    <button class="menu-button" type="button" aria-expanded="false" aria-controls="drawer" data-menu-button>
      <span class="menu-button__label">Menu</span><span class="menu-button__icon" aria-hidden="true"><i></i><i></i></span>
    </button>
  </div>
</header>
<div class="drawer" id="drawer" data-drawer hidden>
  <nav aria-label="メニュー"><ul>${navLinks}</ul></nav>
  <div class="drawer__sns">
    <a href="${site.instagram}" target="_blank" rel="noopener">${icon.instagram}<span>Instagram</span></a>
    <a href="${site.facebook}" target="_blank" rel="noopener">${icon.facebook}<span>Facebook</span></a>
  </div>
</div>
<main id="main">
${body}
</main>
<footer class="site-footer">
  <div class="site-footer__cta">
    <div class="site-footer__note">
      <p class="eyebrow">Contact</p>
      <p class="site-footer__lead">作品の購入や展示のご相談は、<br>Instagram の DM で受け付けています。</p>
    </div>
    <div class="postcard">
      <span class="postcard__stamp"><img src="${b}images/works/w${stamp}-sm.webp" alt="" width="540" height="675" loading="lazy" decoding="async"></span>
      <span class="postcard__zip" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i><i></i></span>
      <p class="postcard__to"><span>実験空間 Studio Zero</span>東條麗子 様</p>
      <ul class="postcard__from">
        <li><a href="${site.instagram}" target="_blank" rel="noopener">Instagram で送る</a></li>
        <li><a href="${site.facebook}" target="_blank" rel="noopener">Facebook</a></li>
        <li><a href="${b}contact.html">文面をつくる</a></li>
      </ul>
    </div>
  </div>
  <div class="site-footer__body">
    <a class="site-footer__logo" href="${b}index.html"><img src="${b}images/logo-white.png" alt="${esc(site.name)}" width="800" height="163" loading="lazy"></a>
    <nav aria-label="フッターメニュー"><ul>${nav
      .map((n) => `<li><a href="${b}${n.href}">${n.label}</a></li>`)
      .join("")}</ul></nav>
    <div class="site-footer__sns">
      <a href="${site.instagram}" target="_blank" rel="noopener" aria-label="Instagram">${icon.instagram}</a>
      <a href="${site.facebook}" target="_blank" rel="noopener" aria-label="Facebook">${icon.facebook}</a>
    </div>
  </div>
  <p class="site-footer__copy"><small>&copy; ${year} Studio Zero / Reiko Tojo. All artworks &copy; Reiko Tojo.</small><small>Site by Gaku Yoshikawa</small></p>
</footer>
</body>
</html>
`;
}

const sectionHead = (no, en, ja) =>
  `<header class="section-head"><h2 class="section-head__title"><span class="en">${en}</span><span class="ja">${ja}</span></h2></header>`;

const workImg = (id, alt, { sizes = "(min-width: 960px) 25vw, 50vw", eager = false, b = "" } = {}) =>
  `<img src="${b}images/works/w${id}-sm.webp" srcset="${b}images/works/w${id}-sm.webp 540w, ${b}images/works/w${id}.webp 1080w" sizes="${sizes}" alt="${esc(alt)}" width="540" height="675"${eager ? "" : ' loading="lazy" decoding="async"'}>`;

const masukuCard = (m, b = "") => `<li class="masuku-card reveal">
  <a href="${b}product/mask${m.no}/index.html">
    <figure>
      <div class="masuku-card__img"><img src="${b}images/masuku/${m.no}-sm.webp" alt="“MASUKU” -${m.no}- ${esc(m.material)}" width="560" height="560" loading="lazy" decoding="async"></div>
      <figcaption>
        <span class="masuku-card__no">-${m.no}-</span>
        <span class="masuku-card__meta">${esc(m.material)}</span>
        <span class="masuku-card__price">${m.price}</span>
      </figcaption>
    </figure>
  </a>
</li>`;

/* ---------- Home ---------- */
// トップのカルーセルに並べる作品（ギャラリーの id）
const heroSlides = ["038", "002", "078", "022", "000", "065", "025"];
const home = layout({
  path: "index.html",
  title: "",
  bodyClass: "is-home",
  jsonLd: {
    "@context": "https://schema.org",
    "@type": "ArtGallery",
    name: site.name,
    url: site.url,
    description: site.description,
    image: site.url + "images/ogp.jpg",
    founder: { "@type": "Person", name: "東條麗子", alternateName: "Reiko Tojo" },
    sameAs: [site.instagram, site.facebook],
  },
  body: `
<section class="hero" aria-labelledby="hero-title" data-hero>
  <div class="hero__stage" role="group" aria-label="作品" data-hero-stage>
    ${heroSlides
      .map((id, i) => {
        const w = works.find((x) => x.id === id);
        return `<button type="button" class="hero__panel${i === 0 ? " is-active" : ""}" aria-label="${esc(w.title)}"${i === 0 ? ' aria-current="true"' : ""} data-hero-panel>
      <img src="images/works/w${id}.webp" alt="" width="1080" height="1350"${i === 0 ? ' fetchpriority="high"' : ' loading="lazy" decoding="async"'}>
      <span class="hero__tate" aria-hidden="true">${esc(w.title)}</span>
      <span class="hero__cap" aria-hidden="true"><span><span class="hero__cap-title">${esc(w.title)}</span></span><span><span class="hero__cap-meta">${categories.find((c) => c.key === w.cat).en} — ${posts[id].date.slice(0, 4)}</span></span></span>
    </button>`;
      })
      .join("\n    ")}
  </div>
  <div class="hero__bar">
    <h1 class="hero__title" id="hero-title"><span class="hero__title-ja">実験空間</span><span class="hero__title-en">Studio Zero</span></h1>
    <p class="hero__lead">地方の街角からだって、何かを発信したい。</p>
    <div class="hero__ctrl">
      <p class="hero__count"><b data-hero-index>01</b> / ${String(heroSlides.length).padStart(2, "0")}</p>
      <span class="hero__progress" aria-hidden="true" data-hero-progress><i></i></span>
      <button class="hero__toggle" type="button" aria-pressed="false" data-hero-toggle>Pause</button>
    </div>
  </div>
</section>

<section class="intro section" id="intro">
  <div class="container intro__grid">
    ${sectionHead("01", "About", "スタジオについて")}
    <div class="intro__body reveal">
      <h3 class="intro__title">モノづくりを通した、<br>街づくりへの挑戦。</h3>
      <p>実験空間 Studio Zero は、作家・東條麗子が主宰するアートスペースです。17年間にわたり、さまざまな企画展を開催してきました。</p>
      <p>制作しているのは、絵画、オブジェ、そして本人が「手いたずら」と呼ぶ手仕事です。空き缶やジーンズ、胡桃の殻など、身近な素材をよく使います。</p>
      <a class="text-link" href="about.html">スタジオと作家について ${icon.arrow}</a>
    </div>
  </div>
</section>

<section class="feature section section--ink">
  <div class="container">
    ${sectionHead("02", "Exhibition", "企画展『-MASUKU-』")}
    <div class="feature__lead reveal">
      <p>植物、針金、石膏、ジーンズ、新聞紙など、9種類の素材でつくったマスク9点。2020年の企画展です。</p>
      <a class="text-link text-link--light" href="exhibition.html">展覧会を見る ${icon.arrow}</a>
    </div>
    <ul class="masuku-grid">
      ${masuku.map((m) => masukuCard(m)).join("\n")}
    </ul>
  </div>
</section>

<section class="works-preview section">
  <div class="container">
    ${sectionHead("03", "Gallery", "作品")}
    <div class="cat-grid">
      ${[
        ["painting", "039", "黒地に白い線を重ねて描く線描。"],
        ["object", "087", "張り子、ワイヤー、マッチ棒などでつくる立体。"],
        ["season", "044", "門松、しめ飾り、季節の花。"],
        ["tewaza", "022", "空き缶、ジーンズ、胡桃の殻などを使った手仕事。"],
      ]
        .map(
          ([key, id, text]) => `<a class="cat-card reveal" href="gallery.html#${key}">
        <div class="cat-card__img">${workImg(id, catLabel[key])}</div>
        <p class="cat-card__en">${categories.find((c) => c.key === key).en}</p>
        <h3 class="cat-card__title">${catLabel[key]}</h3>
        <p class="cat-card__text">${text}</p>
      </a>`
        )
        .join("\n      ")}
    </div>
    <p class="center"><a class="button" href="gallery.html">すべての作品を見る ${icon.arrow}</a></p>
  </div>
</section>

<section class="activity-preview section section--paper2">
  <div class="container activity-preview__grid">
    ${sectionHead("04", "Activities", "活動記録")}
    <ol class="mini-timeline">
      ${activities
        .flatMap((y) => y.items)
        .slice(0, 5)
        .map(
          (a) => `<li class="reveal"><span class="mini-timeline__date">${a.date}</span><span class="mini-timeline__title">${esc(a.title)}</span></li>`
        )
        .join("\n      ")}
    </ol>
    <a class="text-link activity-preview__more" href="activities.html">活動記録をすべて見る ${icon.arrow}</a>
  </div>
</section>

<section class="journal section">
  <div class="container">
    ${sectionHead("05", "Journal", "日々の制作")}
    <div class="journal__head reveal">
      <p>制作の様子や新作は Instagram に載せています。</p>
      <a class="button button--outline" href="${site.instagram}" target="_blank" rel="noopener">${icon.instagram} ${site.instagramHandle}</a>
    </div>
    <ul class="journal-grid">
      ${["000", "003", "004", "005", "008", "012"]
        .map(
          (id) => `<li class="reveal"><a href="${igUrl(id)}" target="_blank" rel="noopener" aria-label="Instagramの投稿を見る（${fmtDate(posts[id].date)}）">${workImg(id, "", { sizes: "(min-width: 960px) 16vw, 33vw" })}<span class="journal-grid__date">${fmtDate(posts[id].date)}</span></a></li>`
        )
        .join("\n      ")}
    </ul>
  </div>
</section>
`,
});

/* ---------- About ---------- */
const about = layout({
  path: "about.html",
  title: "About",
  description: "実験空間 Studio Zero と、主宰する作家・東條麗子（Reiko Tojo）について。",
  jsonLd: {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "東條麗子",
    alternateName: "Reiko Tojo",
    jobTitle: "美術作家",
    sameAs: [site.instagram, site.facebook],
  },
  body: `
<section class="page-hero">
  <div class="container">
    <p class="eyebrow">About</p>
    <h1 class="page-hero__title">スタジオと作家</h1>
  </div>
</section>

<section class="section about-studio">
  <div class="container split">
    <div class="split__img reveal">${workImg("037", "東條麗子による白の線描作品", { sizes: "(min-width: 960px) 45vw, 100vw", eager: true })}</div>
    <div class="split__body reveal">
      <p class="eyebrow">Studio Zero</p>
      <h2 class="h2">地方の街角からだって、<br>何かを発信したい。</h2>
      <p>実験空間 Studio Zero は、作家・東條麗子が主宰するアートスペースです。</p>
      <p>モノづくりを通した街づくりを掲げて、17年間にわたり企画展を開いてきました。</p>
    </div>
  </div>
</section>

<section class="section section--ink artist">
  <div class="container">
    <div class="artist__grid">
      <div class="artist__name reveal">
        <p class="eyebrow">Artist</p>
        <h2 class="artist__ja">東條 麗子</h2>
        <p class="artist__en">Reiko Tojo</p>
      </div>
      <div class="artist__body reveal">
        <p>美術作家。実験空間 Studio Zero 主宰。絵画、オブジェ、そして本人が「手いたずら」と呼ぶ手仕事を制作しています。</p>
        <p>黒地に白い線を重ねる線描は、1点に2週間ほどかかることもあります。2024年の春には、この線描が20枚ほどたまりました。</p>
        <p>2022年、「大地の芸術祭」の里 越後妻有2022冬 SNOWART に、雪アート・新潟ユニットの一員として参加しました。雪の壁を掘ってつくる「雪壁ギャラリー」にも作品を出しています。</p>
        <dl class="artist__facts">
          <div><dt>制作</dt><dd>絵画、オブジェ、手いたずら</dd></div>
          <div><dt>主な素材</dt><dd>紙、墨・インク、ボールペン、張り子、ステンレスワイヤー、ジーンズ、新聞紙、杉、胡桃の殻、空き缶 ほか</dd></div>
          <div><dt>Instagram</dt><dd><a href="${site.instagram}" target="_blank" rel="noopener">${site.instagramHandle}</a></dd></div>
        </dl>
      </div>
    </div>
  </div>
</section>

<section class="section tewaza">
  <div class="container">
    <div class="tewaza__head reveal">
      <p class="eyebrow">Tewaza</p>
      <h2 class="h2">手いたずら</h2>
      <p>飲み終えた缶、履き古したジーンズ、オニグルミの殻、ネックレスの残りのとんぼ玉。東條が「手いたずら」と呼ぶ、身近な素材を使った手仕事です。</p>
    </div>
    <ul class="tewaza__grid">
      ${[
        ["022", "空き缶 → ひまわり"],
        ["052", "ジーンズ → バッグ"],
        ["097", "オニグルミの殻 → 小さな彫刻"],
        ["065", "ネックレスの残りのとんぼ玉 → ワイヤーの樹"],
      ]
        .map(([id, t]) => `<li class="reveal"><figure>${workImg(id, t)}<figcaption>${t}</figcaption></figure></li>`)
        .join("\n      ")}
    </ul>
  </div>
</section>

`,
});

/* ---------- Exhibition ---------- */
const exhibition = layout({
  path: "exhibition.html",
  title: "Exhibition『-MASUKU-』",
  description: "東條麗子による企画展『-MASUKU-』。植物、針金、石膏、ジーンズ、新聞紙など、9つの素材でつくった9点のマスク作品。",
  ogImage: "images/masuku/06.webp",
  bodyClass: "page-dark",
  body: `
<section class="page-hero page-hero--ink">
  <div class="container">
    <p class="eyebrow">Exhibition</p>
    <h1 class="page-hero__title page-hero__title--en">“MASUKU”</h1>
    <p class="page-hero__sub">企画展『-MASUKU-』 / 東條麗子</p>
  </div>
</section>
<section class="section section--ink exhibition-statement">
  <div class="container narrow reveal">
    <p class="statement">植物、針金、石膏、ジーンズ、新聞紙。<br>身のまわりの素材でつくったマスク9点。</p>
    <p>2020年、マスクが毎日の持ち物になった年に制作しました。Studio Zero が17年間続けてきた企画展のひとつです。</p>
  </div>
</section>
<section class="section section--ink">
  <div class="container">
    <ul class="masuku-grid masuku-grid--large">
      ${masuku.map((m) => masukuCard(m)).join("\n")}
    </ul>
    <p class="note">価格は作品の頒布価格です。在庫・お取り置きについては<a href="contact.html">お問い合わせ</a>ください。</p>
  </div>
</section>
`,
});

/* ---------- Product pages ---------- */
const products = masuku.map((m, i) => {
  const prev = masuku[(i + masuku.length - 1) % masuku.length];
  const next = masuku[(i + 1) % masuku.length];
  const b = "../../";
  return [
    `product/mask${m.no}/index.html`,
    layout({
      path: `product/mask${m.no}/index.html`,
      title: `“MASUKU” -${m.no}-`,
      description: `東條麗子『-MASUKU-』展より “MASUKU” -${m.no}-（${m.material}／${m.size}）。${m.text}`,
      ogImage: `images/masuku/${m.no}.webp`,
      bodyClass: "is-product",
      jsonLd: {
        "@context": "https://schema.org",
        "@type": "VisualArtwork",
        name: `“MASUKU” -${m.no}-`,
        creator: { "@type": "Person", name: "東條麗子", alternateName: "Reiko Tojo" },
        artMedium: m.material,
        image: `${site.url}images/masuku/${m.no}.webp`,
        offers: { "@type": "Offer", price: m.price.replace(/[^\d]/g, ""), priceCurrency: "JPY" },
      },
      body: `
<nav class="breadcrumb container" aria-label="パンくずリスト"><ol><li><a href="${b}index.html">Home</a></li><li><a href="${b}exhibition.html">Exhibition</a></li><li aria-current="page">-${m.no}-</li></ol></nav>
<article class="product container">
  <div class="product__img">
    <img src="${b}images/masuku/${m.no}.webp" alt="“MASUKU” -${m.no}-（${esc(m.material)}）" width="1000" height="1000" fetchpriority="high">
  </div>
  <div class="product__body">
    <p class="eyebrow">Exhibition “MASUKU”</p>
    <h1 class="product__title">“MASUKU”<span>-${m.no}-</span></h1>
    <p class="product__text">${esc(m.text)}</p>
    <dl class="spec">
      <div><dt>作家</dt><dd>東條 麗子 / Reiko Tojo</dd></div>
      <div><dt>素材</dt><dd>${esc(m.material)}</dd></div>
      <div><dt>サイズ</dt><dd>${m.size}</dd></div>
      <div><dt>価格</dt><dd>${m.price}</dd></div>
    </dl>
    <a class="button" href="${b}contact.html?work=MASUKU-${m.no}">この作品について問い合わせる ${icon.arrow}</a>
  </div>
</article>
<nav class="pager container" aria-label="前後の作品">
  <a class="pager__prev" href="${b}product/mask${prev.no}/index.html"><span class="pager__label">Prev</span><span>“MASUKU” -${prev.no}-</span></a>
  <a class="pager__all" href="${b}exhibition.html">一覧へ</a>
  <a class="pager__next" href="${b}product/mask${next.no}/index.html"><span class="pager__label">Next</span><span>“MASUKU” -${next.no}-</span></a>
</nav>
`,
    }),
  ];
});

/* ---------- Gallery ---------- */
const gallery = layout({
  path: "gallery.html",
  title: "Gallery",
  description: "東條麗子の作品アーカイブ。絵画、オブジェ、季節のしつらえ、手いたずら、雪アートの展示まで。",
  body: `
<section class="page-hero">
  <div class="container">
    <p class="eyebrow">Gallery</p>
    <h1 class="page-hero__title">作品</h1>
    <p class="page-hero__sub">絵画からオブジェ、季節のしつらえ、手いたずらまで。${works.length}点の作品を収録しています。</p>
  </div>
</section>
<section class="section section--tight">
  <div class="container">
    <div class="filter" role="group" aria-label="カテゴリで絞り込む" data-filter>
      <button type="button" aria-pressed="true" data-cat="all">すべて <span>${works.length}</span></button>
      ${categories
        .map(
          (c) => `<button type="button" aria-pressed="false" data-cat="${c.key}">${c.label} <span>${works.filter((w) => w.cat === c.key).length}</span></button>`
        )
        .join("\n      ")}
    </div>
    <ul class="gallery-grid" data-gallery>
      ${works
        .map((w) => {
          const p = posts[w.id];
          return `<li class="gallery-item" data-cat="${w.cat}">
        <button type="button" class="gallery-item__btn" data-lightbox
          data-src="images/works/w${w.id}.webp" data-title="${esc(w.title)}" data-cat-label="${catLabel[w.cat]}"
          data-date="${fmtDate(p.date)}" data-caption="${esc(p.caption)}" data-href="${igUrl(w.id)}">
          ${workImg(w.id, w.title)}
          <span class="gallery-item__info"><span class="gallery-item__title">${esc(w.title)}</span><span class="gallery-item__meta">${catLabel[w.cat]} · ${p.date.slice(0, 4)}</span></span>
        </button>
      </li>`;
        })
        .join("\n      ")}
    </ul>
    <p class="note">掲載作品の多くは作家の Instagram（<a href="${site.instagram}" target="_blank" rel="noopener">${site.instagramHandle}</a>）で発表されたものです。</p>
  </div>
</section>
<dialog class="lightbox" data-lightbox-dialog aria-label="作品の拡大表示">
  <div class="lightbox__inner">
    <figure class="lightbox__figure"><img alt="" data-lb-img></figure>
    <div class="lightbox__info">
      <p class="lightbox__cat" data-lb-cat></p>
      <h2 class="lightbox__title" data-lb-title></h2>
      <p class="lightbox__date" data-lb-date></p>
      <p class="lightbox__caption" data-lb-caption></p>
      <a class="text-link text-link--light" href="${site.instagram}" data-lb-link target="_blank" rel="noopener">Instagramで見る ${icon.ext}</a>
    </div>
  </div>
  <button type="button" class="lightbox__nav lightbox__nav--prev" data-lb-prev aria-label="前の作品">←</button>
  <button type="button" class="lightbox__nav lightbox__nav--next" data-lb-next aria-label="次の作品">→</button>
  <button type="button" class="lightbox__close" data-lb-close aria-label="閉じる">×</button>
</dialog>
`,
});

/* ---------- Activities ---------- */
const activitiesPage = layout({
  path: "activities.html",
  title: "Activities",
  description: "東條麗子と実験空間 Studio Zero の活動記録。越後妻有 SNOWART、JAALAヨコハマ展、ギャラリー湯山での展示など。",
  body: `
<section class="page-hero">
  <div class="container">
    <p class="eyebrow">Activities</p>
    <h1 class="page-hero__title">活動記録</h1>
    <p class="page-hero__sub">展覧会への参加や、地域での活動の記録です。</p>
  </div>
</section>
<section class="section section--tight">
  <div class="container">
    ${activities
      .map(
        (y) => `<section class="timeline-year">
      <h2 class="timeline-year__label">${y.year}</h2>
      <ol class="timeline">
        ${y.items
          .map(
            (a) => `<li class="timeline-item reveal">
          <div class="timeline-item__img">${workImg(a.img, a.title, { sizes: "(min-width: 960px) 280px, 40vw" })}</div>
          <div class="timeline-item__body">
            <p class="timeline-item__date">${a.date}</p>
            <h3 class="timeline-item__title">${esc(a.title)}</h3>
            <p>${esc(a.text)}</p>
            <p class="timeline-item__links">${
              a.href ? `<a class="text-link" href="${a.href}">展覧会を見る ${icon.arrow}</a>` : ""
            }${
              a.source ? `<a class="text-link" href="${a.source.href}" target="_blank" rel="noopener">${esc(a.source.label)} ${icon.ext}</a>` : ""
            }<a class="text-link text-link--muted" href="${igUrl(a.img)}" target="_blank" rel="noopener">Instagram ${icon.ext}</a></p>
          </div>
        </li>`
          )
          .join("\n        ")}
      </ol>
    </section>`
      )
      .join("\n    ")}
  </div>
</section>
`,
});

/* ---------- Contact ---------- */
const contact = layout({
  path: "contact.html",
  bodyClass: "is-contact",
  title: "Contact",
  description: "実験空間 Studio Zero へのお問い合わせ。作品の購入、展示・ワークショップのご相談、取材など。",
  body: `
<section class="page-hero">
  <div class="container">
    <p class="eyebrow">Contact</p>
    <h1 class="page-hero__title">お問い合わせ</h1>
    <p class="page-hero__sub">作品の購入、展示やワークショップのご相談、取材などはこちらから。</p>
  </div>
</section>
<section class="section section--tight">
  <div class="container contact">
    <div class="contact__channels">
      <a class="channel reveal" href="${site.instagram}" target="_blank" rel="noopener">
        <span class="channel__icon">${icon.instagram}</span>
        <span class="channel__body"><span class="channel__name">Instagram</span><span class="channel__desc">${site.instagramHandle} へダイレクトメッセージ（DM）をお送りください。</span></span>
        <span class="channel__arrow">${icon.ext}</span>
      </a>
      <a class="channel reveal" href="${site.facebook}" target="_blank" rel="noopener">
        <span class="channel__icon">${icon.facebook}</span>
        <span class="channel__body"><span class="channel__name">Facebook</span><span class="channel__desc">Facebook のメッセージからもご連絡いただけます。</span></span>
        <span class="channel__arrow">${icon.ext}</span>
      </a>
    </div>
    <div class="contact__template reveal">
      <h2 class="h3">DM の文面をつくる</h2>
      <p>項目を入力すると、DM に貼り付ける文面ができます。入力した内容はどこにも送信されません。</p>
      <form class="template-form" data-template-form>
        <label>お名前<input name="name" autocomplete="name" required></label>
        <label>ご用件
          <select name="type">
            <option>作品の購入について</option>
            <option>展示・ワークショップのご相談</option>
            <option>取材・掲載のご依頼</option>
            <option>その他</option>
          </select>
        </label>
        <label>対象の作品（任意）<input name="work" placeholder="例：“MASUKU” -06-" data-work-input></label>
        <label>内容<textarea name="body" rows="5" required></textarea></label>
        <label>ご連絡先（任意）<input name="reply" placeholder="メールアドレスや電話番号など" autocomplete="email"></label>
        <output class="template-form__output" data-template-output aria-live="polite"></output>
        <div class="template-form__actions">
          <button class="button" type="submit">文面をコピー</button>
          <a class="button button--outline" href="${site.instagram}" target="_blank" rel="noopener">Instagramを開く ${icon.ext}</a>
        </div>
      </form>
    </div>
    <div class="faq reveal">
      <h2 class="h3">よくあるご質問</h2>
      <details><summary>作品は購入できますか？</summary><p>企画展『-MASUKU-』の作品は各作品ページに価格を掲載しています。そのほかの作品についても、お問い合わせください。</p></details>
      <details><summary>スタジオを見学できますか？</summary><p>展示の開催時期や見学の可否は時期によって異なります。ご希望の日程とあわせてご相談ください。</p></details>
      <details><summary>ワークショップや展示の依頼はできますか？</summary><p>内容・時期・会場などをお知らせいただければ、個別にご相談します。</p></details>
    </div>
  </div>
</section>
`,
});

/* ---------- 404 ---------- */
const notFound = layout({
  path: "404.html",
  title: "ページが見つかりません",
  absolute: true,
  body: `
<section class="page-hero not-found">
  <div class="container">
    <p class="not-found__zero" aria-hidden="true">0</p>
    <h1 class="page-hero__title">ページが見つかりません</h1>
    <p class="page-hero__sub">お探しのページは移動または削除された可能性があります。</p>
    <p><a class="button" href="${site.url}">ホームへ戻る ${icon.arrow}</a></p>
  </div>
</section>
`,
});

const pages = [
  ["index.html", home],
  ["about.html", about],
  ["exhibition.html", exhibition],
  ["gallery.html", gallery],
  ["activities.html", activitiesPage],
  ["contact.html", contact],
  ["404.html", notFound],
  ...products,
];

for (const [path, html] of pages) {
  mkdirSync(dirname(join(root, path)), { recursive: true });
  writeFileSync(join(root, path), html);
}

writeFileSync(
  join(root, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .filter(([p]) => p !== "404.html")
  .map(([p]) => `  <url><loc>${site.url}${p.replace(/index\.html$/, "")}</loc></url>`)
  .join("\n")}
</urlset>
`
);
writeFileSync(join(root, "robots.txt"), `User-agent: *\nAllow: /\nSitemap: ${site.url}sitemap.xml\n`);
console.log(`built ${pages.length} pages`);

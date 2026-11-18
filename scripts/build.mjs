// Genera la web de tutoriales (ihtml.es) desde content/{es,en}/*.md.
//   node scripts/build.mjs
// Español en la raíz, inglés en /en/. Cada .md lleva un frontmatter con
// slug, pair (slug del otro idioma), title, description, level, minutes, order.
import { readFileSync, writeFileSync, readdirSync, mkdirSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const SITE = 'https://ihtml.es/';
const MAIN = 'https://ihtml.eu/';
const BRAND = readFileSync(ROOT + 'scripts/brand.html', 'utf-8');

const T = {
  es: {
    dir: '',
    htmlLang: 'es',
    ogLocale: 'es_ES',
    siteName: 'Tutoriales de IHTML',
    homeTitle: 'Tutoriales de IHTML — aprende a animar HTML sin código',
    homeDesc:
      'Tutoriales paso a paso de IHTML (Interactive HTML): animaciones con keyframes, botones interactivos, variables, páginas y exportación a HTML.',
    homeH1: 'Tutoriales de IHTML',
    homeIntro:
      'Aprende IHTML paso a paso: cada tutorial es corto, práctico y termina con algo que funciona.',
    skip: 'Saltar al contenido',
    menu: 'Menú',
    nav: { tutorials: 'Tutoriales', web: 'Web de IHTML', guide: 'Guía completa', download: 'Descargar' },
    links: { web: MAIN + 'es/', guide: MAIN + 'es/guia-usuario.html', download: MAIN + 'es/descargas.html', privacy: MAIN + 'es/privacidad.html', license: MAIN + 'es/licencia.html' },
    min: 'min',
    back: '← Todos los tutoriales',
    next: 'Siguiente:',
    langLabel: 'Idioma: Español',
    langCode: 'ES',
    footer: 'Tutoriales de <b>IHTML</b> (Interactive HTML), el editor de animaciones HTML/CSS para escritorio y Android.',
    legal: ['Licencia', 'Privacidad'],
    search: 'Buscar tutoriales…',
    allLevels: 'Todos',
    levels: { beginner: 'Principiante', intermediate: 'Intermedio', advanced: 'Avanzado' },
    video: 'Vídeo',
    play: 'Ver el vídeo',
    ytNote: 'Al pulsar se carga el reproductor de YouTube',
    noResults: 'No hay tutoriales que coincidan con la búsqueda.',
    free: 'Gratis · sin registro'
  },
  en: {
    dir: 'en/',
    htmlLang: 'en',
    ogLocale: 'en_US',
    siteName: 'IHTML Tutorials',
    homeTitle: 'IHTML Tutorials — learn to animate HTML without code',
    homeDesc:
      'Step-by-step IHTML (Interactive HTML) tutorials: keyframe animation, interactive buttons, variables, pages and exporting to HTML.',
    homeH1: 'IHTML Tutorials',
    homeIntro: 'Learn IHTML step by step: every tutorial is short, hands-on and ends with something that works.',
    skip: 'Skip to content',
    menu: 'Menu',
    nav: { tutorials: 'Tutorials', web: 'IHTML website', guide: 'Full guide', download: 'Download' },
    links: { web: MAIN, guide: MAIN + 'guide.html', download: MAIN + 'downloads.html', privacy: MAIN + 'privacy.html', license: MAIN + 'license.html' },
    min: 'min',
    back: '← All tutorials',
    next: 'Next:',
    langLabel: 'Language: English',
    langCode: 'EN',
    footer: 'Tutorials for <b>IHTML</b> (Interactive HTML), the HTML/CSS animation editor for desktop and Android.',
    legal: ['License', 'Privacy'],
    search: 'Search tutorials…',
    allLevels: 'All',
    levels: { beginner: 'Beginner', intermediate: 'Intermediate', advanced: 'Advanced' },
    video: 'Video',
    play: 'Watch the video',
    ytNote: 'Clicking loads the YouTube player',
    noResults: 'No tutorials match your search.',
    free: 'Free · no sign-up'
  }
};

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function inline(s) {
  // El codigo primero, para que su contenido no se interprete como markdown.
  const codes = [];
  s = s.replace(/`([^`]+)`/g, (_, c) => `\u0000${codes.push(c) - 1}\u0000`);
  s = esc(s)
    .replace(/\*\*([^*]+)\*\*/g, '<b>$1</b>')
    .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, t, u) => {
      const ext = /^https?:/.test(u) ? ' target="_blank" rel="noopener"' : '';
      return `<a href="${u}"${ext}>${t}</a>`;
    });
  return s.replace(/\u0000(\d+)\u0000/g, (_, i) => `<code>${esc(codes[i])}</code>`);
}

// Markdown minimo: ## / parrafos / listas - y 1. / > nota.
function md(src) {
  const out = [];
  let para = [];
  let list = null;
  let note = [];
  const flushP = () => {
    if (para.length) out.push(`<p>${inline(para.join(' '))}</p>`);
    para = [];
  };
  const flushL = () => {
    if (list) {
      const cls = list.tag === 'ol' ? ' class="pasos"' : '';
      out.push(`<${list.tag}${cls}>${list.items.map((i) => `<li>${inline(i)}</li>`).join('')}</${list.tag}>`);
    }
    list = null;
  };
  const flushN = () => {
    if (note.length) out.push(`<p class="nota">${inline(note.join(' '))}</p>`);
    note = [];
  };
  const flushAll = () => {
    flushP();
    flushL();
    flushN();
  };
  for (const raw of src.split('\n')) {
    const line = raw.trimEnd();
    let m;
    if (!line.trim()) flushAll();
    else if ((m = /^## (.+)/.exec(line))) {
      flushAll();
      const id = m[1]
        .toLowerCase()
        .normalize('NFD')
        .replace(/[̀-ͯ]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
      out.push(`<h2 id="${id}">${inline(m[1])}</h2>`);
    } else if ((m = /^> (.+)/.exec(line))) {
      flushP();
      flushL();
      note.push(m[1]);
    } else if ((m = /^(-|\d+\.) (.+)/.exec(line))) {
      flushP();
      flushN();
      const tag = m[1] === '-' ? 'ul' : 'ol';
      if (!list || list.tag !== tag) {
        flushL();
        list = { tag, items: [] };
      }
      list.items.push(m[2]);
    } else {
      flushL();
      flushN();
      para.push(line.trim());
    }
  }
  flushAll();
  return out.join('\n');
}

function parse(file) {
  const src = readFileSync(file, 'utf-8');
  const m = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/.exec(src);
  if (!m) throw new Error('Sin frontmatter: ' + file);
  const meta = {};
  for (const l of m[1].split('\n')) {
    const i = l.indexOf(':');
    if (i > 0) meta[l.slice(0, i).trim()] = l.slice(i + 1).trim();
  }
  for (const k of ['slug', 'pair', 'title', 'description', 'level', 'minutes', 'order', 'category']) {
    if (!meta[k]) throw new Error(`Falta "${k}" en ${file}`);
  }
  meta.order = Number(meta.order);
  meta.levelKey = LEVELS[meta.level.toLowerCase()];
  if (!meta.levelKey) throw new Error(`Nivel desconocido "${meta.level}" en ${file} (usa: ${Object.keys(LEVELS).join(', ')})`);
  if (meta.video) {
    meta.videoInfo = parseVideo(meta.video);
    if (!meta.videoInfo) throw new Error(`video no reconocido en ${file}: ${meta.video}`);
  }
  return { ...meta, body: md(m[2]) };
}

// Nivel escrito en cualquiera de los dos idiomas -> clave comun para el filtro.
const LEVELS = {
  principiante: 'beginner',
  beginner: 'beginner',
  intermedio: 'intermediate',
  intermediate: 'intermediate',
  avanzado: 'advanced',
  advanced: 'advanced'
};

// `video:` acepta una URL de YouTube (watch, youtu.be, shorts, embed) o un
// archivo propio dentro de videos/ (mp4/webm), p. ej. `videos/primera-animacion.mp4`.
function parseVideo(v) {
  const yt =
    /(?:youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/)|youtu\.be\/)([\w-]{11})/.exec(v) ||
    /^([\w-]{11})$/.exec(v);
  if (yt) return { kind: 'youtube', id: yt[1] };
  if (/^videos\/[\w./-]+\.(mp4|webm)$/i.test(v)) {
    if (!existsSync(ROOT + v)) throw new Error(`No existe el archivo de video ${v}`);
    return { kind: 'file', src: v, type: v.toLowerCase().endsWith('.webm') ? 'video/webm' : 'video/mp4' };
  }
  return null;
}

// El reproductor de YouTube NO se carga hasta que el alumno pulsa (sin cookies
// ni peticiones a Google antes del clic); luego usa youtube-nocookie.com.
function videoBlock(tu, t, up) {
  const v = tu.videoInfo;
  if (!v) return '';
  if (v.kind === 'file') {
    return `        <figure class="tuto-video">
          <video controls preload="metadata" playsinline>
            <source src="${up}${v.src}" type="${v.type}" />
          </video>
        </figure>`;
  }
  return `        <figure class="tuto-video">
          <button class="video-lite" type="button" data-yt="${v.id}" aria-label="${esc(t.play)}: ${esc(tu.title)}">
            <span class="video-lite-play" aria-hidden="true"></span>
            <span class="video-lite-title">${esc(tu.title)}</span>
            <span class="video-lite-note">${esc(t.ytNote)}</span>
          </button>
        </figure>`;
}

function load(lang) {
  const dir = `${ROOT}content/${lang}/`;
  return readdirSync(dir)
    .filter((f) => f.endsWith('.md'))
    .map((f) => parse(dir + f))
    .sort((a, b) => a.order - b.order);
}

const url = (lang, slug) => SITE + T[lang].dir + (slug ? slug + '.html' : '');

function page({ lang, other, title, desc, canonical, alternates, type, body, jsonld }) {
  const t = T[lang];
  const up = lang === 'es' ? '' : '../';
  const alt = alternates
    .map((a) => `    <link rel="alternate" hreflang="${a.lang}" href="${a.href}" />`)
    .join('\n');
  return `<!doctype html>
<html lang="${t.htmlLang}">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${esc(title)}</title>
    <meta name="description" content="${esc(desc)}" />
    <meta name="robots" content="index, follow" />
    <link rel="canonical" href="${canonical}" />
${alt}
    <link rel="icon" type="image/svg+xml" href="${up}assets/favicon.svg" />
    <meta property="og:type" content="${type}" />
    <meta property="og:site_name" content="${esc(t.siteName)}" />
    <meta property="og:locale" content="${t.ogLocale}" />
    <meta property="og:title" content="${esc(title)}" />
    <meta property="og:description" content="${esc(desc)}" />
    <meta property="og:url" content="${canonical}" />
    <meta property="og:image" content="${MAIN}assets/og-image.png" />
    <meta name="twitter:card" content="summary_large_image" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="${up}assets/estilos.css" />
    <link rel="stylesheet" href="${up}assets/tutorial.css" />
    <script type="application/ld+json">
${JSON.stringify(jsonld, null, 2)}
    </script>
  </head>
  <body>
    <a class="skip-link" href="#contenido">${t.skip}</a>
    <header class="island">
      <button class="island-dot" aria-label="${t.menu}" aria-expanded="false"></button>
      ${BRAND}
      <div class="island-menu-wrap">
        <nav class="island-menu">
          <a href="index.html" class="is-activo">${t.nav.tutorials}</a>
          <a href="${t.links.guide}">${t.nav.guide}</a>
          <a href="${t.links.web}">${t.nav.web}</a>
          <a class="is-cta" href="${t.links.download}">${t.nav.download}</a>
        </nav>
      </div>
      <div class="lang-switch">
        <button class="lang-switch-btn" type="button" aria-label="${t.langLabel}" aria-haspopup="true" aria-expanded="false">
          ${t.langCode}<span class="lang-switch-caret" aria-hidden="true">▾</span>
        </button>
        <div class="lang-switch-menu">
          <a href="${other}" lang="${lang === 'es' ? 'en' : 'es'}">${lang === 'es' ? 'English' : 'Español'}</a>
          <a href="#" class="is-activo" lang="${lang}">${lang === 'es' ? 'Español' : 'English'}</a>
        </div>
      </div>
    </header>

    <div class="wrap">
${body}
    </div>

    <footer>
      <p>${t.footer}</p>
      <div class="docs">
        <a href="index.html">${t.nav.tutorials}</a>
        <a href="${t.links.guide}">${t.nav.guide}</a>
        <a href="${t.links.web}">${t.nav.web}</a>
        <a href="${t.links.download}">${t.nav.download}</a>
      </div>
      <p class="footer-credit">© 2026 IHTML</p>
      <p class="legal-links"><a href="${t.links.license}">${t.legal[0]}</a> · <a href="${t.links.privacy}">${t.legal[1]}</a></p>
    </footer>

    <script>
      const isla = document.querySelector('.island');
      const islaBot = document.querySelector('.island-dot');
      if (isla && islaBot) {
        islaBot.addEventListener('click', () => {
          const abierto = isla.classList.toggle('is-abierto');
          islaBot.setAttribute('aria-expanded', abierto);
        });
        document.addEventListener('click', (e) => {
          if (isla.contains(e.target)) return;
          isla.classList.remove('is-abierto');
          islaBot.setAttribute('aria-expanded', 'false');
        });
      }
      document.querySelectorAll('.lang-switch').forEach((ls) => {
        const btn = ls.querySelector('.lang-switch-btn');
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const open = ls.classList.toggle('is-abierto');
          btn.setAttribute('aria-expanded', open);
        });
      });
      document.addEventListener('click', (e) => {
        document.querySelectorAll('.lang-switch.is-abierto').forEach((ls) => {
          if (ls.contains(e.target)) return;
          ls.classList.remove('is-abierto');
          ls.querySelector('.lang-switch-btn').setAttribute('aria-expanded', 'false');
        });
      });

      // Video de YouTube: el reproductor solo se carga al pulsar.
      document.querySelectorAll('.video-lite').forEach((b) => {
        b.addEventListener('click', () => {
          const f = document.createElement('iframe');
          f.src = 'https://www.youtube-nocookie.com/embed/' + b.dataset.yt + '?autoplay=1&rel=0';
          f.title = b.getAttribute('aria-label');
          f.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
          f.allowFullscreen = true;
          b.replaceWith(f);
        });
      });

      // Portada: buscador + filtro por nivel.
      const search = document.querySelector('.tuto-search');
      if (search) {
        let level = '';
        const apply = () => {
          const q = search.value.trim().toLowerCase();
          let total = 0;
          document.querySelectorAll('.tuto-cat').forEach((sec) => {
            let n = 0;
            sec.querySelectorAll('.tuto-card').forEach((c) => {
              const ok = (!level || c.dataset.level === level) && (!q || c.dataset.text.includes(q));
              c.hidden = !ok;
              if (ok) n++;
            });
            sec.hidden = n === 0;
            total += n;
          });
          document.querySelector('.tuto-empty').hidden = total > 0;
        };
        search.addEventListener('input', apply);
        document.querySelectorAll('.tuto-chip').forEach((chip) => {
          chip.addEventListener('click', () => {
            level = chip.dataset.level;
            document.querySelectorAll('.tuto-chip').forEach((c) => {
              c.classList.toggle('is-activo', c === chip);
              c.setAttribute('aria-pressed', c === chip);
            });
            apply();
          });
        });
      }
    </script>
  </body>
</html>
`;
}

const all = { es: load('es'), en: load('en') };
const bySlug = {};
for (const lang of Object.keys(all)) for (const tu of all[lang]) bySlug[lang + ':' + tu.slug] = tu;

// Cada tutorial debe tener su pareja en el otro idioma.
for (const [lang, otherLang] of [['es', 'en'], ['en', 'es']]) {
  for (const tu of all[lang]) {
    if (!bySlug[otherLang + ':' + tu.pair]) throw new Error(`${lang}/${tu.slug}: no existe la pareja ${otherLang}/${tu.pair}`);
  }
}

const sitemap = [];
for (const lang of ['es', 'en']) {
  const t = T[lang];
  const otherLang = lang === 'es' ? 'en' : 'es';
  const outDir = ROOT + t.dir;
  mkdirSync(outDir, { recursive: true });
  const relOther = (slug) => (lang === 'es' ? 'en/' : '../') + (slug ? slug + '.html' : 'index.html');
  const list = all[lang];

  // Portada: buscador + filtro por nivel + tarjetas agrupadas por tema
  // (en el orden en que aparece cada tema por primera vez).
  const card = (tu) => {
    const text = `${tu.title} ${tu.description} ${tu.category}`.toLowerCase();
    return `          <a class="tuto-card" href="${tu.slug}.html" data-level="${tu.levelKey}" data-text="${esc(text)}">
            <span class="tuto-num">${String(tu.order).padStart(2, '0')}${tu.videoInfo ? ` <span class="tuto-badge">▶ ${t.video}</span>` : ''}</span>
            <h3>${esc(tu.title)}</h3>
            <p>${esc(tu.description)}</p>
            <span class="tuto-meta">${esc(tu.level)} · ${esc(tu.minutes)} ${t.min}</span>
          </a>`;
  };
  const categories = [...new Set(list.map((tu) => tu.category))];
  const usedLevels = Object.keys(t.levels).filter((k) => list.some((tu) => tu.levelKey === k));
  const filters = [`<button type="button" class="tuto-chip is-activo" data-level="">${t.allLevels}</button>`]
    .concat(usedLevels.map((k) => `<button type="button" class="tuto-chip" data-level="${k}">${t.levels[k]}</button>`))
    .join('\n          ');
  const cards = categories
    .map(
      (cat) => `        <section class="tuto-cat">
          <h2>${esc(cat)}</h2>
          <div class="tuto-grid">
${list.filter((tu) => tu.category === cat).map(card).join('\n')}
          </div>
        </section>`
    )
    .join('\n');
  const homeAlt = [
    { lang: 'es', href: url('es') },
    { lang: 'en', href: url('en') },
    { lang: 'x-default', href: url('es') }
  ];
  writeFileSync(
    outDir + 'index.html',
    page({
      lang,
      other: relOther(''),
      title: t.homeTitle,
      desc: t.homeDesc,
      canonical: url(lang),
      alternates: homeAlt,
      type: 'website',
      jsonld: {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: t.homeH1,
        description: t.homeDesc,
        inLanguage: lang,
        url: url(lang),
        hasPart: list.map((tu) => ({ '@type': 'HowTo', name: tu.title, url: url(lang, tu.slug) }))
      },
      body: `      <main id="contenido" class="tutoriales">
        <h1>${t.homeH1}</h1>
        <p class="intro">${t.homeIntro} <span class="tuto-free">${t.free}</span></p>
        <div class="tuto-tools">
          <input type="search" class="tuto-search" placeholder="${esc(t.search)}" aria-label="${esc(t.search)}" />
          <div class="tuto-chips" role="group">
          ${filters}
          </div>
        </div>
${cards}
        <p class="tuto-empty" hidden>${t.noResults}</p>
      </main>`
    })
  );
  sitemap.push({ loc: url(lang), alts: homeAlt });

  list.forEach((tu, i) => {
    const nextTu = list[i + 1];
    const alts = [
      { lang, href: url(lang, tu.slug) },
      { lang: otherLang, href: url(otherLang, tu.pair) },
      { lang: 'x-default', href: url('es', lang === 'es' ? tu.slug : tu.pair) }
    ];
    const nav = `        <nav class="tuto-nav">
          <a href="index.html">${t.back}</a>
          ${nextTu ? `<a href="${nextTu.slug}.html">${t.next} ${esc(nextTu.title)} →</a>` : ''}
        </nav>`;
    writeFileSync(
      outDir + tu.slug + '.html',
      page({
        lang,
        other: relOther(tu.pair),
        title: `${tu.title} — ${t.siteName}`,
        desc: tu.description,
        canonical: url(lang, tu.slug),
        alternates: alts,
        type: 'article',
        jsonld: {
          '@context': 'https://schema.org',
          '@type': 'HowTo',
          name: tu.title,
          description: tu.description,
          inLanguage: lang,
          totalTime: `PT${tu.minutes}M`,
          url: url(lang, tu.slug),
          image: MAIN + 'assets/og-image.png'
        },
        body: `      <main id="contenido" class="guia tutorial">
        <p class="tuto-meta">${esc(tu.level)} · ${esc(tu.minutes)} ${t.min}</p>
        <h1>${esc(tu.title)}</h1>
        <p class="intro">${esc(tu.description)}</p>
${videoBlock(tu, t, lang === 'es' ? '' : '../')}
${tu.body}
${nav}
      </main>`
      })
    );
    sitemap.push({ loc: url(lang, tu.slug), alts });
  });
}

writeFileSync(
  ROOT + 'sitemap.xml',
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${sitemap
  .map(
    (s) => `  <url>
    <loc>${s.loc}</loc>
${s.alts.map((a) => `    <xhtml:link rel="alternate" hreflang="${a.lang}" href="${a.href}" />`).join('\n')}
  </url>`
  )
  .join('\n')}
</urlset>
`
);
console.log(`ok: ${all.es.length} tutoriales es + ${all.en.length} en, sitemap con ${sitemap.length} URLs`);

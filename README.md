# IHTML · Tutoriales

Web de tutoriales de [IHTML](https://ihtml.eu), publicada en **https://ihtml.es** con GitHub Pages.

- Español en la raíz, inglés en `/en/`.
- Los tutoriales viven en `content/es/*.md` y `content/en/*.md`. Cada uno tiene un frontmatter con `slug`, `pair` (el slug del mismo tutorial en el otro idioma), `title`, `description`, `level`, `minutes` y `order`.
- Para generar las páginas: `node scripts/build.mjs`. Crea los `.html` y `sitemap.xml`. Los HTML generados se suben al repositorio.
- `assets/estilos.css` es una copia del de ihtml.eu; los estilos propios van en `assets/tutorial.css`.

## Añadir un tutorial

1. Crea `content/es/NN-nombre.md` y su pareja `content/en/NN-name.md`.
2. Ejecuta `node scripts/build.mjs`.
3. Revisa el resultado en el navegador y súbelo.

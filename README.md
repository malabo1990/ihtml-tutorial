# IHTML · Tutoriales

Web de tutoriales de [IHTML](https://ihtml.eu), publicada en **https://ihtml.es** con GitHub Pages.

- Español en la raíz, inglés en `/en/`.
- Los tutoriales viven en `content/es/*.md` y `content/en/*.md`. Todos son gratis y no hace falta registrarse (sin cuentas ni cookies).
- La portada tiene buscador, filtro por nivel y los tutoriales agrupados por tema (`category`).

## Frontmatter de cada tutorial

```
---
slug: primera-animacion        # nombre del archivo .html
pair: first-animation          # slug del mismo tutorial en el otro idioma
title: Tu primera animación
description: Una frase para la tarjeta y para Google.
category: Primeros pasos       # tema (agrupa las tarjetas en la portada)
level: Principiante            # Principiante/Intermedio/Avanzado (o Beginner/Intermediate/Advanced)
minutes: 10
order: 1
video: https://youtu.be/XXXXXXXXXXX   # opcional
---
```

## Vídeo de la lección (opcional)

- **YouTube (recomendado)**: pega la URL del vídeo en `video:` (sirven watch, youtu.be, shorts o embed). El reproductor no se carga hasta que el alumno pulsa (sin cookies ni peticiones a Google antes) y usa youtube-nocookie.com.
- **Archivo propio**: copia el `.mp4` o `.webm` a `videos/` y pon `video: videos/nombre.mp4`. GitHub no acepta archivos de más de 100 MB, así que para vídeos largos usa YouTube.
- Cada idioma puede tener su propio vídeo, o el mismo.
- Para generar las páginas: `node scripts/build.mjs`. Crea los `.html` y `sitemap.xml`. Los HTML generados se suben al repositorio.
- `assets/estilos.css` es una copia del de ihtml.eu; los estilos propios van en `assets/tutorial.css`.

## Añadir un tutorial

1. Crea `content/es/NN-nombre.md` y su pareja `content/en/NN-name.md`.
2. Ejecuta `node scripts/build.mjs`.
3. Revisa el resultado en el navegador y súbelo.

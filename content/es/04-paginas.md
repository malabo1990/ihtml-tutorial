---
slug: paginas-transiciones
pair: pages-transitions
title: Páginas con transiciones
description: Crea varias páginas y navega entre ellas con la acción Go to Page y una transición animada.
level: Intermedio
minutes: 10
order: 4
---

Un proyecto de IHTML puede tener varias **páginas** (escenas). Solo se ve una a la vez, y un botón puede llevar a otra con una transición.

## 1. Crea una segunda página

1. En la barra lateral izquierda abre la pestaña **Páginas**.
2. Pulsa **+ Nueva página** y elige **Página en blanco**.
3. Haz clic en cada página de la lista para activarla y edita su contenido. Los elementos nuevos van a la página activa.

> **Tablet** y **Móvil** crean variantes con el tamaño de esos dispositivos, agrupadas bajo la página que tenías seleccionada.

## 2. Botón «Siguiente»

1. Activa la primera página y añade un **Button** con el texto «Siguiente».
2. En **Actions**: disparador **Click**, acción **Go to Page**.
3. Elige la segunda página, la transición **Slide** (o **Fade**) y una duración en ms, por ejemplo `400`.

## 3. Botón «Volver»

En la segunda página, añade otro botón con **Go to Page** hacia la primera, con **Slide** en la dirección contraria.

## 4. Pruébalo

Pulsa **Preview**: el HTML exportado incluye todas las páginas (ocultas salvo la inicial) en cuanto el proyecto usa Go to Page.

## Consejos

- El botón **Solo seleccionada / Todas visibles** muestra u oculta el contorno de las demás páginas en el lienzo.
- Clic derecho sobre una página: renombrar, duplicar o eliminar.

## Qué has aprendido

- Crear páginas en blanco y variantes responsive.
- Navegar entre páginas con Go to Page y transiciones Fade o Slide.

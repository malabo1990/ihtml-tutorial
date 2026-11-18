---
slug: boton-interactivo
pair: interactive-button
title: Un botón que muestra un panel
description: Usa Acciones para que un clic muestre u oculte otro elemento, sin escribir código.
category: Interactividad
level: Principiante
minutes: 8
order: 2
---

Vas a crear un botón que, al pulsarlo, muestra y oculta un panel de información. Todo con la pestaña **Actions** del Inspector: IHTML genera el código por ti.

## 1. Prepara los elementos

1. Añade un **Button** desde el panel Elementos (o pulsa `B`).
2. Añade un **Div** (o pulsa `D`) y hazlo más grande: será el panel.
3. Ponles nombre para encontrarlos fácil: en **Capas**, doble clic sobre el nombre para renombrar. Llámalos «Botón» y «Panel».

## 2. Añade la acción

1. Selecciona el **Botón** y abre la pestaña **Actions** del Inspector.
2. Elige el disparador **Click**.
3. Elige la acción **Alternar visibilidad** (Toggle).
4. En **Target** elige «Panel». La lista muestra, debajo de las opciones fijas (el propio elemento, su padre, todos), todos los elementos de Capas.

## 3. Pruébalo sin exportar

Pulsa el botón **Interactivo** (junto a Preview): el editor entra en modo interactivo y las acciones funcionan dentro del lienzo. Haz clic en el botón para ver aparecer y desaparecer el panel. Pulsa `Esc` para volver a editar.

> Las acciones cambian solo lo que ves en el modo interactivo. Al salir, el proyecto vuelve a su estado original.

## 4. Variantes

- **Hover** y **Mouse leave**: muestra el panel al pasar el ratón y ocúltalo al salir, como un tooltip.
- **Tecla presionada**: graba una combinación como `Ctrl+3` en el campo Key.
- **Entrar en el viewport**: se dispara cada vez que el elemento aparece en pantalla al hacer scroll.
- **Añadir/quitar clase CSS** o **Fijar estilo** para cambiar el aspecto en lugar de mostrar u ocultar.

## Qué has aprendido

- Disparadores (Click, Hover…) y acciones (mostrar, ocultar, alternar).
- Elegir el objetivo de una acción por su nombre de capa.
- Probar las interacciones con el modo Interactivo.

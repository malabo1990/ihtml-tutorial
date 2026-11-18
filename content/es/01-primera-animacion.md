---
slug: primera-animacion
pair: first-animation
title: Tu primera animación
description: Crea un elemento, anímalo con keyframes en la Timeline y míralo moverse en 10 minutos.
level: Principiante
minutes: 10
order: 1
---

En este tutorial vas a crear un cuadrado que cruza el lienzo y se desvanece. Es el flujo básico de IHTML: **elemento → keyframes → reproducir**.

## Antes de empezar

- Descarga e instala IHTML desde [ihtml.eu](https://ihtml.eu/es/descargas.html).
- Ábrelo: en el centro está el **lienzo**, a la izquierda **Elementos** y **Capas**, a la derecha el **Inspector** y abajo la **Timeline**.

## 1. Crea un elemento

1. Pulsa la herramienta **Shape** (tecla `S`) en la barra superior.
2. Arrastra sobre el lienzo para dibujar un rectángulo. Al soltar, la herramienta vuelve sola a **Select**.
3. El rectángulo queda seleccionado, con su caja de selección (bounding box) visible.

> Atajo: con la herramienta Select activa, las teclas `B`, `D` e `Y` añaden al instante un Botón, un Div o un vídeo de YouTube del catálogo.

## 2. Activa los keyframes de la posición

1. Con el rectángulo seleccionado, mira la pestaña **Design** del Inspector.
2. Junto a **X** pulsa el diamante (◆). Así IHTML empieza a seguir esa propiedad y crea el primer keyframe en el tiempo actual (0 s).
3. Haz lo mismo con **Opacidad**.

## 3. Graba el movimiento

1. Activa el modo **REC** (botón rojo ◆ de la Timeline o tecla `R`). Arriba a la derecha aparece «● REC».
2. Arrastra la línea roja (el playhead) desde la regla de tiempo hasta 2 s.
3. Mueve el rectángulo hacia la derecha y baja la **Opacidad** a 0. Cada cambio crea un keyframe en ese tiempo.
4. Vuelve a pulsar `R` para salir de REC.

## 4. Reproduce y ajusta

- Pulsa `Espacio` para reproducir o pausar.
- Haz doble clic sobre un keyframe para cambiar su curva de easing (linear, ease-in/out, bounce, elástica…).
- Arrastra un keyframe para cambiar cuándo ocurre. Se engancha al playhead y a otros keyframes.
- Con el elemento seleccionado, debajo de su fila verás cada propiedad animada con su valor en el playhead.

## 5. Mira el resultado

Pulsa **Preview** para abrir la animación en una pestaña nueva sin descargar nada. Cuando te guste, sigue con [Exportar y publicar](exportar-publicar.html).

## Qué has aprendido

- Crear formas con la herramienta Shape.
- Activar keyframes con el diamante ◆ y grabar cambios con REC.
- Reproducir, cambiar el easing y mover keyframes en la Timeline.

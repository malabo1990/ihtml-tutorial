---
slug: contador
pair: counter
title: Un contador con variables
description: Crea una variable de proyecto, súmale 1 con cada clic y muéstrala en un texto.
level: Intermedio
minutes: 8
order: 3
---

Las **variables de proyecto** guardan números con nombre: puntos de un juego, pasos de un formulario, clics… En este tutorial haces un contador de puntos.

## 1. Crea la variable

1. Selecciona cualquier elemento y abre la pestaña **Actions**.
2. Arriba de la lista de acciones está **Project Variables**. Pulsa **+ Add Variable**.
3. Nombre: `score`. Valor inicial: `0`.

## 2. Muéstrala en un texto

1. Crea un texto con la herramienta **Text** (`T`) y un clic en el lienzo.
2. En el campo **Content** escribe: `Puntos: {{score}}`.
3. El lienzo ya muestra «Puntos: 0». El valor se actualiza solo cuando la variable cambia.

> Si escribes un nombre que no existe, se queda visible tal cual, para que notes el error.

## 3. Súmale 1 con cada clic

1. Añade un **Button** (`B`) y escribe «+1» en su texto.
2. En **Actions**: disparador **Click**, acción **Set Variable**.
3. Variable `score`, operación **+ Add**, valor `1`.

Pruébalo con el modo **Interactivo**: cada clic suma un punto.

## 4. Más operaciones

Set Variable también puede **= Set to**, **− Subtract**, **× Multiply by**, **÷ Divide by**, **% Remainder of** y limitar con **Clamp** mínimo o máximo. Por ejemplo, un botón «Reiniciar» con **= Set to 0**.

## Qué has aprendido

- Crear variables de proyecto.
- Mostrarlas con `{{nombre}}` en cualquier texto.
- Cambiarlas con la acción Set Variable.

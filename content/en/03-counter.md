---
slug: counter
pair: contador
title: A counter with variables
description: Create a project variable, add 1 on every click and show it in a text.
category: Interactivity
level: Intermediate
minutes: 8
order: 3
---

**Project variables** store named numbers: game points, form steps, clicks… In this tutorial you'll build a score counter.

## 1. Create the variable

1. Select any element and open the **Actions** tab.
2. Above the action list is **Project Variables**. Click **+ Add Variable**.
3. Name: `score`. Initial value: `0`.

## 2. Show it in a text

1. Create a text with the **Text** tool (`T`) and one click on the canvas.
2. In the **Content** field type: `Score: {{score}}`.
3. The canvas now shows "Score: 0". The value updates on its own whenever the variable changes.

> If you type a name that doesn't exist, it stays visible as is, so you notice the mistake.

## 3. Add 1 on every click

1. Add a **Button** (`B`) and set its text to "+1".
2. In **Actions**: **Click** trigger, **Set Variable** action.
3. Variable `score`, operation **+ Add**, value `1`.

Try it in **Interactive** mode: every click adds a point.

## 4. More operations

Set Variable can also **= Set to**, **− Subtract**, **× Multiply by**, **÷ Divide by**, **% Remainder of**, and limit with a minimum or maximum **Clamp**. For example, a "Reset" button with **= Set to 0**.

## What you learned

- Creating project variables.
- Showing them with `{{name}}` in any text.
- Changing them with the Set Variable action.

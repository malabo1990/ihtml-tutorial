---
slug: first-animation
pair: primera-animacion
title: Your first animation
description: Create an element, animate it with keyframes on the Timeline and watch it move in 10 minutes.
category: Getting started
level: Beginner
minutes: 10
order: 1
---

In this tutorial you'll make a square that crosses the canvas and fades out. It's the core IHTML workflow: **element → keyframes → play**.

## Before you start

- Download and install IHTML from [ihtml.eu](https://ihtml.eu/downloads.html).
- Open it: the **canvas** is in the middle, **Elements** and **Layers** on the left, the **Inspector** on the right and the **Timeline** at the bottom.

## 1. Create an element

1. Pick the **Shape** tool (`S` key) in the top bar.
2. Drag on the canvas to draw a rectangle. When you release, the tool switches back to **Select** on its own.
3. The rectangle stays selected, with its bounding box visible.

> Shortcut: with the Select tool active, the `B`, `D` and `Y` keys instantly add a Button, a Div or a YouTube video from the catalog.

## 2. Turn on keyframes for position

1. With the rectangle selected, look at the Inspector's **Design** tab.
2. Next to **X**, click the diamond (◆). IHTML starts tracking that property and creates the first keyframe at the current time (0 s).
3. Do the same for **Opacity**.

## 3. Record the movement

1. Turn on **REC** mode (the red ◆ button on the Timeline, or the `R` key). "● REC" appears in the top right.
2. Drag the red line (the playhead) along the time ruler to 2 s.
3. Move the rectangle to the right and set **Opacity** to 0. Each change creates a keyframe at that time.
4. Press `R` again to leave REC.

## 4. Play and fine-tune

- Press `Space` to play or pause.
- Double-click a keyframe to change its easing curve (linear, ease-in/out, bounce, elastic…).
- Drag a keyframe to change when it happens. It snaps to the playhead and to other keyframes.
- With the element selected, each animated property appears under its row, with its value at the playhead.

## 5. See the result

Click **Preview** to open the animation in a new tab without downloading anything. When you're happy, continue with [Export and publish](export-publish.html).

## What you learned

- Creating shapes with the Shape tool.
- Turning on keyframes with the ◆ diamond and recording changes with REC.
- Playing, changing easing and moving keyframes on the Timeline.

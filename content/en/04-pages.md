---
slug: pages-transitions
pair: paginas-transiciones
title: Pages with transitions
description: Create several pages and move between them with the Go to Page action and an animated transition.
level: Intermediate
minutes: 10
order: 4
---

An IHTML project can have several **pages** (scenes). Only one is visible at a time, and a button can take you to another with a transition.

## 1. Create a second page

1. In the left sidebar, open the **Pages** tab.
2. Click **+ New page** and choose **Blank page**.
3. Click each page in the list to activate it and edit its content. New elements go to the active page.

> **Tablet** and **Mobile** create variants sized for those devices, grouped under the page you had selected.

## 2. "Next" button

1. Activate the first page and add a **Button** with the text "Next".
2. In **Actions**: **Click** trigger, **Go to Page** action.
3. Choose the second page, the **Slide** (or **Fade**) transition and a duration in ms, for example `400`.

## 3. "Back" button

On the second page, add another button with **Go to Page** back to the first one, with **Slide** in the opposite direction.

## 4. Try it

Click **Preview**: once the project uses Go to Page, the exported HTML includes every page (hidden except the first).

## Tips

- The **Selected only / All visible** button shows or hides the outline of the other pages on the canvas.
- Right-click a page to rename, duplicate or delete it.

## What you learned

- Creating blank pages and responsive variants.
- Moving between pages with Go to Page and Fade or Slide transitions.

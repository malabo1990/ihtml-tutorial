---
slug: interactive-button
pair: boton-interactivo
title: A button that shows a panel
description: Use Actions so a click shows or hides another element, without writing code.
category: Interactivity
level: Beginner
minutes: 8
order: 2
---

You'll create a button that shows and hides an info panel when clicked. Everything happens in the Inspector's **Actions** tab: IHTML writes the code for you.

## 1. Set up the elements

1. Add a **Button** from the Elements panel (or press `B`).
2. Add a **Div** (or press `D`) and make it bigger: this is the panel.
3. Name them so they're easy to find: in **Layers**, double-click the name to rename. Call them "Button" and "Panel".

## 2. Add the action

1. Select the **Button** and open the Inspector's **Actions** tab.
2. Choose the **Click** trigger.
3. Choose the **Toggle visibility** action.
4. In **Target**, choose "Panel". Below the fixed options (the element itself, its parent, all), the list shows every element in Layers.

## 3. Try it without exporting

Click the **Interactive** button (next to Preview): the editor enters interactive mode and actions run right on the canvas. Click the button to see the panel appear and disappear. Press `Esc` to go back to editing.

> Actions only change what you see in interactive mode. When you leave, the project returns to its original state.

## 4. Variations

- **Hover** and **Mouse leave**: show the panel when the pointer enters and hide it when it leaves, like a tooltip.
- **Key down**: record a combination such as `Ctrl+3` in the Key field.
- **In viewport**: fires every time the element scrolls into view.
- **Add/remove CSS class** or **Set style** to change how something looks instead of showing or hiding it.

## What you learned

- Triggers (Click, Hover…) and actions (show, hide, toggle).
- Picking an action's target by its layer name.
- Testing interactions with Interactive mode.

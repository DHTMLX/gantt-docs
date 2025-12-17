---
sidebar_label: keyboard_navigation_cells
title: keyboard_navigation_cells config
description: "ermöglicht die Tastaturnavigation durch einzelne Zellen"
---

# keyboard_navigation_cells

### Description

@short: Ermöglicht die Tastaturnavigation durch einzelne Zellen

@signature: keyboard_navigation_cells: boolean

### Example

~~~jsx
gantt.config.keyboard_navigation_cells = true;
~~~

**Default value:** false

### Related samples
- [Keyboard Navigation - navigate cells](https://docs.dhtmlx.com/gantt/samples/02_extensions/17_keyboard_navigation_cell.html)

### Details

:::note
 Diese Einstellung ist Teil der **keyboard_navigation** Erweiterung, daher stellen Sie sicher, dass das [keyboard_navigation](guides/extensions-list.md#keyboardnavigation) Plugin zuerst aktiviert ist. Weitere Details finden Sie im ["Tastaturnavigation"](guides/keyboard-navigation.md) Leitfaden. 
:::

hinzugefügt in Version 4.1

### Related API
- [keyboard_navigation](api/config/keyboard_navigation.md)
- [focus](api/method/focus.md)
- [addShortcut](api/method/addshortcut.md)
- [getShortcutHandler](api/method/getshortcuthandler.md)
- [removeShortcut](api/method/removeshortcut.md)

### Related Guides
- ["Tastaturnavigation"](guides/keyboard-navigation.md)


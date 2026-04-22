---
sidebar_label: keyboard_navigation_cells
title: keyboard_navigation_cells config
description: "Aktiviert die Tastaturnavigation durch Zellen"
---

# keyboard_navigation_cells

### Description

@short: Aktiviert die Tastaturnavigation durch Zellen

@signature: keyboard_navigation_cells: boolean

### Example

~~~jsx
gantt.config.keyboard_navigation_cells = true;
~~~

**Standardwert:** false

### Related samples
- [Tastaturnavigation - Zellen navigieren](https://docs.dhtmlx.com/gantt/samples/02_extensions/17_keyboard_navigation_cell.html)

### Details

:::note
Diese Option ist in der **keyboard_navigation**-Erweiterung definiert, daher müssen Sie das [keyboard_navigation](guides/extensions-list.md#keyboardnavigation) Plugin aktivieren. Lesen Sie die Details im [Tastaturnavigation](guides/keyboard-navigation.md) Artikel.
:::

Hinzugefügt in Version 4.1

### Related API
- [keyboard_navigation](api/config/keyboard_navigation.md)
- [focus](api/method/focus.md)
- [addShortcut](api/method/addshortcut.md)
- [getShortcutHandler](api/method/getshortcuthandler.md)
- [removeShortcut](api/method/removeshortcut.md)

### Related Guides
- [Tastaturnavigation](guides/keyboard-navigation.md)
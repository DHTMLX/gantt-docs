---
sidebar_label: focus
title: focus method
description: "aktiviert den Fokus auf dem Gantt"
---

# focus

### Description

@short: Setzt den Fokus auf das Gantt-Diagramm

@signature: focus: () =\> void

### Example

~~~jsx
gantt.focus();
~~~

### Related samples
- [Tastatur-Navigation](https://docs.dhtmlx.com/gantt/samples/02_extensions/16_keyboard_navigation.html)
- [Tastatur-Navigation - Zellen navigieren](https://docs.dhtmlx.com/gantt/samples/02_extensions/17_keyboard_navigation_cell.html)

### Details

:::note
Diese Methode ist in der **keyboard_navigation**-Erweiterung definiert, daher müssen Sie das [keyboard_navigation](guides/extensions-list.md#keyboardnavigation) Plugin aktivieren. Lesen Sie die Details im Artikel [Tastatur-Navigation](guides/keyboard-navigation.md). 
:::

Hinzugefügt in Version 4.1

### Related API
- [keyboard_navigation](api/config/keyboard_navigation.md)
- [keyboard_navigation_cells](api/config/keyboard_navigation_cells.md)
- [addShortcut](api/method/addshortcut.md)
- [getShortcutHandler](api/method/getshortcuthandler.md)
- [removeShortcut](api/method/removeshortcut.md)

### Related Guides
- [Tastatur-Navigation](guides/keyboard-navigation.md)
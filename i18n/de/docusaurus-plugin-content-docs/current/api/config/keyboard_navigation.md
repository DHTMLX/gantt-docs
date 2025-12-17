---
sidebar_label: keyboard_navigation
title: keyboard_navigation config
description: "ermöglicht die Tastaturnavigation im Gantt"
---

# keyboard_navigation

### Description

@short: Ermöglicht die Tastaturnavigation im Gantt

@signature: keyboard_navigation: boolean

### Example

~~~jsx
gantt.config.keyboard_navigation = true;
~~~

**Default value:** true

### Related samples
- [Keyboard Navigation](https://docs.dhtmlx.com/gantt/samples/02_extensions/16_keyboard_navigation.html)

### Details

:::note
 Diese Einstellung ist Teil der **keyboard_navigation** Erweiterung, daher stellen Sie sicher, dass das [keyboard_navigation](guides/extensions-list.md#keyboardnavigation) Plugin aktiviert ist. Weitere Informationen finden Sie im Artikel ["Tastaturnavigation"](guides/keyboard-navigation.md). 
:::


hinzugefügt in Version 4.1

### Related API
- [keyboard_navigation_cells](api/config/keyboard_navigation_cells.md)
- [focus](api/method/focus.md)
- [addShortcut](api/method/addshortcut.md)
- [getShortcutHandler](api/method/getshortcuthandler.md)
- [removeShortcut](api/method/removeshortcut.md)

### Related Guides
- ["Tastaturnavigation"](guides/keyboard-navigation.md)


---
sidebar_label: addShortcut
title: addShortcut-Methode
description: "fügt eine neue Tastenkombination hinzu"
---

# addShortcut

### Description

@short: Fügt eine neue Tastenkombination hinzu

@signature: addShortcut: (shortcut: string, handler: GanttCallback, scope?: string) =\> void

### Parameters

- `shortcut` - (required) *string* - der Tastenname oder der Name der Tastenkombination für einen Shortcut [shortcut syntax](guides/keyboard-navigation.md#shortcutsyntax)
- `handler` - (required) *function* - der Handler des Shortcuts-Aufrufs

### Example

~~~jsx
gantt.addShortcut("shift+w", function(e){ 
    var task = gantt.locate(e); 
    if(task) 
        gantt.showQuickInfo(task)
},"taskRow");
~~~

### Related samples
- [Keyboard Navigation](https://docs.dhtmlx.com/gantt/samples/02_extensions/16_keyboard_navigation.html)
- [Keyboard Navigation - navigate cells](https://docs.dhtmlx.com/gantt/samples/02_extensions/17_keyboard_navigation_cell.html)

### Details

:::note
Diese Methode ist in der Erweiterung **keyboard_navigation** definiert, daher müssen Sie das [keyboard_navigation](guides/extensions-list.md#keyboardnavigation) Plugin aktivieren. Lesen Sie die Details im Artikel [Keyboard Navigation](guides/keyboard-navigation.md). 
:::

Hinzugefügt in Version 4.1

Falls der dritte Parameter nicht gesetzt ist, wird der Handler dem Gantt-Scope zugeordnet.

### Related API
- [getShortcutHandler](api/method/getshortcuthandler.md)
- [removeShortcut](api/method/removeshortcut.md)
- [keyboard_navigation](api/config/keyboard_navigation.md)
- [keyboard_navigation_cells](api/config/keyboard_navigation_cells.md)
- [focus](api/method/focus.md)

### Related Guides
- [Keyboard Navigation](guides/keyboard-navigation.md)
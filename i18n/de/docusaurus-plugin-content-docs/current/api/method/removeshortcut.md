---
sidebar_label: removeShortcut
title: removeShortcut Methode
description: "Entfernt eine Tastenkombination"
---

# removeShortcut

### Description

@short: Entfernt eine Tastenkombination

@signature: removeShortcut: (shortcut: string, scope: string) =\> void

### Parameters

- `shortcut` - (required) *string* - der Schlüsselname oder der Name einer Tastenkombination für einen Shortcut [(Shortcut-Syntax)](guides/keyboard-navigation.md#shortcutsyntax)
- `scope` - (required) *string* - das Element, an das der Shortcut gebunden ist [(Liste der Geltungsbereiche)](guides/keyboard-navigation.md#scopes) 

### Example

~~~jsx
// Tastenkombination hinzufügen
gantt.addShortcut("shift+w", function(e){ 
    var task = gantt.locate(e); 
    if(task) 
        gantt.showQuickInfo(task)
}, "taskRow");

// Tastenkombination entfernen
gantt.removeShortcut("shift+w", "taskRow");
~~~

### Related samples
- [Tastaturnavigation](https://docs.dhtmlx.com/gantt/samples/02_extensions/16_keyboard_navigation.html)
- [Tastaturnavigation - Zellen navigieren](https://docs.dhtmlx.com/gantt/samples/02_extensions/17_keyboard_navigation_cell.html)

### Details

:::note
Diese Methode ist in der **keyboard_navigation**-Erweiterung definiert, daher müssen Sie das [keyboard_navigation](guides/extensions-list.md#keyboardnavigation) Plugin aktivieren. Lesen Sie die Details im Artikel [Keyboard Navigation](guides/keyboard-navigation.md). 
:::

Hinzugefügt in Version 4.1

### Related API
- [addShortcut](api/method/addshortcut.md)
- [getShortcutHandler](api/method/getshortcuthandler.md)
- [keyboard_navigation](api/config/keyboard_navigation.md)
- [keyboard_navigation_cells](api/config/keyboard_navigation_cells.md)
- [focus](api/method/focus.md)

### Related Guides
- [Tastaturnavigation](guides/keyboard-navigation.md)
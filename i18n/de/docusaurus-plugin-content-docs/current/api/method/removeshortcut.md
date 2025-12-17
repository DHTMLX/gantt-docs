---
sidebar_label: removeShortcut
title: removeShortcut method
description: "entfernt eine Tastenkombination"
---

# removeShortcut

### Description

@short: Entfernt eine Tastenkombination

@signature: removeShortcut: (shortcut: string, scope: string) =\> void

### Parameters

- `shortcut` - (required) *string* - der Name der Taste oder der Tastenkombination für das Shortcut ([Shortcut-Syntax](guides/keyboard-navigation.md#shortcutsyntax))
- `scope` - (required) *string* - das Element, dem das Shortcut zugewiesen ist ([Liste der Scopes](guides/keyboard-navigation.md#scopes))

### Example

~~~jsx
// Hinzufügen eines Shortcuts
gantt.addShortcut("shift+w", function(e){ 
    var task = gantt.locate(e); 
    if(task) 
        gantt.showQuickInfo(task)
}, "taskRow");

// Entfernen eines Shortcuts
gantt.removeShortcut("shift+w", "taskRow");
~~~

### Related samples
- [Keyboard Navigation](https://docs.dhtmlx.com/gantt/samples/02_extensions/16_keyboard_navigation.html)
- [Keyboard Navigation - navigate cells](https://docs.dhtmlx.com/gantt/samples/02_extensions/17_keyboard_navigation_cell.html)

### Details

:::note
 Diese Methode ist Teil der **keyboard_navigation** Erweiterung, daher stellen Sie sicher, dass das [keyboard_navigation](guides/extensions-list.md#keyboardnavigation) Plugin aktiviert ist. Weitere Details finden Sie im Artikel ["Tastaturnavigation"](guides/keyboard-navigation.md). 
:::


hinzugefügt in Version 4.1

### Related API
- [addShortcut](api/method/addshortcut.md)
- [getShortcutHandler](api/method/getshortcuthandler.md)
- [keyboard_navigation](api/config/keyboard_navigation.md)
- [keyboard_navigation_cells](api/config/keyboard_navigation_cells.md)
- [focus](api/method/focus.md)

### Related Guides
- ["Tastaturnavigation"](guides/keyboard-navigation.md)


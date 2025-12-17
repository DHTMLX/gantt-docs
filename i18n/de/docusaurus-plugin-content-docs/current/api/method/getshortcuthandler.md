---
sidebar_label: getShortcutHandler
title: getShortcutHandler method
description: "ruft eine Handler-Funktion für eine Tastaturnavigations-Shortcut ab"
---

# getShortcutHandler

### Description

@short: Ruft eine Handler-Funktion für eine Tastaturnavigations-Shortcut ab

@signature: getShortcutHandler: (shortcut: string, scope: string) =\> GanttCallback

### Parameters

- `shortcut` - (required) *string* - die Taste oder Tastenkombination, die den Shortcut definiert ([Shortcut-Syntax](guides/keyboard-navigation.md#shortcutsyntax))
- `scope` - (required) *string* - der Kontext-Elementname, an dem der Handler angebracht ist ([Liste der Scopes](guides/keyboard-navigation.md#scopes))

### Returns
- ` shortcut_handler` - (function) - die Funktion, die zur Behandlung des Shortcuts zugewiesen ist

### Example

~~~jsx
gantt.addShortcut("shift+w", function(e){ 
    const task = gantt.locate(e); 
    if(task) 
        gantt.showQuickInfo(task)
},"taskRow");

gantt.getShortcutHandler("shift+w", "taskRow")
~~~

### Related samples
- [Keyboard Navigation](https://docs.dhtmlx.com/gantt/samples/02_extensions/16_keyboard_navigation.html)
- [Keyboard Navigation - navigate cells](https://docs.dhtmlx.com/gantt/samples/02_extensions/17_keyboard_navigation_cell.html)

### Details

:::note
 Diese Methode ist Teil der **keyboard_navigation** Extension, daher stellen Sie sicher, dass das [keyboard_navigation](guides/extensions-list.md#keyboardnavigation) Plugin aktiviert ist. Weitere Details finden Sie im Artikel ["Tastaturnavigation"](guides/keyboard-navigation.md). 
:::


hinzugefügt in Version 4.2

### Related API
- [addShortcut](api/method/addshortcut.md)
- [removeShortcut](api/method/removeshortcut.md)
- [keyboard_navigation](api/config/keyboard_navigation.md)
- [keyboard_navigation_cells](api/config/keyboard_navigation_cells.md)
- [focus](api/method/focus.md)

### Related Guides
- ["Tastaturnavigation"](guides/keyboard-navigation.md)


---
sidebar_label: getShortcutHandler
title: getShortcutHandler Methode
description: "erhält einen Shortcut-Handler für die Tastaturnavigation"
---

# getShortcutHandler

### Description

@short: Holt einen Shortcut-Handler für die Tastaturnavigation

@signature: getShortcutHandler: (shortcut: string, scope: string) =\> GanttCallback

### Parameters

- `shortcut` - (erforderlich) *string* - der Schlüsselname oder der Name der Tastenkombination für einen Shortcut ([shortcut syntax](guides/keyboard-navigation.md#shortcutsyntax))
- `scope` - (erforderlich) *string* - der Name des Kontextelements, an das die Handler-Funktion angehängt wird ([Liste der Kontexte](guides/keyboard-navigation.md#scopes))

### Returns
- ` shortcut_handler` - (Funktion) - der Handler des Shortcut-Aufrufs

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
- [Tastaturnavigation](https://docs.dhtmlx.com/gantt/samples/02_extensions/16_keyboard_navigation.html)
- [Tastaturnavigation - Zellen navigieren](https://docs.dhtmlx.com/gantt/samples/02_extensions/17_keyboard_navigation_cell.html)

### Details

:::note
Diese Methode ist in der **keyboard_navigation**-Erweiterung definiert, daher müssen Sie das [keyboard_navigation](guides/extensions-list.md#keyboardnavigation) Plugin aktivieren. Lesen Sie die Details im Artikel [Keyboard Navigation](guides/keyboard-navigation.md). 
:::

In Version 4.2 eingeführt

### Related API
- [addShortcut](api/method/addshortcut.md)
- [removeShortcut](api/method/removeshortcut.md)
- [keyboard_navigation](api/config/keyboard_navigation.md)
- [keyboard_navigation_cells](api/config/keyboard_navigation_cells.md)
- [focus](api/method/focus.md)

### Related Guides
- [Tastaturnavigation](guides/keyboard-navigation.md)
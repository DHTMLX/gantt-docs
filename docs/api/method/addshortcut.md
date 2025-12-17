---
sidebar_label: addShortcut
title: addShortcut method
description: "adds a new keyboard shortcut"
---

# addShortcut

### Description

@short: Adds a new keyboard shortcut

@signature: addShortcut: (shortcut: string, handler: GanttCallback, scope?: string) =\> void

### Parameters

- `shortcut` - (required) *string* - the key name or the name of keys combination for a shortcut [shortcut syntax](guides/keyboard-navigation.md#shortcutsyntax)
- `handler` - (required) *function* - the handler of the shortcut call

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
This method is defined in the **keyboard_navigation** extension, so you need to activate the [keyboard_navigation](guides/extensions-list.md#keyboardnavigation) plugin. Read the details in the [Keyboard Navigation](guides/keyboard-navigation.md) article. 
:::

added in version 4.1

In case the third parameter is not set, the handler will be attached to the gantt scope.

### Related API
- [getShortcutHandler](api/method/getshortcuthandler.md)
- [removeShortcut](api/method/removeshortcut.md)
- [keyboard_navigation](api/config/keyboard_navigation.md)
- [keyboard_navigation_cells](api/config/keyboard_navigation_cells.md)
- [focus](api/method/focus.md)

### Related Guides
- [Keyboard Navigation](guides/keyboard-navigation.md)


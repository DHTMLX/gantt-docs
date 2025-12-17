---
sidebar_label: getShortcutHandler
title: getShortcutHandler method
description: "gets a key navigation shortcut handler"
---

# getShortcutHandler

### Description

@short: Gets a key navigation shortcut handler

@signature: getShortcutHandler: (shortcut: string, scope: string) =\> GanttCallback

### Parameters

- `shortcut` - (required) *string* - the key name or the name of keys combination for a shortcut ([shortcut syntax](guides/keyboard-navigation.md#shortcutsyntax))
- `scope` - (required) *string* - the name of the context element to attach the handler function to ([list of scopes](guides/keyboard-navigation.md#scopes))

### Returns
- ` shortcut_handler` - (function) - the handler of the shortcut call

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
This method is defined in the **keyboard_navigation** extension, so you need to activate the [keyboard_navigation](guides/extensions-list.md#keyboardnavigation) plugin. Read the details in the [Keyboard Navigation](guides/keyboard-navigation.md) article. 
:::


added in version 4.2

### Related API
- [addShortcut](api/method/addshortcut.md)
- [removeShortcut](api/method/removeshortcut.md)
- [keyboard_navigation](api/config/keyboard_navigation.md)
- [keyboard_navigation_cells](api/config/keyboard_navigation_cells.md)
- [focus](api/method/focus.md)

### Related Guides
- [Keyboard Navigation](guides/keyboard-navigation.md)


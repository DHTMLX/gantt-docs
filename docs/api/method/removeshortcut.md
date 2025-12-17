---
sidebar_label: removeShortcut
title: removeShortcut method
description: "removes a keyboard shortcut"
---

# removeShortcut

### Description

@short: Removes a keyboard shortcut

@signature: removeShortcut: (shortcut: string, scope: string) =\> void

### Parameters

- `shortcut` - (required) *string* - the key name or the name of keys combination for a shortcut [(shortcut syntax)](guides/keyboard-navigation.md#shortcutsyntax)
- `scope` - (required) *string* - the element to which the shortcut is attached [(list of scopes)](guides/keyboard-navigation.md#scopes) 

### Example

~~~jsx
// adding a shortcut
gantt.addShortcut("shift+w", function(e){ 
    var task = gantt.locate(e); 
    if(task) 
        gantt.showQuickInfo(task)
}, "taskRow");

// removing a shortcut
gantt.removeShortcut("shift+w", "taskRow");
~~~

### Related samples
- [Keyboard Navigation](https://docs.dhtmlx.com/gantt/samples/02_extensions/16_keyboard_navigation.html)
- [Keyboard Navigation - navigate cells](https://docs.dhtmlx.com/gantt/samples/02_extensions/17_keyboard_navigation_cell.html)

### Details

:::note
This method is defined in the **keyboard_navigation** extension, so you need to activate the [keyboard_navigation](guides/extensions-list.md#keyboardnavigation) plugin. Read the details in the [Keyboard Navigation](guides/keyboard-navigation.md) article. 
:::


added in version 4.1

### Related API
- [addShortcut](api/method/addshortcut.md)
- [getShortcutHandler](api/method/getshortcuthandler.md)
- [keyboard_navigation](api/config/keyboard_navigation.md)
- [keyboard_navigation_cells](api/config/keyboard_navigation_cells.md)
- [focus](api/method/focus.md)

### Related Guides
- [Keyboard Navigation](guides/keyboard-navigation.md)


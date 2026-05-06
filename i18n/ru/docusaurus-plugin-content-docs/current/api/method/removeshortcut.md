---
sidebar_label: removeShortcut
title: removeShortcut method
description: "удаляет горячее сочетание клавиш"
---

# removeShortcut

### Description

@short: Удаляет горячее сочетание клавиш

@signature: removeShortcut: (shortcut: string, scope: string) =\> void

### Parameters

- `shortcut` - (required) *string* - имя клавиши или имя сочетания клавиш для горячей клавиши [(shortcut syntax)](guides/keyboard-navigation.md#shortcutsyntax)
- `scope` - (required) *string* - элемент, к которому привязано сочетание клавиш [(список областей)](guides/keyboard-navigation.md#scopes) 

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
- [Навигация по клавиатуре](https://docs.dhtmlx.com/gantt/samples/02_extensions/16_keyboard_navigation.html)
- [Навигация по клавиатуре - переход по ячейкам](https://docs.dhtmlx.com/gantt/samples/02_extensions/17_keyboard_navigation_cell.html)

### Details

:::note
Этот метод определяется в расширении **keyboard_navigation**, поэтому необходимо активировать плагин [keyboard_navigation](guides/extensions-list.md#keyboardnavigation). Подробности см. в статье [Навигация по клавиатуре](guides/keyboard-navigation.md).
:::

added in version 4.1

### Related API
- [addShortcut](api/method/addshortcut.md)
- [getShortcutHandler](api/method/getshortcuthandler.md)
- [keyboard_navigation](api/config/keyboard_navigation.md)
- [keyboard_navigation_cells](api/config/keyboard_navigation_cells.md)
- [focus](api/method/focus.md)

### Related Guides
- [Навигация по клавиатуре](guides/keyboard-navigation.md)
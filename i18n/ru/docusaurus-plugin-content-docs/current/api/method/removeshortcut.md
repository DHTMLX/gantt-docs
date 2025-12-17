---
sidebar_label: removeShortcut
title: removeShortcut method
description: "удаляет клавиатурный shortcut"
---

# removeShortcut

### Description

@short: Удаляет клавиатурный shortcut

@signature: removeShortcut: (shortcut: string, scope: string) =\> void

### Parameters

- `shortcut` - (required) *string* - название клавиши или комбинации клавиш для shortcut ([синтаксис shortcut](guides/keyboard-navigation.md#shortcutsyntax))
- `scope` - (required) *string* - элемент, к которому привязан shortcut ([список scope](guides/keyboard-navigation.md#scopes))

### Example

~~~jsx
// добавление shortcut
gantt.addShortcut("shift+w", function(e){ 
    var task = gantt.locate(e); 
    if(task) 
        gantt.showQuickInfo(task)
}, "taskRow");

// удаление shortcut
gantt.removeShortcut("shift+w", "taskRow");
~~~

### Related samples
- [Keyboard Navigation](https://docs.dhtmlx.com/gantt/samples/02_extensions/16_keyboard_navigation.html)
- [Keyboard Navigation - navigate cells](https://docs.dhtmlx.com/gantt/samples/02_extensions/17_keyboard_navigation_cell.html)

### Details

:::note
 Этот метод является частью расширения **keyboard_navigation**, поэтому убедитесь, что плагин [keyboard_navigation](guides/extensions-list.md#keyboardnavigation) включен. Подробнее можно узнать в статье [Навигация с клавиатуры](guides/keyboard-navigation.md). 
:::


добавлено в версии 4.1

### Related API
- [addShortcut](api/method/addshortcut.md)
- [getShortcutHandler](api/method/getshortcuthandler.md)
- [keyboard_navigation](api/config/keyboard_navigation.md)
- [keyboard_navigation_cells](api/config/keyboard_navigation_cells.md)
- [focus](api/method/focus.md)

### Related Guides
- [Навигация с клавиатуры](guides/keyboard-navigation.md)


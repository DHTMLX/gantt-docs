---
sidebar_label: addShortcut
title: addShortcut method
description: "Добавляет новое сочетание клавиш"
---

# addShortcut

### Description

@short: Добавляет новое сочетание клавиш

@signature: addShortcut: (shortcut: string, handler: GanttCallback, scope?: string) =\> void

### Parameters

- `shortcut` - (required) *string* - имя клавиши или имя сочетания клавиш для shortcut [shortcut syntax](guides/keyboard-navigation.md#shortcutsyntax)
- `handler` - (required) *function* - обработчик вызова сочетания клавиш

### Example

~~~jsx
gantt.addShortcut("shift+w", function(e){ 
    var task = gantt.locate(e); 
    if(task) 
        gantt.showQuickInfo(task)
},"taskRow");
~~~

### Related samples
- [Навигация по клавиатуре](https://docs.dhtmlx.com/gantt/samples/02_extensions/16_keyboard_navigation.html)
- [Навигация по клавиатуре - переход по ячейкам](https://docs.dhtmlx.com/gantt/samples/02_extensions/17_keyboard_navigation_cell.html)

### Details

:::note
Этот метод определяется в расширении **keyboard_navigation**, поэтому необходимо активировать плагин [keyboard_navigation](guides/extensions-list.md#keyboardnavigation). Подробности смотрите в статье [Keyboard Navigation](guides/keyboard-navigation.md). 
:::

Добавлено в версии 4.1

Если третий параметр не задан, обработчик будет привязан к контексту gantt.

### Related API
- [getShortcutHandler](api/method/getshortcuthandler.md)
- [removeShortcut](api/method/removeshortcut.md)
- [keyboard_navigation](api/config/keyboard_navigation.md)
- [keyboard_navigation_cells](api/config/keyboard_navigation_cells.md)
- [focus](api/method/focus.md)

### Related Guides
- [Навигация по клавиатуре](guides/keyboard-navigation.md)
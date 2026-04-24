---
sidebar_label: getShortcutHandler
title: метод getShortcutHandler
description: "получает обработчик сочетания клавиш для навигации по клавиатуре"
---

# getShortcutHandler

### Description

@short: Получает обработчик сочетания клавиш для навигации по клавиатуре

@signature: getShortcutHandler: (shortcut: string, scope: string) =\> GanttCallback

### Parameters

- `shortcut` - (required) *string* - имя клавиши или имя сочетания клавиш для ярлыка ([синтаксис ярлыков](guides/keyboard-navigation.md#shortcutsyntax))
- `scope` - (required) *string* - имя контекстного элемента, к которому привязывается обработчик функции ([список контекстов](guides/keyboard-navigation.md#scopes))

### Returns
- ` shortcut_handler` - (function) - обработчик вызова ярлыка

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
- [Навигация клавиатурой](https://docs.dhtmlx.com/gantt/samples/02_extensions/16_keyboard_navigation.html)
- [Навигация клавиатурой - переход между ячейками](https://docs.dhtmlx.com/gantt/samples/02_extensions/17_keyboard_navigation_cell.html)

### Details

:::note
Этот метод определяется в расширении **keyboard_navigation**, поэтому необходимо активировать плагин [keyboard_navigation](guides/extensions-list.md#keyboardnavigation). Подробности смотрите в статье [Keyboard Navigation](guides/keyboard-navigation.md).
:::

added in version 4.2

### Related API
- [addShortcut](api/method/addshortcut.md)
- [removeShortcut](api/method/removeshortcut.md)
- [keyboard_navigation](api/config/keyboard_navigation.md)
- [keyboard_navigation_cells](api/config/keyboard_navigation_cells.md)
- [focus](api/method/focus.md)

### Related Guides
- [Навигация клавиатурой](guides/keyboard-navigation.md)
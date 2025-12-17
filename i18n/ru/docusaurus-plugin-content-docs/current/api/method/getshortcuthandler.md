---
sidebar_label: getShortcutHandler
title: getShortcutHandler method
description: "получает функцию-обработчик для навигационного shortcut по клавишам"
---

# getShortcutHandler

### Description

@short: Получает функцию-обработчик для навигационного shortcut по клавишам

@signature: getShortcutHandler: (shortcut: string, scope: string) =\> GanttCallback

### Parameters

- `shortcut` - (required) *string* - клавиша или комбинация клавиш, определяющая shortcut ([синтаксис shortcut](guides/keyboard-navigation.md#shortcutsyntax))
- `scope` - (required) *string* - имя контекстного элемента, к которому привязывается обработчик ([список scopes](guides/keyboard-navigation.md#scopes))

### Returns
- ` shortcut_handler` - (function) - функция, назначенная для обработки данного shortcut

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
 Этот метод является частью расширения **keyboard_navigation**, поэтому убедитесь, что плагин [keyboard_navigation](guides/extensions-list.md#keyboardnavigation) включён. Подробнее см. в статье [Навигация с клавиатуры](guides/keyboard-navigation.md). 
:::


добавлено в версии 4.2

### Related API
- [addShortcut](api/method/addshortcut.md)
- [removeShortcut](api/method/removeshortcut.md)
- [keyboard_navigation](api/config/keyboard_navigation.md)
- [keyboard_navigation_cells](api/config/keyboard_navigation_cells.md)
- [focus](api/method/focus.md)

### Related Guides
- [Навигация с клавиатуры](guides/keyboard-navigation.md)


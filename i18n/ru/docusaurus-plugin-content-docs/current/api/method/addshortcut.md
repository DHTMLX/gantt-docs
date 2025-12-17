---
sidebar_label: addShortcut
title: addShortcut method
description: "добавляет новую клавиатурную комбинацию (shortcut)"
---

# addShortcut

### Description

@short: Добавляет новую клавиатурную комбинацию (shortcut)

@signature: addShortcut: (shortcut: string, handler: GanttCallback, scope?: string) =\> void

### Parameters

- `shortcut` - (required) *string* - клавиша или комбинация клавиш, используемая для shortcut ([синтаксис shortcut](guides/keyboard-navigation.md#shortcutsyntax))
- `handler` - (required) *function* - функция, которая выполняется при срабатывании shortcut
- `scope` - (optional) *string* - необязательный параметр, указывает контекстный элемент, к которому привязывается handler ([список scope](guides/keyboard-navigation.md#scopes)); по умолчанию "gantt"

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
 Этот метод является частью расширения **keyboard_navigation**, поэтому плагин [keyboard_navigation](guides/extensions-list.md#keyboardnavigation) должен быть включен. Для подробностей см. статью [Навигация с клавиатуры](guides/keyboard-navigation.md). 
:::


добавлено в версии 4.1

Если третий параметр опущен, handler по умолчанию привязывается к scope gantt.

### Related API
- [getShortcutHandler](api/method/getshortcuthandler.md)
- [removeShortcut](api/method/removeshortcut.md)
- [keyboard_navigation](api/config/keyboard_navigation.md)
- [keyboard_navigation_cells](api/config/keyboard_navigation_cells.md)
- [focus](api/method/focus.md)

### Related Guides
- [Навигация с клавиатуры](guides/keyboard-navigation.md)


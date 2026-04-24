---
sidebar_label: focus
title: метод focus
description: "Устанавливает фокус на диаграмму Ганта"
---

# focus

### Description

@short: Устанавливает фокус на диаграмму Ганта

@signature: focus: () =\> void

### Example

~~~jsx
gantt.focus();
~~~

### Related samples
- [Навигация с клавиатурой](https://docs.dhtmlx.com/gantt/samples/02_extensions/16_keyboard_navigation.html)
- [Навигация с клавиатурой — переход по ячейкам](https://docs.dhtmlx.com/gantt/samples/02_extensions/17_keyboard_navigation_cell.html)

### Details

:::note
Этот метод определяется в расширении **keyboard_navigation**, поэтому необходимо активировать плагин [keyboard_navigation](guides/extensions-list.md#keyboardnavigation). Подробности читайте в статье [Keyboard Navigation](guides/keyboard-navigation.md).
:::

добавлено в версии 4.1

### Related API
- [keyboard_navigation](api/config/keyboard_navigation.md)
- [keyboard_navigation_cells](api/config/keyboard_navigation_cells.md)
- [addShortcut](api/method/addshortcut.md)
- [getShortcutHandler](api/method/getshortcuthandler.md)
- [removeShortcut](api/method/removeshortcut.md)

### Related Guides
- [Навигация с клавиатурой](guides/keyboard-navigation.md)
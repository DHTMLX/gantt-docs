---
sidebar_label: keyboard_navigation_cells
title: keyboard_navigation_cells config
description: "позволяет осуществлять навигацию с клавиатуры по отдельным ячейкам"
---

# keyboard_navigation_cells

### Description

@short: Позволяет осуществлять навигацию с клавиатуры по отдельным ячейкам

@signature: keyboard_navigation_cells: boolean

### Example

~~~jsx
gantt.config.keyboard_navigation_cells = true;
~~~

**Default value:** false

### Related samples
- [Keyboard Navigation - navigate cells](https://docs.dhtmlx.com/gantt/samples/02_extensions/17_keyboard_navigation_cell.html)

### Details

:::note
note Эта настройка является частью расширения **keyboard_navigation**, поэтому убедитесь, что плагин [keyboard_navigation](guides/extensions-list.md#keyboardnavigation) включён. Более подробную информацию можно найти в руководстве [Навигация с клавиатуры](guides/keyboard-navigation.md). 
:::

добавлено в версии 4.1

### Related API
- [keyboard_navigation](api/config/keyboard_navigation.md)
- [focus](api/method/focus.md)
- [addShortcut](api/method/addshortcut.md)
- [getShortcutHandler](api/method/getshortcuthandler.md)
- [removeShortcut](api/method/removeshortcut.md)

### Related Guides
- [Навигация с клавиатуры](guides/keyboard-navigation.md)


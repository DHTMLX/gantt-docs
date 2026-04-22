---
sidebar_label: keyboard_navigation_cells
title: Конфигурация keyboard_navigation_cells
description: "включает навигацию по ячейкам с клавиатуры"
---

# keyboard_navigation_cells

### Описание

@short: Включает навигацию по ячейкам с клавиатуры

@signature: keyboard_navigation_cells: boolean

### Пример

~~~jsx
gantt.config.keyboard_navigation_cells = true;
~~~

**Значение по умолчанию:** false

### Связанные примеры
- [Keyboard Navigation - navigate cells](https://docs.dhtmlx.com/gantt/samples/02_extensions/17_keyboard_navigation_cell.html)

### Детали

:::note
Эта опция определяется в расширении **keyboard_navigation**, поэтому нужно активировать плагин [keyboard_navigation](guides/extensions-list.md#keyboardnavigation). Подробности читайте в статье [Keyboard Navigation](guides/keyboard-navigation.md).
:::

Добавлено в версии 4.1

### Связанные API
- [keyboard_navigation](api/config/keyboard_navigation.md)
- [focus](api/method/focus.md)
- [addShortcut](api/method/addshortcut.md)
- [getShortcutHandler](api/method/getshortcuthandler.md)
- [removeShortcut](api/method/removeshortcut.md)

### Связанные руководства
- [Навигация по клавиатуре](guides/keyboard-navigation.md)
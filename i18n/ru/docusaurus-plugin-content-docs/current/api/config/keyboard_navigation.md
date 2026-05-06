---
sidebar_label: keyboard_navigation
title: keyboard_navigation конфигурация
description: "включает навигацию клавиатурой в Gantt"
---

# keyboard_navigation

### Описание

@short: Включает навигацию клавиатурой в Gantt

@signature: keyboard_navigation: boolean

### Пример

~~~jsx
gantt.config.keyboard_navigation = true;
~~~

**Значение по умолчанию:** true

### Связанные примеры
- [Навигация клавиатурой](https://docs.dhtmlx.com/gantt/samples/02_extensions/16_keyboard_navigation.html)

### Подробности

:::note
Эта настройка определяется в расширении **keyboard_navigation**, поэтому необходимо активировать плагин [keyboard_navigation](guides/extensions-list.md#keyboardnavigation). Подробности смотрите в статье [Keyboard Navigation](guides/keyboard-navigation.md).
:::

Добавлено в версии 4.1

### Связанные API
- [keyboard_navigation_cells](api/config/keyboard_navigation_cells.md)
- [focus](api/method/focus.md)
- [addShortcut](api/method/addshortcut.md)
- [getShortcutHandler](api/method/getshortcuthandler.md)
- [removeShortcut](api/method/removeshortcut.md)

### Связанные Руководства
- [Навигация клавиатурой](guides/keyboard-navigation.md)
---
sidebar_label: keyboard_navigation
title: keyboard_navigation 配置
description: "在甘特图中启用键盘导航"
---

# keyboard_navigation

### Description

@short: 在甘特图中启用键盘导航

@signature: keyboard_navigation: boolean

### Example

~~~jsx
gantt.config.keyboard_navigation = true;
~~~

**默认值：** true

### Related samples
- [Keyboard Navigation](https://docs.dhtmlx.com/gantt/samples/02_extensions/16_keyboard_navigation.html)

### Details

:::note
此选项在 **keyboard_navigation** 扩展中定义，因此需要激活 [keyboard_navigation](guides/extensions-list.md#keyboardnavigation) 插件。请在 [Keyboard Navigation](guides/keyboard-navigation.md) 文章中阅读详细信息。
:::

新增于 4.1 版本

### Related API
- [keyboard_navigation_cells](api/config/keyboard_navigation_cells.md)
- [focus](api/method/focus.md)
- [addShortcut](api/method/addshortcut.md)
- [getShortcutHandler](api/method/getshortcuthandler.md)
- [removeShortcut](api/method/removeshortcut.md)

### Related Guides
- [Keyboard Navigation](guides/keyboard-navigation.md)
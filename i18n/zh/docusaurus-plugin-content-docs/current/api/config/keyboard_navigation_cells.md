---
sidebar_label: keyboard_navigation_cells
title: keyboard_navigation_cells 配置
description: "启用按单元格的键盘导航"
---

# keyboard_navigation_cells

### Description

@short: 通过单元格启用键盘导航

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
 此设置是 **keyboard_navigation** 扩展的一部分，因此请确保首先启用 [keyboard_navigation](guides/extensions-list.md) 插件。更多详细信息请参考 [键盘导航](guides/keyboard-navigation.md) 指南。 
:::

在版本 4.1 中新增

### Related API
- [keyboard_navigation](api/config/keyboard_navigation.md)
- [focus](api/method/focus.md)
- [addShortcut](api/method/addshortcut.md)
- [getShortcutHandler](api/method/getshortcuthandler.md)
- [removeShortcut](api/method/removeshortcut.md)

### Related Guides
- [Keyboard Navigation](guides/keyboard-navigation.md)
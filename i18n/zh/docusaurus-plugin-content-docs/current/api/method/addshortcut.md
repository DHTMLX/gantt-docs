---
sidebar_label: addShortcut
title: addShortcut method
description: "添加一个新的键盘快捷键"
---

# addShortcut

### Description

@short: 添加一个新的键盘快捷键

@signature: addShortcut: (shortcut: string, handler: GanttCallback, scope?: string) =\> void

### Parameters

- `shortcut` - (required) *string* - 快捷键的按键名称，或快捷键组合的名称 [快捷键语法](guides/keyboard-navigation.md#shortcutsyntax)
- `handler` - (required) *function* - 快捷键调用的处理函数

### Example

~~~jsx
gantt.addShortcut("shift+w", function(e){ 
    var task = gantt.locate(e); 
    if(task) 
        gantt.showQuickInfo(task)
},"taskRow");
~~~

### Related samples
- [键盘导航](https://docs.dhtmlx.com/gantt/samples/02_extensions/16_keyboard_navigation.html)
- [键盘导航 - 导航单元格](https://docs.dhtmlx.com/gantt/samples/02_extensions/17_keyboard_navigation_cell.html)

### Details

:::note
此方法定义在 **keyboard_navigation** 扩展中，因此您需要启用 [keyboard_navigation](guides/extensions-list.md#keyboardnavigation) 插件。请在 [Keyboard Navigation](guides/keyboard-navigation.md) 文章中查看详细信息。
:::

added in version 4.1

在版本 4.1 中新增

### Related API
- [getShortcutHandler](api/method/getshortcuthandler.md)
- [removeShortcut](api/method/removeshortcut.md)
- [keyboard_navigation](api/config/keyboard_navigation.md)
- [keyboard_navigation_cells](api/config/keyboard_navigation_cells.md)
- [focus](api/method/focus.md)

### Related Guides
- [键盘导航](guides/keyboard-navigation.md)
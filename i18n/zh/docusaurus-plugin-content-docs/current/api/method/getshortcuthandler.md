---
sidebar_label: getShortcutHandler
title: getShortcutHandler 方法
description: "获取一个键盘导航快捷键处理程序"
---

# getShortcutHandler

### Description

@short: 获取一个键盘导航快捷键处理程序

@signature: getShortcutHandler: (shortcut: string, scope: string) =\> GanttCallback

### Parameters

- `shortcut` - (required) *string* - 快捷键的键名，或快捷键组合的名称（[shortcut syntax](guides/keyboard-navigation.md#shortcutsyntax)）
- `scope` - (required) *string* - 要附加处理函数的上下文元素名称（[scopes 列表](guides/keyboard-navigation.md#scopes)）

### Returns
- `shortcut_handler` - (function) - 快捷键调用的处理程序

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
- [键盘导航](https://docs.dhtmlx.com/gantt/samples/02_extensions/16_keyboard_navigation.html)
- [键盘导航 - 导航单元格](https://docs.dhtmlx.com/gantt/samples/02_extensions/17_keyboard_navigation_cell.html)

### Details

:::note
此方法在 **keyboard_navigation** 扩展中定义，因此需要激活 [keyboard_navigation](guides/extensions-list.md#keyboardnavigation) 插件。请参阅 [Keyboard Navigation](guides/keyboard-navigation.md) 文章的详细信息。
:::


自版本4.2起新增

### Related API
- [addShortcut](api/method/addshortcut.md)
- [removeShortcut](api/method/removeshortcut.md)
- [keyboard_navigation](api/config/keyboard_navigation.md)
- [keyboard_navigation_cells](api/config/keyboard_navigation_cells.md)
- [focus](api/method/focus.md)

### Related Guides
- [键盘导航](guides/keyboard-navigation.md)
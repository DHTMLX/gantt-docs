---
sidebar_label: getShortcutHandler
title: getShortcutHandler method
description: "获取一个键盘导航快捷键的处理函数"
---

# getShortcutHandler

### Description

@short: 获取一个键盘导航快捷键的处理函数

@signature: getShortcutHandler: (shortcut: string, scope: string) =\> GanttCallback

### Parameters

- `shortcut` - (required) *string* - 定义快捷键的按键或按键组合 ([快捷键语法](guides/keyboard-navigation.md))
- `scope` - (required) *string* - 处理函数绑定的上下文元素名称 ([作用域列表](guides/keyboard-navigation.md))

### Returns
- ` shortcut_handler` - (function) - 分配来处理该快捷键的函数

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
 该方法属于**keyboard_navigation**扩展的一部分，因此请确保启用[keyboard_navigation](guides/extensions-list.md)插件。更多详情请参见[键盘导航](guides/keyboard-navigation.md)文档。 
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


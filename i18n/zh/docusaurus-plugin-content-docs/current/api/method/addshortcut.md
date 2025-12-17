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

- `shortcut` - (required) *string* - 用于快捷键的按键或按键组合 ([快捷键语法](guides/keyboard-navigation.md))
- `handler` - (required) *function* - 当快捷键触发时执行的函数
- `scope` - (optional) *string* - 可选，指定处理函数绑定的上下文元素 ([作用域列表](guides/keyboard-navigation.md))；默认为 "gantt"

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
此方法属于 **keyboard_navigation** 扩展，因此必须启用 [keyboard_navigation](guides/extensions-list.md) 插件。更多详情请参见 [键盘导航](guides/keyboard-navigation.md) 文章。 
:::

自版本 4.1 起添加

如果省略第三个参数，处理函数默认绑定到 gantt 作用域。

### Related API
- [getShortcutHandler](api/method/getshortcuthandler.md)
- [removeShortcut](api/method/removeshortcut.md)
- [keyboard_navigation](api/config/keyboard_navigation.md)
- [keyboard_navigation_cells](api/config/keyboard_navigation_cells.md)
- [focus](api/method/focus.md)

### Related Guides
- [键盘导航](guides/keyboard-navigation.md)


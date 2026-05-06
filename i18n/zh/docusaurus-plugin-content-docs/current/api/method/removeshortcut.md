---
sidebar_label: removeShortcut
title: removeShortcut 方法
description: "移除一个快捷键"
---

# removeShortcut

### Description

@short: 移除一个快捷键

@signature: removeShortcut: (shortcut: string, scope: string) =\> void

### Parameters

- `shortcut` - (必填) *string* - 快捷键的按键名称，或快捷键组合的名称 [(shortcut syntax)](guides/keyboard-navigation.md#shortcutsyntax)
- `scope` - (必填) *string* - 快捷键绑定到的元素 [(作用域列表)](guides/keyboard-navigation.md#scopes) 

### Example

~~~jsx
// 添加快捷键
gantt.addShortcut("shift+w", function(e){ 
    var task = gantt.locate(e); 
    if(task) 
        gantt.showQuickInfo(task)
}, "taskRow");

// 移除快捷键
gantt.removeShortcut("shift+w", "taskRow");
~~~

### Related samples
- [键盘导航](https://docs.dhtmlx.com/gantt/samples/02_extensions/16_keyboard_navigation.html)
- [键盘导航 - 导航单元格](https://docs.dhtmlx.com/gantt/samples/02_extensions/17_keyboard_navigation_cell.html)

### Details

:::note
此方法在 **keyboard_navigation** 扩展中定义，因此需要启用 [keyboard_navigation](guides/extensions-list.md#keyboardnavigation) 插件。请在 [键盘导航](guides/keyboard-navigation.md) 文章中读取详细信息。 
:::

在版本 4.1 中新增

### Related API
- [addShortcut](api/method/addshortcut.md)
- [getShortcutHandler](api/method/getshortcuthandler.md)
- [keyboard_navigation](api/config/keyboard_navigation.md)
- [keyboard_navigation_cells](api/config/keyboard_navigation_cells.md)
- [focus](api/method/focus.md)

### Related Guides
- [键盘导航](guides/keyboard-navigation.md)
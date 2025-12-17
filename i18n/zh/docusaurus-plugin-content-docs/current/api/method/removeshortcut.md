---
sidebar_label: removeShortcut
title: removeShortcut method
description: "移除键盘快捷键"
---

# removeShortcut

### Description

@short: 移除键盘快捷键

@signature: removeShortcut: (shortcut: string, scope: string) =\> void

### Parameters

- `shortcut` - (required) *string* - 快捷键的键名或组合键名称（[快捷键语法](guides/keyboard-navigation.md)）
- `scope` - (required) *string* - 快捷键绑定的元素范围（[范围列表](guides/keyboard-navigation.md)）

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
- [Keyboard Navigation](https://docs.dhtmlx.com/gantt/samples/02_extensions/16_keyboard_navigation.html)
- [Keyboard Navigation - navigate cells](https://docs.dhtmlx.com/gantt/samples/02_extensions/17_keyboard_navigation_cell.html)

### Details

:::note
 此方法属于 **keyboard_navigation** 扩展模块，确保已启用 [keyboard_navigation](guides/extensions-list.md) 插件。更多细节请参阅 [键盘导航](guides/keyboard-navigation.md) 文章。 
:::


版本 4.1 新增

### Related API
- [addShortcut](api/method/addshortcut.md)
- [getShortcutHandler](api/method/getshortcuthandler.md)
- [keyboard_navigation](api/config/keyboard_navigation.md)
- [keyboard_navigation_cells](api/config/keyboard_navigation_cells.md)
- [focus](api/method/focus.md)

### Related Guides
- [键盘导航](guides/keyboard-navigation.md)


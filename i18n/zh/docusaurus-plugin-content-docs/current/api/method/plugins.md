---
sidebar_label: plugins
title: plugins method
description: "启用指定的扩展插件"
---

# plugins

### Description

@short: 启用指定的扩展插件

@signature: plugins: (ext?: GanttPlugins) =\> GanttPlugins

### Parameters

- `ext` - (optional) *GanttPlugins* - 一个列出需要启用扩展插件的对象

### Returns
- ` activatedPlugins` - (GanttPlugins) - 包含已启用扩展插件的对象

### Example

~~~jsx
gantt.plugins({
    quick_info: true,
    keyboard_navigation: true,
    undo: true
});
~~~

### Related Guides
- [扩展功能完整列表](guides/extensions-list.md)

### Change log
- 从 v8.0 起，**export_api** 插件已包含在 plugins 列表中。对于早期版本，需要将 **https://export.dhtmlx.com/gantt/api.js** 脚本添加到页面中。详情请参考 [Migration](migration.md#71---80) 指南。
- 在 v7.0 引入

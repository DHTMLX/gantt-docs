---
sidebar_label: plugins
title: plugins method
description: "启用指定的扩展插件"
---

# plugins

### Description

@short: 激活指定的扩展

@signature: plugins: (ext?: GanttPlugins) =\> GanttPlugins

### Parameters

- `ext` - (可选) *GanttPlugins* - 一个包含需要激活的扩展名称的对象

### Returns
- ` activatedPlugins` - (GanttPlugins) - 一个已激活扩展的对象

### Example

~~~jsx
gantt.plugins({
    quick_info: true,
    keyboard_navigation: true,
    undo: true
});
~~~

### Related Guides
- [扩展全集](guides/extensions-list.md)

### Change log
- 在 v8.0 中，**export_api** 插件已被加入到插件列表中。若在早期版本中需要启用导出服务，需要在页面中引入 **https://export.dhtmlx.com/gantt/api.js** 文件。请参阅 [迁移](migration.md#71---80) 文档。
- 于 v7.0 新增
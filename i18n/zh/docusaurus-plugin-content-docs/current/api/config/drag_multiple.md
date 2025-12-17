---
sidebar_label: drag_multiple
title: drag_multiple config
description: "允许同时拖动多个选中的任务"
---

# drag_multiple

### Description

@short: 允许同时拖动多个选中的任务

@signature: drag_multiple: boolean

### Example

~~~jsx
gantt.config.drag_multiple = false;
gantt.init("gantt_here");
~~~

**Default value:** true

### Related samples
- [Multiselection and Indent/Outdent tasks](https://docs.dhtmlx.com/gantt/samples/02_extensions/09_multiselection.html)

### Details

当选中了多个任务时，拖动未包含在选中范围内的任务只会移动该单个任务。

若要启用项目的拖放功能，请将 [drag_project](api/config/drag_project.md) 配置设置为 *true*。

~~~js
gantt.config.drag_project = true;
~~~

### Related API
- [drag_project](api/config/drag_project.md)

### Related Guides
- [多任务选择](guides/multiselection.md#duorenwuxuanzeyutuozhuai)


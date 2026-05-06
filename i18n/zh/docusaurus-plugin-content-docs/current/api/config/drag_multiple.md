---
sidebar_label: drag_multiple
title: drag_multiple 配置
description: "允许一次拖动多个已选任务"
---

# drag_multiple

### Description

@short: 允许一次拖动多个已选任务

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

如果你选中了多个任务，但拖动一个未被选中的任务 - 只有未被选中的该任务会被移动。

你也可以通过将 [drag_project](api/config/drag_project.md) 配置设置为 *true* 来启用项目的拖放。

~~~js
gantt.config.drag_project = true;
~~~

### Related API
- [drag_project](api/config/drag_project.md)

### Related Guides
- [Multi-Task Selection](guides/multiselection.md#multitaskselectionanddragndrop)
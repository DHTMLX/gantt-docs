---
sidebar_label: inline_editors_multiselect_open
title: inline_editors_multiselect_open config
description: "定义在启用多任务选择时，一次单击任务后是否应打开内联编辑器"
---

# inline_editors_multiselect_open

### Description

@short: 定义在启用多任务选择时，一次单击任务后是否应打开内联编辑器

@signature: inline_editors_multiselect_open: boolean | undefined

### Example

~~~jsx
gantt.config.inline_editors_multiselect_open = true;

gantt.init("gantt_here");
~~~

**默认值：** undefined

### Details

在单选模式下，当你点击任务时，Gantt 会打开内联编辑器。

在多选模式下，第一次单击未选中的任务会选中它，而对该任务的第二次单击将打开内联编辑器。
如果你希望 Gantt 在第一次点击后就打开内联编辑器，请启用配置项 **inline_editors_multiselect_open**。

### Related Guides
- [Grid 内联编辑](guides/inline-editing.md)
- [多任务选择](guides/multiselection.md)

### Change log
- 已在 v7.1.13 版本中新增
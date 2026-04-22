---
sidebar_label: auto_types
title: auto_types 配置
description: "自动将包含子任务的任务转换为项目，且没有子任务的项目会转换回任务"
---

# auto_types

:::info
此功能仅在 PRO 版中可用。 
::: 

### Description

@short: 自动将带有子任务的任务转换为项目，且没有子任务的项目转换回任务

@signature: auto_types: boolean

### Example

~~~jsx
gantt.config.auto_types = true;
~~~

**Default value:** false


### Related samples
- [动态创建摘要任务（auto_types）](https://docs.dhtmlx.com/gantt/samples/04_customization/19_task_type.html)

### Related Guides
- [Grid 中的内联编辑](guides/inline-editing.md)
- [任务类型](guides/task-types.md)
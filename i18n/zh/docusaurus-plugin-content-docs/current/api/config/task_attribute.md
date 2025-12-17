---
sidebar_label: task_attribute
title: task_attribute config
description: "定义用于指定任务HTML元素id的属性名称"
---

# task_attribute

### Description

@short: 定义用于指定任务HTML元素id的属性名称

@signature: task_attribute: string

### Example

~~~jsx
gantt.config.task_attribute = "data-task-id"
~~~

**Default value:** "data-task-id"

### Details

使用默认 **task_attribute** (*data-task-id*) 的任务HTML元素显示如下:

![data_task_id](/img/data_task_id.png)

为了兼容早期版本，仍然包含 *task_id* 属性。

### Related API
- [locate](api/method/locate.md)


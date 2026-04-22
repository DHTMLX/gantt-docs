---
sidebar_label: task_attribute
title: task_attribute 配置
description: "设置将用于指定任务的 HTML 元素 ID 的属性名"
---

# task_attribute

### Description

@short: 设置将用于指定任务的 HTML 元素 ID 的属性名

@signature: task_attribute: string

### Example

~~~jsx
gantt.config.task_attribute = "data-task-id"
~~~

**默认值:** "data-task-id"

### Details

![data_task_id](/img/data_task_id.png)

使用默认的 **task_attribute** (*data-task-id*) 的任务 HTML 元素看起来像这样：

为了与早期版本向后兼容，包含了 *task_id* 属性。

### Related API
- [locate](api/method/locate.md)
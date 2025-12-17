---
sidebar_label: task_attribute
title: task_attribute config
description: "sets the name of the attribute that will specify the id of the task's HTML element"
---

# task_attribute

### Description

@short: Sets the name of the attribute that will specify the id of the task's HTML element

@signature: task_attribute: string

### Example

~~~jsx
gantt.config.task_attribute = "data-task-id"
~~~

**Default value:** "data-task-id"

### Details

![data_task_id](/img/data_task_id.png)

HTML elements of tasks with the default **task_attribute** (*data-task-id* ) look like this:

The *task_id* attribute is included to remain backward compatibility with previous versions.

### Related API
- [locate](api/method/locate.md)


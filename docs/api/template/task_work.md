---
sidebar_label: task_work
title: task_work template
description: "Formats the stored task work for display."
---

# task_work

### Description

@short: Formats the stored work of a task for display

@signature: task_work: (task: Task) =\> string | number | void;

### Parameters

- `task` is the task to display.

### Returns

By default, the template returns `task.work` when a value is present or an empty string. Use [getTaskWork](api/method/gettaskwork.md) when you need to read the calculated amount.

### Example

~~~js
gantt.config.columns = [
    { name: "text", tree: true, width: "*" },
    {
        name: "work",
        label: gantt.locale.labels.column_work,
        template: task => gantt.templates.task_work(task)
    }
];
~~~

### Related guides

- [Effort-Driven Tasks](guides/effort-driven-tasks.md)

### Change log

- Added in v10.1.

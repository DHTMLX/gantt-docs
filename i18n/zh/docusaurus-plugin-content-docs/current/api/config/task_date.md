---
sidebar_label: task_date
title: task_date config
description: "定义在 lightbox 的'时间段'部分显示的日期标签格式"
---

# task_date

### Description

@short: 定义在 lightbox 的"时间段"部分显示的日期标签格式

@signature: task_date: string

### Example

~~~jsx
gantt.config.task_date = "%d-%m-%Y";
gantt.init("gantt_here");
~~~

**Default value:** "%d %F %Y"

### Related API
- [task_date](api/template/task_date.md)

### Related Guides
- [日期格式规范](guides/date-format.md)


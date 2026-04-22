---
sidebar_label: task_date
title: task_date 配置
description: "设置 lightbox 的 'Time period' 部分日期标签的格式"
---

# task_date

### Description

@short: 设置 lightbox 的 'Time period' 部分日期标签的格式

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
- [Date Format Specification](guides/date-format.md)
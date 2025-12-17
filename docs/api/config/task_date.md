---
sidebar_label: task_date
title: task_date config
description: "sets the format of the date label in the 'Time period' section of the lightbox"
---

# task_date

### Description

@short: Sets the format of the date label in the 'Time period' section of the lightbox

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


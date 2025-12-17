---
sidebar_label: min_duration
title: min_duration config
description: "sets the minimum duration (in milliseconds) that can be set for a task during resizing."
---

# min_duration

### Description

@short: Sets the minimum duration (in milliseconds) that can be set for a task during resizing.

@signature: min_duration: number

### Example

~~~jsx
gantt.config.min_duration = 24*60*60*1000; // (1 day)
~~~

### Details

- Config value specifies time span between start and end dates of task (task.start_date - task.end_date), the value is not affected by [working time settings](guides/working-time.md) or [duration calculations](api/method/calculateduration.md).

### Related Guides
- [Dragging Tasks within the Timeline](guides/dnd.md)

**Default value:** 60*60*1000, or 3600000 ms, 1 hour


---
sidebar_label: getSubtaskDuration
title: getSubtaskDuration method
description: "calculates the combined duration of tasks nested in a project or another task."
---

# getSubtaskDuration

### Description

@short: Calculates the combined duration of tasks nested in a project or another task.

@signature: getSubtaskDuration: (task_id?: string | number) =\> number

### Parameters

- `task_id` - (optional) *string | number*	-	the task's id, [root_id](api/config/root_id.md) will be used if not specified

### Returns
- ` duration` - (number) - total duration of nested tasks

### Example

~~~jsx
const formatter = gantt.ext.formatters.durationFormatter();
//duration of the whole project
let duration = gantt.getSubtaskDuration();
    
console.log(formatter.format(duration));

//duration of the subproject
duration = gantt.getSubtaskDates(1);
    
console.log(formatter.format(duration));
~~~

### Details

Calculates the combined duration of tasks nested in a project or another task.

Tasks of the [project type](api/config/types.md) are not counted in the total duration.

The return value is calculated in [duration units](api/config/duration_unit.md) from the config.

### Related API
- [getSubtaskDates](api/method/getsubtaskdates.md)
- [getTaskBy](api/method/gettaskby.md)

### Related Guides
- [Formatters Extension](guides/formatters-ext.md#durationformatter)


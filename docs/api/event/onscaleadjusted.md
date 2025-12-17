---
sidebar_label: onScaleAdjusted
title: onScaleAdjusted event
description: "fires when the scale is re-rendered in order to display all tasks completely"
---

# onScaleAdjusted

### Description

@short: Fires when the scale is re-rendered in order to display all tasks completely

@signature: onScaleAdjusted: () =\> void;

### Example

~~~jsx
gantt.attachEvent("onScaleAdjusted", function(){
    const min = gantt.getState().min_date;
    const max = gantt.getState().max_date;
    const to_str = gantt.templates.task_date;

    return gantt.message(`Scale shows days from ${to_str(min)} 
 to ${to_str(max)}`);
});
~~~

### Related samples
- [Auto resize scale](https://docs.dhtmlx.com/gantt/samples/03_scales/08_scale_autoconfig.html)

### Details

Note, the event will fire only if the [fit_tasks](api/config/fit_tasks.md) property is set to *true*.

### Related API
- [fit_tasks](api/config/fit_tasks.md)


---
sidebar_label: onScaleAdjusted
title: onScaleAdjusted event
description: "Wird ausgelöst, wenn die Skala neu gerendert wird, um sicherzustellen, dass alle Tasks vollständig sichtbar sind"
---

# onScaleAdjusted

### Description

@short: Wird ausgelöst, wenn die Skala neu gerendert wird, um sicherzustellen, dass alle Tasks vollständig sichtbar sind

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

Beachten Sie, dass dieses Event nur ausgelöst wird, wenn die [fit_tasks](api/config/fit_tasks.md) Eigenschaft aktiviert ist (auf *true* gesetzt).

### Related API
- [fit_tasks](api/config/fit_tasks.md)


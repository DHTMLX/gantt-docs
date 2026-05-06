---
sidebar_label: onScaleAdjusted
title: onScaleAdjusted-Ereignis
description: "Wird ausgelöst, wenn die Skala neu gerendert wird, um alle Aufgaben vollständig anzuzeigen"
---

# onScaleAdjusted

### Description

@short: Wird neu gerendert, um alle Aufgaben vollständig anzuzeigen

@signature: onScaleAdjusted: () => void;

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

Hinweis: Das Ereignis wird nur ausgelöst, wenn die Eigenschaft [fit_tasks](api/config/fit_tasks.md) auf *true* gesetzt ist.

### Related API
- [fit_tasks](api/config/fit_tasks.md)
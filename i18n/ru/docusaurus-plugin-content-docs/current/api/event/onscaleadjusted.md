---
sidebar_label: onScaleAdjusted
title: onScaleAdjusted event
description: "срабатывает при повторном рендеринге масштаба для обеспечения полной видимости всех задач"
---

# onScaleAdjusted

### Description

@short: Срабатывает при повторном рендеринге масштаба для обеспечения полной видимости всех задач

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

Имейте в виду, что это событие срабатывает только если свойство [fit_tasks](api/config/fit_tasks.md) включено (установлено в *true*).

### Related API
- [fit_tasks](api/config/fit_tasks.md)


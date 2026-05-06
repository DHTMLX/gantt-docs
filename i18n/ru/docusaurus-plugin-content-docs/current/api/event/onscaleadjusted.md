---
sidebar_label: onScaleAdjusted
title: Событие onScaleAdjusted
description: "срабатывает при повторной отрисовке масштаба, чтобы полностью отобразить все задачи"
---

# onScaleAdjusted

### Description

@short: Срабатывает при повторной отрисовке масштаба, чтобы полностью отобразить все задачи

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
- [Автоматическая настройка масштаба](https://docs.dhtmlx.com/gantt/samples/03_scales/08_scale_autoconfig.html)

### Details

Примечание: событие будет срабатывать только в том случае, если свойство [fit_tasks](api/config/fit_tasks.md) установлено в *true*.

### Related API
- [fit_tasks](api/config/fit_tasks.md)
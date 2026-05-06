---
sidebar_label: onScaleAdjusted
title: onScaleAdjusted event
description: "当比例尺重新渲染以完整显示所有任务时触发"
---

# onScaleAdjusted

### Description

@short: 当比例尺重新渲染以完整显示所有任务时触发

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
- [自动调整比例尺](https://docs.dhtmlx.com/gantt/samples/03_scales/08_scale_autoconfig.html)

### Details

请注意，只有当 [fit_tasks](api/config/fit_tasks.md) 属性被设置为 *true* 时，事件才会触发。

### Related API
- [fit_tasks](api/config/fit_tasks.md)
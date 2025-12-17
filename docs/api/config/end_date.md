---
sidebar_label: end_date
title: end_date config
description: "sets the end value of the time scale"
---

# end_date

### Description

@short: Sets the end value of the time scale

@signature: end_date: Date | undefined

### Example

~~~jsx
gantt.config.start_date = new Date(2018, 08, 10);
gantt.config.end_date = new Date(2018, 08, 20);
 
gantt.init("gantt_here");
~~~

### Details

:::note
To apply the **end_date** option, you must use it in pair with the [start_date](api/config/start_date.md) one. 
:::

- If both the **start_date** and **end_date** options are specified and you create a task that is outside the range, the task won't be displayed in the chart.
- Optional parameters of the [init](api/method/init.md) method can be used as initial values of the [start_date](api/config/start_date.md) and [end_date](api/config/end_date.md) configs.
- [start_date](api/config/start_date.md) and [end_date](api/config/end_date.md) overwrite [fit_tasks](api/config/fit_tasks.md). If you want to use these settings together, you'll need to [manage the time scale from code](guides/configuring-time-scale.md#range).

In this case we can extend the range:

~~~js
gantt.attachEvent("onLightboxSave", function(id, task, is_new){
 const taskStart = task.start_date;
 const taskEnd = task.end_date;
 const scaleStart = gantt.config.start_date;
 const scaleEnd = gantt.config.end_date;

 // if the task is out of the range
 if(scaleStart > taskEnd || scaleEnd  taskEnd || scaleEnd < taskStart ){
    gantt.message({
      type:"warning", 
      text:"Warning! The task is outside the date range!",
      expire:5000
    });
    return false;
  } 
  return true;
});
~~~

### Related API
- [start_date](api/config/start_date.md)
- [fit_tasks](api/config/fit_tasks.md)
- [init](api/method/init.md)
- [show_tasks_outside_timescale](api/config/show_tasks_outside_timescale.md)

### Related Guides
- [Setting up Scale](guides/configuring-time-scale.md)


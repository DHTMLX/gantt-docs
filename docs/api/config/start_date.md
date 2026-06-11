---
sidebar_label: start_date
title: start_date config
description: "sets the start value of the time scale"
---

# start_date

### Description

@short: Sets the start value of the time scale

@signature: start_date: Date | undefined

### Example

~~~jsx
gantt.config.start_date = new Date(2027, 8, 10);
gantt.config.end_date = new Date(2027, 8, 20);

gantt.init("gantt_here");
~~~

### Details

:::note
To apply the `start_date` option, you must use it together with [end_date](api/config/end_date.md).
:::

- If both the [start_date](api/config/start_date.md) and [end_date](api/config/end_date.md) options are specified and you create a task outside that range, the task will disappear from the chart.
- Optional parameters of [`init()`](api/method/init.md) can be used as initial values of [start_date](api/config/start_date.md) and [end_date](api/config/end_date.md).
- [start_date](api/config/start_date.md) and [end_date](api/config/end_date.md) overwrite [fit_tasks](api/config/fit_tasks.md). If you want to use these settings together, you'll need to [manage the time scale from code](guides/configuring-time-scale.md#range).

In this case we can extend the range:

~~~js
gantt.attachEvent("onLightboxSave", (taskId, task, isNew) => {
    const taskStartDate = task.start_date;
    const taskEndDate = task.end_date;
    const scaleStartDate = gantt.config.start_date;
    const scaleEndDate = gantt.config.end_date;

    if (scaleStartDate > taskEndDate || scaleEndDate < taskStartDate) {
        gantt.message({ type: "warning", text: "Warning! The task is outside the date range!", expire: 5000 });

        return false;
    }

    return true;
});
~~~

### Related API
- [end_date](api/config/end_date.md)
- [fit_tasks](api/config/fit_tasks.md)
- [init](api/method/init.md)
- [show_tasks_outside_timescale](api/config/show_tasks_outside_timescale.md)

### Related Guides
- [Setting up Scale](guides/configuring-time-scale.md)

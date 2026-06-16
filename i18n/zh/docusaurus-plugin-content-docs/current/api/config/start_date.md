---
sidebar_label: start_date
title: start_date config
description: "设置时间刻度的起始值"
---

# start_date

### Description

@short: 设置时间刻度的起始值

@signature: start_date: Date | undefined

### Example

~~~jsx
gantt.config.start_date = new Date(2027, 8, 10);
gantt.config.end_date = new Date(2027, 8, 20);

gantt.init("gantt_here");
~~~

### Details

:::note
要应用 `start_date` 选项，必须与 [end_date](api/config/end_date.md) 一起使用。
:::

- 如果同时指定 [start_date](api/config/start_date.md) 和 [end_date](api/config/end_date.md) 选项，并且你在该范围之外创建任务，任务将从图表中消失。
- [`init()`](api/method/init.md) 的可选参数可以用作 [start_date](api/config/start_date.md) 和 [end_date](api/config/end_date.md) 的初始值。
- [start_date](api/config/start_date.md) 和 [end_date](api/config/end_date.md) 将覆盖 [fit_tasks](api/config/fit_tasks.md)。如果你想把这些设置一起使用，你需要 [从代码中管理时间尺度](guides/configuring-time-scale.md#range)。

在这种情况下，我们可以扩展范围：

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
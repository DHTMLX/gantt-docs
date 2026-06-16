---
sidebar_label: start_date
title: start_date конфигурация
description: "устанавливает начальное значение шкалы времени"
---

# start_date

### Description

@short: Устанавливает начальное значение шкалы времени

@signature: start_date: Date | undefined

### Example

~~~jsx
gantt.config.start_date = new Date(2027, 8, 10);
gantt.config.end_date = new Date(2027, 8, 20);

gantt.init("gantt_here");
~~~

### Details

:::note
Чтобы применить опцию `start_date`, нужно использовать ее вместе с [end_date](api/config/end_date.md).
:::

- Если заданы обе опции [start_date](api/config/start_date.md) и [end_date](api/config/end_date.md) и вы создаете задачу за пределами этого диапазона, задача исчезнет с графика.
- Необязательные параметры [`init()`](api/method/init.md) можно использовать в качестве начальных значений [start_date](api/config/start_date.md) и [end_date](api/config/end_date.md).
- [start_date](api/config/start_date.md) и [end_date](api/config/end_date.md) перекрывают [fit_tasks](api/config/fit_tasks.md). Если вы хотите использовать эти настройки вместе, вам нужно [управлять шкалой времени из кода](guides/configuring-time-scale.md#range).

В этом случае мы можем расширить диапазон:

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
- [Настройка масштаба](guides/configuring-time-scale.md)
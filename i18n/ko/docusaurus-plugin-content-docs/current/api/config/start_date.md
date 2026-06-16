---
sidebar_label: start_date
title: start_date config
description: "타임 스케일의 시작 값을 설정합니다"
---

# start_date

### Description

@short: 타임 스케일의 시작 값을 설정합니다

@signature: start_date: Date | undefined

### Example

~~~jsx
gantt.config.start_date = new Date(2027, 8, 10);
gantt.config.end_date = new Date(2027, 8, 20);

gantt.init("gantt_here");
~~~

### Details

:::note
`start_date` 옵션을 적용하려면 [end_date](api/config/end_date.md)와 함께 사용해야 합니다.
:::

- [start_date](api/config/start_date.md)와 [end_date](api/config/end_date.md) 옵션이 모두 지정되고 이 범위를 벗어나는 작업을 생성하면 차트에서 해당 작업이 사라집니다.
- [`init()`](api/method/init.md)의 선택적 매개변수는 [start_date](api/config/start_date.md) 및 [end_date](api/config/end_date.md)의 초기 값으로 사용할 수 있습니다.
- [start_date](api/config/start_date.md)와 [end_date](api/config/end_date.md)는 [fit_tasks](api/config/fit_tasks.md)를 덮어씁니다. 이 설정을 함께 사용하려면 코드를 통해 타임 스케일을 관리해야 합니다 [타임 스케일을 코드로 관리하기](guides/configuring-time-scale.md#range).

이 경우 범위를 확장할 수 있습니다.

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
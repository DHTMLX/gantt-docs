---
sidebar_label: fit_tasks
title: fit_tasks config
description: "Gantt 차트가 표시된 모든 작업이 시간 축에 맞도록 자동으로 조정하도록 '지시'합니다."
---

# fit_tasks

### Description

@short: Gantt 차트가 표시된 모든 작업이 시간 축에 맞도록 자동으로 조정하도록 '지시'합니다.

@signature: fit_tasks: boolean

### Example

~~~jsx
gantt.config.fit_tasks = true; /*!*/
gantt.init("gantt_here");
~~~

**Default value:** false

### Related samples
- [Auto resize scale](https://docs.dhtmlx.com/gantt/samples/03_scales/08_scale_autoconfig.html)

### Details

기본적으로 dhtmlxGantt는 작업이 현재 시간 간격을 벗어날 경우 시간 축을 자동으로 확장하지 않습니다. 이 상황은 사용자가 작업 날짜를 변경하거나 자동 스케줄링 후에 발생할 수 있습니다. 
결과적으로 작업 바가 잘리거나 보이지 않게 될 수 있습니다.

작업이 현재 시간 축 간격에 맞지 않을 때마다 스케일이 업데이트되도록 하려면 [fit_tasks](api/config/fit_tasks.md) 속성을 *true*로 설정하세요.

단, 이 동작은 시간 축을 특정 범위로 제한하는 [start_date](api/config/start_date.md) 및 [end_date](api/config/end_date.md) 설정에 의해 무시될 수 있습니다.

시간 범위에 따라 시간 축이 동적으로 조정되길 원한다면 [start_date](api/config/start_date.md)와 [end_date](api/config/end_date.md) 설정을 생략하거나 [시간 범위를 동적으로 처리](guides/configuring-time-scale.md#range)할 수 있습니다.

<br>

**예를 들어, 작업 "Project #2"의 초기 기간은 6일입니다.**


![property_fit_tasks_01](/img/property_fit_tasks_01.png)

기간이 8일로 연장되면, [fit_tasks](api/config/fit_tasks.md) 속성 값에 따라 Gantt 차트가 다르게 반응합니다:


- **gantt.config.fit_tasks = false;** (기본값)

![property_fit_tasks_02](/img/property_fit_tasks_02.png)

- **gantt.config.fit_tasks = true;** 

![property_fit_tasks_03](/img/property_fit_tasks_03.png)

### Related API
- [onScaleAdjusted](api/event/onscaleadjusted.md)
- [end_date](api/config/end_date.md)
- [start_date](api/config/start_date.md)
- [init](api/method/init.md)


---
sidebar_label: fit_tasks
title: fit_tasks 설정
description: "'says'를 통해 Gantt 차트가 표시된 모든 작업에 맞추도록 시간 눈금을 자동으로 확장하도록 지시합니다"
---

# fit_tasks

### Description

@short: 'says'를 통해 Gantt 차트가 표시된 모든 작업에 맞추도록 시간 눈금을 자동으로 확장합니다

@signature: fit_tasks: boolean

### Example

~~~jsx
gantt.config.fit_tasks = true; /*!*/
gantt.init("gantt_here");
~~~

**Default value:** false

### Related samples
- [자동 크기 조정 스케일](https://docs.dhtmlx.com/gantt/samples/03_scales/08_scale_autoconfig.html)

### Details

기본적으로, dhtmlxGantt은 일부 작업이 현재 구간에 더 이상 맞지 않는 경우 시간 눈금을 자동으로 확장하지 않습니다. 이는 사용자가 작업 날짜를 설정하거나 자동 스케줄링 후에 발생할 수 있습니다. 
그런 경우 작업 바가 잘리거나 전혀 보이지 않을 수 있습니다.

작업이 기존 눈금 간격에 맞지 않을 때마다 눈금을 재렌더링하도록 강제하려면 [fit_tasks](api/config/fit_tasks.md) 속성을 *true*로 설정하십시오.

이 설정은 [start_date](api/config/start_date.md) 및 [end_date](api/config/end_date.md) 구성으로 취소될 수 있으며, 이는 시간 눈금을 지정된 경계로 제한합니다.

날짜 범위에 따라 시간 눈금을 동적으로 조정하려면 [start_date](api/config/start_date.md)와 [end_date](api/config/end_date.md) 구성을 건너뛰거나 [시간 범위를 동적으로 관리하기](guides/configuring-time-scale.md#range)를 참조하십시오.

**예를 들어, 작업 "Project #2"의 초기 지속 기간은 6일입니다.**

![property_fit_tasks_01](/img/property_fit_tasks_01.png)

사용자가 기간을 예를 들어 8일로 설정하여 기간을 늘리면, Gantt 차트는 [fit_tasks](api/config/fit_tasks.md) 속성의 값에 따라 다르게 동작합니다:

- **gantt.config.fit_tasks = false;** (기본값)

![property_fit_tasks_02](/img/property_fit_tasks_02.png)

- **gantt.config.fit_tasks = true;**
![property_fit_tasks_03](/img/property_fit_tasks_03.png)


### Related API
- [onScaleAdjusted](api/event/onscaleadjusted.md)
- [end_date](api/config/end_date.md)
- [start_date](api/config/start_date.md)
- [init](api/method/init.md)
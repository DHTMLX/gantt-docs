---
sidebar_label: duration_unit
title: duration_unit config
description: "지속 시간 단위 설정"
---

# duration_unit

### Description

@short: 지속 시간 단위 설정

@signature: duration_unit: string

### Example

~~~jsx
gantt.config.duration_unit = "hour";//한 시간
gantt.config.duration_step = 3; 
//따라서 task.duration = 2이면 작업은 6시간 동안 지속됩니다.
~~~

**Default value:** "day"

### Related samples
- [Decimal durations for tasks](https://docs.dhtmlx.com/gantt/samples/09_worktime/09_decimal_durations.html)

### Details

서로 다른 작업들이 각각 시간 단위나 일 단위 등 다양한 지속 시간 단위를 필요로 할 때, [formatter 모듈](guides/working-time.md#taskdurationindecimalformat)을 사용하여 이를 관리할 수 있습니다.

이 경우, **duration_unit**은 어떤 작업이든 사용할 수 있는 가장 작은 단위로 설정해야 합니다:

~~~js
gantt.config.duration_step = 1;
gantt.config.duration_unit = "minute";

// 또는

gantt.config.duration_step = 1;
gantt.config.duration_unit = "hour";
~~~

그 후 formatter 플러그인은 원하는 단위로 지속 시간을 표시할 수 있게 해줍니다. 또한 사용자가 다양한 단위를 사용해 지속 시간을 입력할 수 있도록 지원합니다.

<br>
만약 "hour" 또는 "minute"을 duration_unit으로 선택한다면, [duration_step](api/config/duration_step.md)을 1로 설정하는 것이 좋습니다. 이 설정은 작업 시간 계산에 최적화된 기능을 활성화하는데, 이 기능은 step이 정확히 1일 때만 작동합니다. "최적화된" 모드와 "비최적화된" 모드 사이에는 성능 차이가 크다는 점을 유의하세요.

### Related API
- [duration_step](api/config/duration_step.md)
- @related: [작업 시간 계산](guides/working-time.md#taskdurationindecimalformat)
- @relatedsample: [Decimal durations for tasks](https://docs.dhtmlx.com/gantt/samples/09_worktime/09_decimal_durations.html)

### Related Guides
- [작업 시간 계산](guides/working-time.md#taskdurationindecimalformat)
- @relatedsample: [Decimal durations for tasks](https://docs.dhtmlx.com/gantt/samples/09_worktime/09_decimal_durations.html)


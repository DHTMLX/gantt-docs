---
sidebar_label: skip_off_time
title: skip_off_time config
description: "타임스케일에서 비근무 시간을 숨깁니다"
---

# skip_off_time
:::info
이 기능은 PRO 에디션에서만 사용할 수 있습니다. 
:::
### Description

@short: 타임스케일에서 비근무 시간을 숨깁니다

@signature: skip_off_time: boolean

### Example

~~~jsx
// 근무 시간 단위로 기간을 계산하고 차트에서 비근무 시간을 숨깁니다
gantt.config.duration_unit = "hour";
gantt.config.work_time = true; 
gantt.config.skip_off_time = true; /*!*/

gantt.init("gantt_here");
~~~

**Default value:** false

### Details


**skip_off_time** 설정은 스케일 자체를 변경하지 않고, 근무 시간이 전혀 포함되지 않은 셀을 숨긴다는 점을 기억하세요.

예제 1

00:00부터 23:59까지 하루 단위 스케일이 있고, 근무 시간이 08:00부터 16:59까지이며, 가장 작은 스케일 단위가 1시간이라고 가정합니다. 
**skip_off_time**이 *true*로 설정되면, 비근무 시간을 나타내는 모든 셀들이 모든 스케일에서 숨겨집니다.  
즉, 하루 스케일은 사실상 08:00부터 16:59까지 표시됩니다. 하지만 하루 스케일만 표시된다면, 근무 시간이 포함되어 있으므로 00:00부터 23:59까지 변경 없이 표시됩니다.

예제 2

7일을 포함하는 주 단위 스케일이 있고, 2일은 휴일(예: 토요일과 일요일)이며, 가장 작은 스케일 단위가 하루라고 가정합니다. 
**skip_off_time**이 *true*로 설정되면 휴일이 숨겨져서 주 스케일은 월요일부터 금요일까지 표시됩니다.  
하지만 주 스케일만 보이는 경우에는, 주에는 휴일이 포함되므로 **skip_off_time** 설정과 상관없이 월요일부터 일요일까지 표시됩니다.

비근무 시간을 숨기는 차트를 표시하는 방법은 두 가지가 있습니다:

- 더 작은 단위의 스케일을 추가 (예: 하루 스케일 옆에 시간 스케일 추가, 또는 주 스케일 옆에 하루 스케일 추가)
- 근무 시간 또는 근무 일만 표시하는 [커스텀 스케일](guides/configuring-time-scale.md#customtimeunits) 사용

:::note

**Related example:** [5일 근무 주간 스케일 예제](https://snippet.dhtmlx.com/eq70o558)

:::

### Related API
- [correct_work_time](api/config/correct_work_time.md)
- [work_time](api/config/work_time.md)

### Related Guides
- [작업 시간 계산](guides/working-time.md)


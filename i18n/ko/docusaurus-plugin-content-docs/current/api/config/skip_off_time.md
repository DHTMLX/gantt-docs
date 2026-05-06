---
sidebar_label: skip_off_time
title: skip_off_time config
description: "근무 시간이 아닌 시간을 타임스케일에서 숨깁니다"
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

참고로, **skip_off_time** 설정은 축을 수정하지 않으며 근무 시간이 전혀 없는 셀을 숨깁니다. 

Example 1

하루 스케일은 00:00에 시작해 23:59에 끝나고, 근무 시간은 08:00에 시작해 16:59에 끝납니다. 시간 단위의 최소 스케일을 가지고 있습니다. 
When the **skip_off_time** config is set to *true*, the cells that have non-working time, will be hidden for all the scales. 
따라서 하루 스케일은 08:00에 시작해 16:59에 끝납니다. 다만, 하루 스케일만 있다면 변경되지 않습니다.
하루 스케일이 단독일 경우엔 00:00에 시작해 23:59로 끝납니다. 이는 하루 안에 근무 시간이 포함되어 있기 때문입니다.

Example 2

주 단위 스케일은 총 7일이며 그 중 2일은 휴무일(예: 토요일과 일요일)입니다. 일 단위의 최소 스케일을 사용 중입니다. When the **skip_off_time** config is set to *true*, the days off
are hidden and the week scale is rendered from Monday to Friday. 그러나 주 단위 스케일만 있을 경우, 주는 월요일에 시작해 일요일에 끝나며, **skip_off_time** 설정과 무관합니다, 주 안에 휴일이 있기 때문입니다.

비근무 시간이 숨겨진 차트를 렌더링하는 두 가지 방법:

- 더 작은 단위의 스케일을 추가하는 방법(일 스케일에 대해 시간 단위 스케일, 주 스케일에 대해 일 단위 스케일 등)
- [custom scale](guides/configuring-time-scale.md#customtimeunits)를 추가하여 근무 시간/일만 렌더링

:::note

**Related example:** [5일 근무 주간 스케일 예제](https://snippet.dhtmlx.com/eq70o558)

:::

### Related API
- [correct_work_time](api/config/correct_work_time.md)
- [work_time](api/config/work_time.md)

### Related Guides
- [Work Time Calculation](guides/working-time.md)
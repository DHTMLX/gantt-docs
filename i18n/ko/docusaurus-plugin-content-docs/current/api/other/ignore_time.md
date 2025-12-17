---
sidebar_label: ignore_time
title: ignore_time config
description: "타임 스케일에서 특정 시간 단위를 숨깁니다"
---

# ignore_time

### Description

@short: 타임 스케일에서 특정 시간 단위를 숨깁니다

@signature: ignore_time: GanttCallback

### Example

~~~jsx
// 0은 일요일, 6은 토요일을 의미합니다
gantt.ignore_time = function(date){
   if(date.getDay() == 0 || date.getDay() == 6)
      return true;
};
~~~

### Details

**ignore_time** 메서드는 셀의 날짜를 파라미터로 받아 작동합니다. 특정 시간 단위를 숨기고 싶다면 해당 날짜에 대해 *true*를 반환하면 됩니다.

### Related Guides
- [스케일에서 시간 단위 숨기기](guides/custom-scale.md)

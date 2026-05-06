---
sidebar_label: ignore_time
title: ignore_time 설정
description: "시간 축에서 시간 단위를 숨깁니다"
---

# ignore_time

### Description

@short: 시간 축에서 시간 단위를 숨깁니다

@signature: ignore_time: GanttCallback

### Example

~~~jsx
// 0은 일요일을, 6은 토요일을 나타냅니다
gantt.ignore_time = function(date){
   if(date.getDay() == 0 || date.getDay() == 6)
      return true;
};
~~~

### Details

**ignore_time** 메서드는 셀의 날짜를 매개변수로 받는 함수입니다. 단위를 숨기려면 해당 단위에 대해 *true*를 반환합니다.

### Related Guides
- [Hiding Time Units in the Scale](guides/custom-scale.md)
---
sidebar_label: duration_step
title: duration_step 설정
description: "'gantt.config.duration_unit' 단위가 하나의 'duration' 데이터 속성에 대응하는 단위 수를 설정합니다."
---

# duration_step

### Description

@short: 'duration' 데이터 속성의 한 단위에 대응하는 'gantt.config.duration_unit' 단위의 수를 설정합니다.

@signature: duration_step: number

### Example

~~~jsx
gantt.config.duration_unit = "hour";
gantt.config.duration_step = 3; 
//so if task.duration = 2, the task will long 6 hours (3*2)
~~~

**기본값:**1

### Details

duration_unit을 "hour" 또는 "minute"로 지정하면 [duration_step](api/config/duration_step.md)을 1로 설정하는 것이 좋습니다.
이러한 조합은 작업 시간 계산을 위한 특정 최적화를 활성화하며, 이는 step이 1로 설정될 때만 작동합니다. 또한 'optimized'와 'non-optimized' 모드 간에는 상당한 성능 차이가 있습니다.

### Related API
- [duration_unit](api/config/duration_unit.md)
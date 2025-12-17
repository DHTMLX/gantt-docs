---
sidebar_label: duration_step
title: duration_step config
description: "'gantt.config.duration_unit'의 단위 몇 개가 'duration' 데이터 속성의 한 단위를 구성하는지 정의합니다."
---

# duration_step

### Description

@short: 'gantt.config.duration_unit'의 단위 몇 개가 'duration' 데이터 속성의 한 단위를 구성하는지 정의합니다.

@signature: duration_step: number

### Example

~~~jsx
gantt.config.duration_unit = "hour";
gantt.config.duration_step = 3; 
// 따라서 task.duration = 2라면, 작업은 6시간(3*2) 동안 지속됩니다.
~~~

**Default value:** 1

### Details

duration_unit을 "hour" 또는 "minute"으로 설정할 때는 [duration_step](api/config/duration_step.md)을 1로 유지하는 것이 좋습니다. 이 설정은 작업 시간 계산에 대한 일부 최적화를 가능하게 하며, 이 최적화는 step이 1로 설정되어 있을 때만 제대로 작동합니다. "최적화된" 모드와 "비최적화" 모드 간에는 성능 차이가 크게 나타난다는 점을 유의하세요.

### Related API
- [duration_unit](api/config/duration_unit.md)


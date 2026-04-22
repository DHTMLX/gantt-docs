---
sidebar_label: min_duration
title: min_duration 설정
description: "리사이징 중 태스크에 대해 설정될 수 있는 최소 지속 시간을 밀리초 단위로 설정합니다."
---

# min_duration

### Description

@short: 태스크를 리사이징하는 동안 설정될 수 있는 최소 지속 시간(밀리초 단위)을 설정합니다.

@signature: min_duration: number

### Example

~~~jsx
gantt.config.min_duration = 24*60*60*1000; // (1 day)
~~~

### Details

- 설정 값은 태스크의 시작일과 종료일 사이의 시간 간격(task.start_date - task.end_date)을 지정하며, 이 값은 [working time settings](guides/working-time.md) 또는 [duration calculations](api/method/calculateduration.md)의 영향을 받지 않습니다.

### Related Guides
- [Dragging Tasks within the Timeline](guides/dnd.md)

**기본 값:** 60*60*1000, 또는 3600000 ms, 1시간
---
sidebar_label: min_duration
title: min_duration config
description: "작업 크기 조정 시 허용되는 최소 기간(밀리초 단위)을 정의합니다."
---

# min_duration

### Description

@short: 작업 크기 조정 시 허용되는 최소 기간(밀리초 단위)을 정의합니다.

@signature: min_duration: number

### Example

~~~jsx
gantt.config.min_duration = 24*60*60*1000; // (1일)
~~~

**Default value:** 60*60*1000, 즉 3600000 ms로 1시간에 해당합니다.

### Details

- 이 설정은 작업의 시작일과 종료일 사이의 최소 시간 간격 <b>(task.start_date - task.end_date)</b>을 지정합니다. 이는 [working time 설정](guides/working-time.md) 및 [duration 계산](api/method/calculateduration.md)과는 독립적으로 작동합니다.

### Related Guides
- [타임라인 내에서 작업 드래그하기](guides/dnd.md)


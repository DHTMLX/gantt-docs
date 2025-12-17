---
sidebar_label: deadlines
title: deadlines config
description: "작업의 deadline 요소 표시를 켜거나 끕니다"
---

# deadlines

### Description

@short: 작업의 deadline 요소 표시를 켜거나 끕니다

@signature: deadlines: boolean

### Example

~~~jsx
gantt.config.deadlines = true;
gantt.init("gantt_here");
~~~

**Default value:** true

### Related samples
- [Displaying deadlines](https://docs.dhtmlx.com/gantt/samples/04_customization/14_deadline.html)

### Details

이 설정은 작업에 대한 deadline 요소가 표시될지 여부를 제어합니다. 활성화되면 Gantt는 `task.deadline` 속성을 확인하며, 유효한 날짜가 있으면 타임라인에 deadline이 표시됩니다.

### Related Guides
- [타임라인의 추가 요소](guides/inbuilt-baselines.md)

### Change log
- v9.0에 추가됨

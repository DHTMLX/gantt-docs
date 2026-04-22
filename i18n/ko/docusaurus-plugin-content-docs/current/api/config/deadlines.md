---
sidebar_label: deadlines
title: deadlines config
description: "작업의 deadline 요소 표시를 켜거나 끕니다"
---

# deadlines

### Description

@short: 작업의 마감일 요소 표시를 활성화하거나 비활성화합니다

@signature: deadlines: boolean

### Example

~~~jsx
gantt.config.deadlines = true;
gantt.init("gantt_here");
~~~

**기본값:** true

### Related samples
- [Displaying deadlines](https://docs.dhtmlx.com/gantt/samples/04_customization/14_deadline.html)

### Details

이 구성은 작업의 마감일 요소 표시를 활성화하거나 비활성화합니다. 활성화되면 Gantt가 `task.deadline` 속성을 확인하고, 유효한 날짜가 포함되어 있으면 타임라인에 마감일 요소가 표시됩니다.

### Related Guides
- [Extra Elements in Timeline](guides/inbuilt-baselines.md)

### Change log
- 버전 9.0에서 추가됨
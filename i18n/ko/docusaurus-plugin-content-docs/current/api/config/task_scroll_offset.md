---
sidebar_label: task_scroll_offset
title: task_scroll_offset config
description: "타임라인에서 왼쪽 경계로부터 가장 가까운 작업의 오프셋(픽셀 단위)을 설정합니다"
---

# task_scroll_offset

### Description

@short: 타임라인에서 왼쪽 경계로부터 가장 가까운 작업의 오프셋(픽셀 단위)을 설정합니다

@signature: task_scroll_offset: number

### Example

~~~jsx
gantt.config.task_scroll_offset = 120;
gantt.init("gantt_here");
~~~

**기본값:** 100
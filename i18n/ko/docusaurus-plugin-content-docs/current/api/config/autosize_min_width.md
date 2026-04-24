---
sidebar_label: autosize_min_width
title: autosize_min_width 설정
description: "가로 방향의 'autosize' 모드에서 Gantt 차트가 차지할 수 있는 최소 너비(픽셀 단위)를 설정합니다"
---

# autosize_min_width

### Description

@short: 가로 방향의 'autosize' 모드에서 Gantt 차트가 차지할 수 있는 최소 너비(픽셀 단위)를 설정합니다

@signature: autosize_min_width: number

### Example

~~~jsx
gantt.config.autosize = "xy";
gantt.config.autosize_min_width = 800;

gantt.init("gantt_here");
~~~

**기본값:** 0(제로)

### Details

가로 방향의 'autosize' 모드는 [autosize](api/config/autosize.md) 옵션으로 활성화됩니다.

### Related API
- [autosize](api/config/autosize.md)
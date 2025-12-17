---
sidebar_label: autosize_min_width
title: autosize_min_width config
description: "가로 'autosize' 모드를 사용할 때 간트 차트가 가질 최소 너비(픽셀 단위)를 정의합니다."
---

# autosize_min_width

### Description

@short: 가로 'autosize' 모드를 사용할 때 간트 차트가 가질 최소 너비(픽셀 단위)를 정의합니다.

@signature: autosize_min_width: number

### Example

~~~jsx
gantt.config.autosize = "xy";
gantt.config.autosize_min_width = 800;

gantt.init("gantt_here");
~~~

**Default value:** 0

### Details

가로 'autosize' 모드는 [autosize](api/config/autosize.md) 옵션을 통해 활성화할 수 있습니다.

### Related API
- [autosize](api/config/autosize.md)


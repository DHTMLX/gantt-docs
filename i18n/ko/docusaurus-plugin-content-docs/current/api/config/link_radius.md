---
sidebar_label: link_radius
title: link_radius config
description: "타임라인에서 링크 선의 모서리를 둥글게 처리하는 반경을 제어합니다."
---

# link_radius

### Description

@short: 타임라인에서 링크 선의 모서리를 둥글게 처리하는 반경을 제어합니다.

@signature: link_radius: number

### Example

~~~jsx
gantt.config.link_radius = 6;
gantt.init("gantt_here");
~~~

**Default value:** 4

### Details

이 속성은 타임라인의 링크 선 모서리가 얼마나 둥글게 처리될지를 설정합니다. 값이 1 이하일 경우, 둥글게 처리하는 기능이 비활성화됩니다. 만약 링크 구간이 지정된 반경을 적용하기에 너무 짧으면, 해당 구간에는 둥글게 처리되지 않습니다.

### Related API
- [link_line_width](api/config/link_line_width.md)
- [link_arrow_size](api/config/link_arrow_size.md)

### Change log
- v9.0에 추가됨


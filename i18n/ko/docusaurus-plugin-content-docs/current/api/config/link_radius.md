---
sidebar_label: link_radius  
title: link_radius 구성  
description: "타임라인에서 링크 선의 모서리 반경을 설정합니다"  
---

# link_radius

### Description

@short: 타임라인에서 링크 선의 모서리 반경을 설정합니다

@signature: link_radius: number

### Example

~~~jsx
gantt.config.link_radius = 6;
gantt.init("gantt_here");
~~~

**기본값:** 4

### Details

프로퍼티는 타임라인에서 링크 선의 모서리를 둥글게 하는 반경을 정의합니다. 값이 1 이하인 경우 둥글림이 비활성화됩니다. 지정된 반경에 충분하지 않은 길이의 링크 세그먼트가 있을 경우 해당 세그먼트에 반올림이 적용되지 않습니다.

### Related API
- [link_line_width](api/config/link_line_width.md)
- [link_arrow_size](api/config/link_arrow_size.md)

### Change log
- v9.0에서 추가됨
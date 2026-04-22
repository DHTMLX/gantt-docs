---
sidebar_label: tooltip_offset_y
title: tooltip_offset_y 구성
description: "툴팁 위치의 위쪽 오프셋을 설정합니다(양수인 경우)."
---

# tooltip_offset_y

### Description

@short: 툴팁 위치의 위쪽 오프셋을 설정합니다(양수일 때)

@signature: tooltip_offset_y: number

### Example

~~~jsx
gantt.config.tooltip_offset_y = 40;

gantt.init("gantt_here");
~~~

**기본 값:** 20

### Details

:::note
이 옵션은 **tooltip** 확장에 정의되어 있으므로 [tooltip](guides/extensions-list.md#tooltip) 플러그인을 활성화해야 합니다. [Tooltips for Gantt Elements](guides/tooltips.md) 문서에서 자세한 내용을 읽어보세요.
:::

### Related API
- [tooltip_offset_x](api/config/tooltip_offset_x.md)

### Related Guides
- [Gantt 요소의 툴팁](guides/tooltips.md)


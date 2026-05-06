---
sidebar_label: tooltip_offset_x
title: tooltip_offset_x config
description: "툴팁 위치의 오른쪽 오프셋(양수일 경우)을 설정합니다"
---

# tooltip_offset_x

### Description

@short: 툴팁 위치의 오른쪽 오프셋(양수일 경우)을 설정합니다

@signature: tooltip_offset_x: number

### Example

~~~jsx
gantt.config.tooltip_offset_x = 30;

gantt.init("gantt_here");
~~~

**Default value:** 10

### Details

:::note
이 옵션은 **tooltip** 확장에 정의되어 있으므로 [tooltip](guides/extensions-list.md#tooltip) 플러그인을 활성화해야 합니다. 자세한 내용은 [Tooltips for Gantt Elements](guides/tooltips.md) 문서를 참고하십시오.
:::

### Related API
- [tooltip_offset_y](api/config/tooltip_offset_y.md)

### Related Guides
- [Gantt 요소의 툴팁](guides/tooltips.md)


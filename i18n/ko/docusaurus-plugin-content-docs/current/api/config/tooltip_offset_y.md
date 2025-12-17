---
sidebar_label: tooltip_offset_y
title: tooltip_offset_y config
description: "툴팁의 위치에 대한 수직 오프셋을 조정하며, 값이 양수일 경우 툴팁을 아래로 이동시킵니다."
---

# tooltip_offset_y

### Description

@short: 툴팁의 위치에 대한 수직 오프셋을 조정하며, 값이 양수일 경우 툴팁을 아래로 이동시킵니다.

@signature: tooltip_offset_y: number

### Example

~~~jsx
gantt.config.tooltip_offset_y = 40;

gantt.init("gantt_here");
~~~

**Default value:** 20

### Details

:::note
 이 옵션은 **tooltip** 확장의 일부이므로, [tooltip](guides/extensions-list.md#tooltip) 플러그인이 활성화되어 있는지 확인하세요. 자세한 내용은 [Gantt 요소의 툴팁](guides/tooltips.md) 문서를 참고하세요. 
:::

### Related API
- [tooltip_offset_x](api/config/tooltip_offset_x.md)

### Related Guides
- [Gantt 요소의 툴팁](guides/tooltips.md)


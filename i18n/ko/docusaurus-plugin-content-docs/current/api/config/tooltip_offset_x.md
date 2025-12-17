---
sidebar_label: tooltip_offset_x
title: tooltip_offset_x config
description: "툴팁의 위치를 오른쪽으로 수평 오프셋을 조정하며, 양수 값으로 설정 시 오른쪽으로 이동합니다."
---

# tooltip_offset_x

### Description

@short: 툴팁의 위치를 오른쪽으로 수평 오프셋을 조정하며, 양수 값으로 설정 시 오른쪽으로 이동합니다.

@signature: tooltip_offset_x: number

### Example

~~~jsx
gantt.config.tooltip_offset_x = 30;

gantt.init("gantt_here");
~~~

**Default value:** 10

### Details

:::note
 이 옵션은 **tooltip** 확장 기능의 일부이므로, [tooltip](guides/extensions-list.md#tooltip) 플러그인이 활성화되어 있는지 확인하세요. 자세한 내용은 [Gantt 요소의 툴팁](guides/tooltips.md) 문서를 참고하시기 바랍니다. 
:::

### Related API
- [tooltip_offset_y](api/config/tooltip_offset_y.md)

### Related Guides
- [Gantt 요소의 툴팁](guides/tooltips.md)


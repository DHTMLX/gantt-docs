---
sidebar_label: tooltip_hide_timeout
title: tooltip_hide_timeout config
description: "툴팁이 사라지기 전에 얼마나 오래(밀리초 단위) 표시될지 설정합니다."
---

# tooltip_hide_timeout

### Description

@short: 툴팁이 사라지기 전에 얼마나 오래(밀리초 단위) 표시될지 설정합니다.

@signature: tooltip_hide_timeout: number

### Example

~~~jsx
gantt.config.tooltip_hide_timeout = 5000;
gantt.init("gantt_here");
~~~

### Details

:::note
 이 옵션은 **tooltip** 확장의 일부이므로, [tooltip](guides/extensions-list.md#tooltip) 플러그인을 활성화해야 합니다. 자세한 내용은 [Gantt 요소의 툴팁](guides/tooltips.md) 문서를 참고하세요. 
:::

### Related API
- [tooltip_timeout](api/config/tooltip_timeout.md)

### Related Guides
- [Gantt 요소의 툴팁](guides/tooltips.md)


---
sidebar_label: tooltip_timeout
title: tooltip_timeout config
description: "작업에 대한 tooltip이 나타나기 전 지연 시간을 밀리초 단위로 지정합니다."
---

# tooltip_timeout

### Description

@short: 작업에 대한 tooltip이 나타나기 전 지연 시간을 밀리초 단위로 지정합니다.

@signature: tooltip_timeout: number

### Example

~~~jsx
gantt.config.tooltip_timeout = 50;
gantt.init("gantt_here");
~~~

**Default value:** 30

### Details

:::note
 이 설정은 **tooltip** 확장 기능에 속하므로, [tooltip](guides/extensions-list.md#tooltip) 플러그인이 활성화되어 있는지 확인하세요. 자세한 내용은 [Gantt 요소의 툴팁](guides/tooltips.md) 문서에서 확인할 수 있습니다. 
:::

### Related API
- [tooltip_hide_timeout](api/config/tooltip_hide_timeout.md)

### Related Guides
- [Gantt 요소의 툴팁](guides/tooltips.md)


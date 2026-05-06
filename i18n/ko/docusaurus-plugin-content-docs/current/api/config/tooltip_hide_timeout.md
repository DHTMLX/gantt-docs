---
sidebar_label: tooltip_hide_timeout
title: tooltip_hide_timeout 구성
description: "툴팁이 사라지기 전까지의 시간 길이를 밀리초 단위로 설정합니다"
---

# tooltip_hide_timeout

### Description

@short: 밀리초 단위로 tooltip이 사라지기까지의 시간 길이를 설정합니다

@signature: tooltip_hide_timeout: number

### Example

~~~jsx
gantt.config.tooltip_hide_timeout = 5000;
gantt.init("gantt_here");
~~~

### Details

:::note
이 옵션은 **tooltip** 확장 기능에 정의되어 있으므로 [tooltip](guides/extensions-list.md#tooltip) 플러그인을 활성화해야 합니다. [Tooltips for Gantt Elements](guides/tooltips.md) 문서에서 자세한 내용을 읽어보세요.
:::

### Related API
- [tooltip_timeout](api/config/tooltip_timeout.md)

### Related Guides
- [Gantt 요소의 툴팁](guides/tooltips.md)


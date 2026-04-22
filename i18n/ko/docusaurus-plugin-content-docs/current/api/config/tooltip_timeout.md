---
sidebar_label: tooltip_timeout
title: tooltip_timeout 설정
description: "작업에 대한 툴팁이 표시되기까지의 타임아웃을 밀리초 단위로 설정합니다"
---

# tooltip_timeout

### Description

@short: 작업에 대한 툴팁이 표시되기까지의 타임아웃을 밀리초 단위로 설정합니다

@signature: tooltip_timeout: number

### Example

~~~jsx
gantt.config.tooltip_timeout = 50;
gantt.init("gantt_here");
~~~

**Default value:** 30

### Details

:::note
이 옵션은 **tooltip** 확장에 정의되어 있으므로 [tooltip](guides/extensions-list.md#tooltip) 플러그인을 활성화해야 합니다. 자세한 내용은 [Gantt 요소용 툴팁](guides/tooltips.md) 문서를 참조하십시오.
:::

### Related API
- [tooltip_hide_timeout](api/config/tooltip_hide_timeout.md)

### Related Guides
- [Gantt 요소용 툴팁](guides/tooltips.md)
---
sidebar_label: touch
title: touch config
description: "Gantt 차트에서 터치 지원을 활성화 또는 비활성화하는 설정입니다."
---

# touch

### Description

@short: Gantt 차트의 터치 지원을 활성화/비활성화합니다.

@signature: touch: boolean | string

### Example

~~~jsx
gantt.config.touch = "force";
...
gantt.init("gantt_here");
~~~

**기본값:** true

### Details

문자열로 전달될 경우 매개변수의 유일한 값은 - **'force'** 입니다.

따라서 매개변수가 가질 수 있는 값은 총 3가지가 있습니다:

- *true* - dhtmlxGantt는 브라우저의 user-agent 문자열을 분석하여 터치 디바이스를 감지하려고 시도하며, 터치 디바이스가 감지되면 터치 지원을 활성화합니다.
- *'force'* - 어떤 종류의 디바이스가 사용되든 지속적인 터치 지원을 활성화합니다.
- *false* - 터치 지원을 비활성화합니다.

### Related API
- [touch_drag](api/config/touch_drag.md)
- [touch_feedback](api/config/touch_feedback.md)
- [touch_feedback_duration](api/config/touch_feedback_duration.md)
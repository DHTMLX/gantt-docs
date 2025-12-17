---
sidebar_label: touch
title: touch config
description: "Gantt 차트에서 터치 지원을 활성화 또는 비활성화하는 설정입니다."
---

# touch

### Description

@short: Gantt 차트에서 터치 지원을 활성화 또는 비활성화하는 설정입니다.

@signature: touch: boolean | string

### Example

~~~jsx
gantt.config.touch = "force";
...
gantt.init("gantt_here");
~~~

**Default value:** true

### Details

문자열로 설정할 경우, 허용되는 유일한 값은 **'force'**입니다.

<br>

이 파라미터에는 세 가지 옵션이 있습니다:

- *true* - dhtmlxGantt가 브라우저의 user-agent 문자열을 확인하여 터치 지원 기기인지 감지하고, 터치 기기일 경우 터치 지원을 활성화합니다.
- *'force'* - 사용 중인 기기와 상관없이 터치 지원을 강제로 활성화합니다.
- *false* - 터치 지원을 완전히 비활성화합니다.

### Related API
- [touch_drag](api/config/touch_drag.md)
- [touch_feedback](api/config/touch_feedback.md)
- [touch_feedback_duration](api/config/touch_feedback_duration.md)


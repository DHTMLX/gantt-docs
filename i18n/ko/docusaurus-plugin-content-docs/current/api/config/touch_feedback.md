---
sidebar_label: touch_feedback
title: touch_feedback config
description: "터치 디바이스에서 드래그 앤 드롭 동작 전후에 진동 피드백을 활성화합니다."
---

# touch_feedback

### Description

@short: 터치 디바이스에서 드래그 앤 드롭 동작 전후에 진동 피드백을 활성화합니다.

@signature: touch_feedback: boolean

### Example

~~~jsx
gantt.config.touch_feedback = false;
...
gantt.init("gantt_here");
~~~

**Default value:** true

### Details

다음 경우에는 이 설정이 작동하지 않음을 유의하세요:

1. [touch](api/config/touch.md) 옵션을 사용하여 터치 지원이 비활성화된 경우.
2. 브라우저가 [Vibration API](https://caniuse.com/vibration)를 지원하지 않는 경우.

### Related API
- [touch](api/config/touch.md)
- [touch_drag](api/config/touch_drag.md)
- [touch_feedback_duration](api/config/touch_feedback_duration.md)


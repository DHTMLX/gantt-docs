---
sidebar_label: touch_feedback
title: touch_feedback config
description: "터치 기기에서 드래그 앤 드롭 전후의 진동 피드백을 반환"
---

# touch_feedback

### Description

@short: 터치 기기에서 드래그 앤 드롭 전후의 진동 피드백 반환

@signature: touch_feedback: boolean

### Example

~~~jsx
gantt.config.touch_feedback = false;
...
gantt.init("gantt_here");
~~~

**기본값:** true

### Details

참고: 아래의 경우에는 이 설정이 적용되지 않습니다:

1. 구성 옵션 [touch](api/config/touch.md)로 터치 지원이 비활성화된 경우.
2. 브라우저가 [Vibration API](https://caniuse.com/vibration)를 지원하지 않는 경우.

### Related API
- [touch](api/config/touch.md)
- [touch_drag](api/config/touch_drag.md)
- [touch_feedback_duration](api/config/touch_feedback_duration.md)
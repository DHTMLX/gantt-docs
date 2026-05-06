---
sidebar_label: touch_feedback_duration
title: touch_feedback_duration 설정
description: "터치 디바이스에서 드래그 앤 드롭 전후의 진동 피드백 지속 시간을 밀리초 단위로 정의합니다"
---

# touch_feedback_duration

### Description

@short: 터치 디바이스에서 드래그 앤 드롭 전후의 진동 피드백 지속 시간을 밀리초 단위로 정의합니다

@signature: touch_feedback_duration: number

### Example

~~~jsx
gantt.config.touch_feedback_duration = 1;
...
gantt.init("gantt_here");
~~~

**기본값:** 1

### Details

버전 4.1에서 추가되었습니다

참고: 설정은 아래 조건에서 작동하지 않습니다:

1. 설정 옵션 [touch](api/config/touch.md)으로 터치 지원이 비활성화된 경우.
2. 브라우저가 [Vibration API](https://caniuse.com/vibration)를 지원하지 않는 경우.

### Related API
- [touch](api/config/touch.md)
- [touch_drag](api/config/touch_drag.md)
- [touch_feedback](api/config/touch_feedback.md)
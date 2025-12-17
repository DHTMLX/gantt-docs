---
sidebar_label: touch_feedback_duration
title: touch_feedback_duration config
description: "터치 디바이스에서 드래그 앤 드롭 동작 전후에 진동 피드백이 지속되는 시간을 지정합니다 (밀리초 단위)"
---

# touch_feedback_duration

### Description

@short: 터치 디바이스에서 드래그 앤 드롭 동작 전후에 진동 피드백이 지속되는 시간을 지정합니다 (밀리초 단위)

@signature: touch_feedback_duration: number

### Example

~~~jsx
gantt.config.touch_feedback_duration = 1;
...
gantt.init("gantt_here");
~~~

**Default value:** 1

### Details

버전 4.1에서 도입되었습니다.

다음 경우에는 이 설정이 작동하지 않으니 유의하세요:

1. [touch](api/config/touch.md) 설정 옵션을 통해 터치 지원이 비활성화된 경우
2. 브라우저가 [Vibration API](https://caniuse.com/vibration)를 지원하지 않는 경우

### Related API
- [touch](api/config/touch.md)
- [touch_drag](api/config/touch_drag.md)
- [touch_feedback](api/config/touch_feedback.md)


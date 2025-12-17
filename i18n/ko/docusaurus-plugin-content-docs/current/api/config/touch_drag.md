---
sidebar_label: touch_drag
title: touch_drag config
description: "롱 터치 제스처와 스크롤 제스처를 구분하기 위한 시간 간격을 밀리초 단위로 설정합니다."
---

# touch_drag

### Description

@short: 롱 터치 제스처와 스크롤 제스처를 구분하기 위한 시간 간격을 밀리초 단위로 설정합니다.

@signature: touch_drag: number | boolean

### Example

~~~jsx
gantt.config.touch_drag = 75;
...
gantt.init("gantt_here");
~~~

**Default value:** 500

### Details

이 파라미터가 *false*로 설정되면, 사용자는 작업을 드래그할 수 없습니다.

### Related API
- [touch](api/config/touch.md)
- [touch_feedback](api/config/touch_feedback.md)
- [touch_feedback_duration](api/config/touch_feedback_duration.md)


---
sidebar_label: wheel_scroll_sensitivity
title: wheel_scroll_sensitivity config
description: "마우스 휠 사용 시 간트 차트의 스크롤 속도를 제어합니다."
---

# wheel_scroll_sensitivity

### Description

@short: 마우스 휠 사용 시 간트 차트의 스크롤 속도를 제어합니다.

@signature: wheel_scroll_sensitivity: undefined | number | \{ x?: number; y?: number; \}

### Example

~~~jsx
// 두 배 속도로 스크롤
gantt.config.wheel_scroll_sensitivity = 2;

// 절반 속도로 스크롤 
gantt.config.wheel_scroll_sensitivity = 0.5;

// 또는 축별로 다른 속도로 스크롤
gantt.config.wheel_scroll_sensitivity = {
      x: 1,
      y: 0.5
};
~~~

**Default value:** undefined

### Details

이 설정 객체는 다음과 같은 속성을 포함합니다:

- **x** - (*number*) - 수평 스크롤 속도를 제어합니다.
- **y** - (*number*) - 수직 스크롤 속도를 제어합니다.

### Change log
- v7.0.11에서 추가됨

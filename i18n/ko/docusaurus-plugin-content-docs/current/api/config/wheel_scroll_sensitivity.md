---
sidebar_label: wheel_scroll_sensitivity
title: wheel_scroll_sensitivity 구성
description: "마우스 휠로 간트 차트를 스크롤하는 속도를 지정합니다"
---

# wheel_scroll_sensitivity

### Description

@short: 마우스 휠로 간트 차트를 스크롤하는 속도를 지정합니다

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

**기본값:** undefined

### Details

객체 구성에는 다음 속성이 있습니다:

- **x** - (*number*) - 수평 속도
- **y** - (*number*) - 수직 속도

### Change log
- v7.0.11 버전에 추가됨
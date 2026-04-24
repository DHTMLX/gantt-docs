---
sidebar_label: wai_aria_attributes
title: wai_aria_attributes 구성
description: "스크린 리더가 컴포넌트를 인식할 수 있도록 WAI-ARIA 지원을 활성화합니다"
---

# wai_aria_attributes

### Description

@short: WAI-ARIA 지원을 활성화하여 컴포넌트가 스크린 리더에 의해 올바르게 인식될 수 있도록 합니다.

@signature: wai_aria_attributes: boolean

### Example

~~~jsx
gantt.config.wai_aria_attributes = true;
...
gantt.init("gantt_here");
~~~

**기본 값:** true

### Details

버전 4.1에서 추가됨

### Related Guides
- [접근성](guides/accessibility.md#wai-aria-attributes)
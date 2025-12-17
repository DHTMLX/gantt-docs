---
sidebar_label: wai_aria_attributes
title: wai_aria_attributes config
description: "WAI-ARIA 지원을 활성화하여 컴포넌트가 스크린 리더에 의해 올바르게 인식될 수 있도록 합니다."
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

**Default value:** true

### Details

버전 4.1에서 도입되었습니다.

### Related Guides
- [접근성](guides/accessibility.md#waiariaattributes)

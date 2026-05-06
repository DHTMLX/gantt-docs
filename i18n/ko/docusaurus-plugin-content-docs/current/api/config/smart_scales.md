---
sidebar_label: smart_scales
title: smart_scales 구성
description: "화면에 보이는 타임스케일 부분만 렌더링되도록 지정합니다"
---

# smart_scales

### Description

@short: 화면에 보이는 타임스케일 부분만 렌더링됩니다

@signature: smart_scales: boolean

### Example

~~~jsx
gantt.config.smart_scales = true;
~~~

**Default value:** true

### Details

버전 4.1에 추가됨

이 설정을 사용하면 매우 긴 타임 스케일이 있는 차트의 렌더링 속도가 크게 빨라집니다.

### Related Guides
- [Performance: Ways to Improve](guides/performance.md#common-techniques)
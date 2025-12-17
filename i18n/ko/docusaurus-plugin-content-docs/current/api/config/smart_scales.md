---
sidebar_label: smart_scales
title: smart_scales config
description: "화면에 보이는 시간 눈금 부분만 그려지도록 지정합니다."
---

# smart_scales

### Description

@short: 화면에 보이는 시간 눈금 부분만 그려지도록 지정합니다.

@signature: smart_scales: boolean

### Example

~~~jsx
gantt.config.smart_scales = true;
~~~

**Default value:** true

### Details

버전 4.1에서 추가됨

이 설정을 활성화하면 특히 매우 긴 시간 눈금을 다룰 때 차트 렌더링 성능이 크게 향상될 수 있습니다.

### Related Guides
- [성능: 개선 방법](guides/performance.md#commontechniques)

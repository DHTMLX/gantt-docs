---
sidebar_label: hideCover
title: hideCover 메서드
description: "남은 화면과의 상호 작용을 차단하는 라이트박스 모달 오버레이를 숨깁니다"
---

# hideCover

### Description

@short: 남은 화면과의 상호 작용을 차단하는 라이트박스 모달 오버레이를 숨깁니다

@signature: hideCover: (box?: HTMLElement) => void

### Parameters

### Example

~~~jsx
gantt.hideCover(gantt.getLightbox());
~~~

### Details

입력 매개변수를 지정하면, 지정된 HTML 요소를 숨깁니다(디스플레이 속성을 "none"으로 설정하여).

### Related API
- [showCover](api/method/showcover.md)
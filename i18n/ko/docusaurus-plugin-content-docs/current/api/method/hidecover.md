---
sidebar_label: hideCover
title: hideCover method
description: "화면의 나머지 부분과의 상호작용을 방해하는 라이트박스 모달 오버레이를 제거합니다."
---

# hideCover

### Description

@short: 화면의 나머지 부분과의 상호작용을 방해하는 라이트박스 모달 오버레이를 제거합니다.

@signature: hideCover: (box?: HTMLElement) =\> void

### Parameters

- `box` - (optional) *HTMLElement* - 숨길 요소

### Example

~~~jsx
gantt.hideCover(gantt.getLightbox());
~~~

### Details

입력 파라미터를 제공하면, 이 메서드는 해당 HTML 요소의 display 속성을 "none"으로 변경하여 요소를 숨깁니다.

### Related API
- [showCover](api/method/showcover.md)


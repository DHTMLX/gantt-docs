---
sidebar_label: showCover
title: showCover method
description: "화면의 나머지 부분과의 상호작용을 차단하는 라이트박스 모달 오버레이를 표시합니다."
---

# showCover

### Description

@short: 화면의 나머지 부분과의 상호작용을 차단하는 라이트박스 모달 오버레이를 표시합니다.

@signature: showCover: (box?: HTMLElement) =\> void

### Parameters

- `box` - (optional) *HTMLElement* - 표시할 요소

### Example

~~~jsx
gantt.showCover();
~~~

### Details

입력 파라미터가 제공되면, 이 메서드는 전달된 HTML 요소의 display 속성을 "block"으로 설정하여 화면 중앙에 표시합니다.

### Related API
- [hideCover](api/method/hidecover.md)


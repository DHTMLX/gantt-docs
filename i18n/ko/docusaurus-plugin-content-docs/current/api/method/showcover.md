---
sidebar_label: showCover
title: showCover 메서드
description: "남은 화면에서의 상호 작용을 차단하는 라이트박스 모달 오버레이를 표시합니다"
---

# showCover

### Description

@short: 남은 화면에서의 상호 작용을 차단하는 라이트박스 모달 오버레이를 표시합니다

@signature: showCover: (box?: HTMLElement) =\> void

### Parameters
- `box` - (선택적) *HTMLElement* - 숨길 요소

### Example

~~~jsx
gantt.showCover();
~~~

### Details

입력 매개변수를 지정하면, 지정된 HTML 요소를 화면 중앙에 표시합니다(디스플레이 속성을 "block"으로 설정하여 표시합니다).

### Related API
- [hideCover](api/method/hidecover.md)
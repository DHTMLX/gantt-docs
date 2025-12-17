---
sidebar_label: onLightboxButton
title: onLightboxButton event
description: "라이트박스 내 사용자 정의 버튼을 클릭할 때 트리거됩니다."
---

# onLightboxButton

### Description

@short: 라이트박스 내 사용자 정의 버튼을 클릭할 때 트리거됩니다.

@signature: onLightboxButton: (css: string, node: HTMLElement, e: Event) =\> void;

### Parameters

- `css` - (required) *string* - 버튼에 할당된 CSS 클래스 이름
- `node` - (required) *HTMLElement* - 클릭된 버튼을 나타내는 HTML 요소
- `e` - (required) *Event* - 네이티브 'click' 이벤트 객체

### Example

~~~jsx
gantt.attachEvent("onLightboxButton", function (css, node, e){
    //여기에 사용자 정의 로직을 작성하세요
});
~~~

### Details

이 이벤트는 라이트박스 하단에 위치한 사용자 정의 버튼에서만 트리거되며, 기본 버튼에는 적용되지 않습니다.

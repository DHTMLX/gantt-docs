---
sidebar_label: onLightboxButton
title: onLightboxButton event
description: "라이트박스 내 사용자 정의 버튼을 클릭할 때 트리거됩니다."
---

# onLightboxButton

### Description

@short: 사용자가 라이트박스의 커스텀 버튼을 클릭할 때 발생

@signature: onLightboxButton: (css: string, node: HTMLElement, e: Event) =\> void;

### Parameters

- `css` - (required) *string* - 버튼에 적용된 CSS 클래스의 이름
- `node` - (required) *HTMLElement* - 클릭된 버튼의 HTML 요소
- `e` - (required) *Event* - 기본 'click' 이벤트 객체

### Example

~~~jsx
gantt.attachEvent("onLightboxButton", function (css, node, e){
    // 여기에 코드 작성
});
~~~

### Details

이벤트는 라이트박스 하단의 커스텀 버튼에 대해서만 발생하며 기본 버튼에서는 발생하지 않습니다.
---
sidebar_label: onLinkValidation
title: onLinkValidation 이벤트
description: "사용자가 새 링크를 추가하고 dhtmlxGantt가 링크의 유효성을 검사할 때 발생합니다"
---

# onLinkValidation

### Description

@short: 사용자가 새 링크를 추가하고 dhtmlxGantt가 링크의 유효성을 검사할 때 발생합니다

@signature: onLinkValidation: (link: Link) =\> boolean;

### Parameters

- `link` - (필수) *Link* - 링크 객체

### Returns
- ` result` - (boolean) - 이벤트의 기본 동작이 트리거될지(<b>true</b>) 또는 취소될지(<b>false</b>)를 정의합니다

### Example

~~~jsx
gantt.attachEvent("onLinkValidation", function(link){
    // 여기에 코드 작성
});
~~~

### Details

:::note
이벤트는 [isLinkAllowed](api/method/islinkallowed.md) 메서드에서 발생합니다.
:::

이벤트는 사용자가 마우스로 드래그 앤 드롭하여 두 작업 간에 새 링크를 만들 때 발생합니다.

이벤트 핸들러가 `false`를 반환하면 대상 작업의 원형 핸들러가 빨간색으로 표시되고 링크가 추가되지 않습니다. `true`를 반환하면 원형 핸들러가 주황색으로 강조되고 링크 생성을 허용합니다.

### Related API
- [isLinkAllowed](api/method/islinkallowed.md)
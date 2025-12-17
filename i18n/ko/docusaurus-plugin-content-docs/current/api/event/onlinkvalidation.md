---
sidebar_label: onLinkValidation
title: onLinkValidation event
description: "사용자가 새 링크를 추가할 때 발생하며 dhtmlxGantt가 해당 링크가 유효한지 검증합니다."
---

# onLinkValidation

### Description

@short: 사용자가 새 링크를 추가할 때 발생하며 dhtmlxGantt가 해당 링크가 유효한지 검증합니다.

@signature: onLinkValidation: (link: Link) =\> boolean;

### Parameters

- `link` - (required) *Link* - 링크 객체

### Returns
- ` result` - (boolean) - 이벤트의 기본 동작이 진행될지(<b>true</b>) 또는 취소될지(<b>false</b>)를 나타냅니다.

### Example

~~~jsx
gantt.attachEvent("onLinkValidation", function(link){
    //여기에 사용자 정의 로직 작성
});
~~~

### Details

:::note
 이 이벤트는 [isLinkAllowed](api/method/islinkallowed.md) 메서드 내에서 트리거됩니다. 
:::

이 이벤트는 사용자가 마우스 드래그 앤 드롭으로 작업 간에 새 링크를 생성할 때 발생합니다.

이벤트 핸들러가 `false`를 반환하면 대상 작업의 원형 핸들이 빨간색으로 변하며 링크가 생성되지 않습니다. `true`를 반환하면 원형 핸들이 주황색으로 강조 표시되고 링크 생성이 허용됩니다.

### Related API
- [isLinkAllowed](api/method/islinkallowed.md)


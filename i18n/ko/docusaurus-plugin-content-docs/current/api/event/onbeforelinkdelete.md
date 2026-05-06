---
sidebar_label: onBeforeLinkDelete
title: onBeforeLinkDelete event
description: "사용자가 링크를 삭제하기 전에 발생합니다"
---

# onBeforeLinkDelete

### Description

@short: 사용자가 링크를 삭제하기 전에 발생합니다

@signature: onBeforeLinkDelete: (id: string | number, link: Link) =\> boolean;

### Parameters

- `id` - (required) *string | number* - 링크 ID
- `link` - (required) *Link* - 링크 객체

### Returns
- ` result` - (boolean) - 이벤트의 기본 동작이 트리거될지 여부를 정의합니다 (<b>true</b>) 또는 취소될지 (<b>false</b>)

### Example

~~~jsx
gantt.attachEvent("onBeforeLinkDelete", function(id,link){
    // 여기에 코드 작성
    return true;
});
~~~

### Details

이벤트는 차단 가능합니다. 링크 삭제를 취소하려면 false를 반환합니다.

### Related API
- [deleteLink](api/method/deletelink.md)
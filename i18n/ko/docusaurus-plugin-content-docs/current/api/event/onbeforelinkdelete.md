---
sidebar_label: onBeforeLinkDelete
title: onBeforeLinkDelete event
description: "사용자가 링크를 삭제하기 직전에 트리거됩니다."
---

# onBeforeLinkDelete

### Description

@short: 사용자가 링크를 삭제하기 직전에 트리거됩니다.

@signature: onBeforeLinkDelete: (id: string | number, link: Link) =\> boolean;

### Parameters

- `id` - (required) *string | number* - 링크의 식별자
- `link` - (required) *Link* - 링크 객체 자체

### Returns
- ` result` - (boolean) - 기본 이벤트 동작이 진행될지(<b>true</b>) 취소될지(<b>false</b>) 결정합니다.

### Example

~~~jsx
gantt.attachEvent("onBeforeLinkDelete", function(id,link){
    //여기에 커스텀 로직을 추가할 수 있습니다.
    return true;
});
~~~

### Details

이 이벤트는 차단할 수 있습니다. false를 반환하면 링크 삭제가 중단됩니다.

### Related API
- [deleteLink](api/method/deletelink.md)


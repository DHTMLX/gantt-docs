---
sidebar_label: onBeforeLinkUpdate
title: onBeforeLinkUpdate event
description: "링크가 업데이트되기 전에 발생합니다"
---

# onBeforeLinkUpdate

### Description

@short: 링의가 업데이트되기 전에 발생합니다

@signature: onBeforeLinkUpdate: (id: string | number, new_link: Link) => boolean;

### Parameters

- `id` - (required) *string | number* - 링크 ID
- `new_link` - (required) *Link* - 링크의 새(업데이트된) 객체

### Returns
- ` result` - (boolean) - 이벤트의 기본 동작이 트리거될지 여부를 정의합니다 (<b>true</b>) 또는 취소될지 (<b>false</b>)

### Example

~~~jsx
gantt.attachEvent("onBeforeLinkUpdate", function(id,new_link){
    // 여기에 코드 작성
    return true;
});
~~~

### Details

이벤트는 차단 가능합니다. 링크 업데이트를 취소하려면 false를 반환하십시오.

### Related API
- [updateLink](api/method/updatelink.md)
- [onAfterLinkUpdate](api/event/onafterlinkupdate.md)
---
sidebar_label: onBeforeLinkUpdate
title: onBeforeLinkUpdate event
description: "링크가 업데이트되기 직전에 트리거됩니다."
---

# onBeforeLinkUpdate

### Description

@short: 링크가 업데이트되기 직전에 트리거됩니다.

@signature: onBeforeLinkUpdate: (id: string | number, new_link: Link) =\> boolean;

### Parameters

- `id` - (required) *string | number* - 링크의 ID
- `new_link` - (required) *Link* - 업데이트될 링크 객체

### Returns
- ` result` - (boolean) - 이벤트의 기본 동작이 계속 진행될지(<b>true</b>) 중단될지(<b>false</b>)를 나타냅니다.

### Example

~~~jsx
gantt.attachEvent("onBeforeLinkUpdate", function(id,new_link){
    //여기에 커스텀 로직을 추가할 수 있습니다
    return true;
});
~~~

### Details

이 이벤트는 차단할 수 있습니다. false를 반환하면 링크 업데이트가 방지됩니다.

### Related API
- [updateLink](api/method/updatelink.md)
- [onAfterLinkUpdate](api/event/onafterlinkupdate.md)


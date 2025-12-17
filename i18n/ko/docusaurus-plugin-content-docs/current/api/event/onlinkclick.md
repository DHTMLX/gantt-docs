---
sidebar_label: onLinkClick
title: onLinkClick event
description: "사용자가 링크를 클릭할 때 트리거됩니다."
---

# onLinkClick

### Description

@short: 사용자가 링크를 클릭할 때 트리거됩니다.

@signature: onLinkClick: (id: string | number, e?: Event) =\> void;

### Parameters

- `id` - (required) *string | number* - 클릭된 링크의 식별자
- `e` - (optional) *Event* - 선택 사항, 네이티브 이벤트 객체

### Example

~~~jsx
gantt.attachEvent("onLinkClick", function(id,e){
    //여기에 커스텀 로직을 추가할 수 있습니다
});
~~~

### Related API
- [onLinkDblClick](api/event/onlinkdblclick.md)


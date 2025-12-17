---
sidebar_label: onLinkIdChange
title: onLinkIdChange event
description: "링크의 id가 업데이트될 때 트리거됩니다."
---

# onLinkIdChange

### Description

@short: 링크의 id가 업데이트될 때 트리거됩니다.

@signature: onLinkIdChange: (id: string | number, new_id: string | number) =\> void;

### Parameters

- `id` - (required) *string | number* - 기존 링크 id
- `new_id` - (required) *string | number* - 업데이트된 링크 id

### Example

~~~jsx
gantt.attachEvent("onLinkIdChange", function(id,new_id){
    //여기에 커스텀 로직 작성
});
~~~

### Related API
- [changeLinkId](api/method/changelinkid.md)


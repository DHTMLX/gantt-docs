---
sidebar_label: onAfterLinkDelete
title: onAfterLinkDelete event
description: "사용자가 링크를 삭제한 직후에 트리거됩니다."
---

# onAfterLinkDelete

### Description

@short: 사용자가 링크를 삭제한 직후에 트리거됩니다.

@signature: onAfterLinkDelete: (id: string | number, link: Link) =\> void;

### Parameters

- `id` - (required) *string | number* - 삭제된 링크의 ID
- `link` - (required) *Link* - 링크 객체 자체

### Example

~~~jsx
gantt.attachEvent("onAfterLinkDelete", function(id,link){
    //여기에 사용자 정의 로직을 작성할 수 있습니다.
});
~~~

### Related API
- [deleteLink](api/method/deletelink.md)


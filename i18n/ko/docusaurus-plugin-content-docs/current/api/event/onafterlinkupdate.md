---
sidebar_label: onAfterLinkUpdate
title: onAfterLinkUpdate event
description: "사용자가 링크를 수정한 직후에 트리거됩니다."
---

# onAfterLinkUpdate

### Description

@short: 사용자가 링크를 수정한 직후에 트리거됩니다.

@signature: onAfterLinkUpdate: (id: string | number, link: Link) =\> void;

### Parameters

- `id` - (required) *string | number* - 링크의 고유 식별자
- `link` - (required) *Link* - 업데이트된 링크 객체

### Example

~~~jsx
gantt.attachEvent("onAfterLinkUpdate", function(id,link){
    //여기에 커스텀 로직을 작성할 수 있습니다.
});
~~~

### Related API
- [updateLink](api/method/updatelink.md)


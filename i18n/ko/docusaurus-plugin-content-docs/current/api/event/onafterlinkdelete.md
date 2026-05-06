---
sidebar_label: onAfterLinkDelete
title: onAfterLinkDelete 이벤트
description: "사용자가 링크를 삭제한 후에 발생합니다"
---

# onAfterLinkDelete

### Description

@short: 사용자가 링크를 삭제한 후에 발생합니다

@signature: onAfterLinkDelete: (id: string | number, link: Link) =\> void;

### Parameters

- `id` - (required) *string | number* - 링크 ID
- `link` - (required) *Link* - 링크 객체

### Example

~~~jsx
gantt.attachEvent("onAfterLinkDelete", function(id,link){
    // 여기에 코드 작성
});
~~~

### Related API
- [deleteLink](api/method/deletelink.md)
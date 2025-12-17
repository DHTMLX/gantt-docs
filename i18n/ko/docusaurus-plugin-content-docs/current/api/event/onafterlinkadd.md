---
sidebar_label: onAfterLinkAdd
title: onAfterLinkAdd event
description: "간트 차트에 새 링크가 추가된 직후에 트리거됩니다."
---

# onAfterLinkAdd

### Description

@short: 간트 차트에 새 링크가 추가된 직후에 트리거됩니다.

@signature: onAfterLinkAdd: (id: string | number, link: Link) =\> void;

### Parameters

- `id` - (required) *string | number* - 링크의 ID
- `link` - (required) *Link* - 링크 객체 자체

### Example

~~~jsx
gantt.attachEvent("onAfterLinkAdd", function(id,link){
    //여기에 커스텀 로직을 작성하세요
});
~~~

### Related API
- [addLink](api/method/addlink.md)


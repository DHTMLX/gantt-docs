---
sidebar_label: addLink
title: addLink method
description: "새로운 의존성 링크를 추가합니다"
---

# addLink

### Description

@short: 새로운 의존성 링크를 추가합니다

@signature: addLink: (link: any) =\> string | number

### Parameters

- `link` - (required) *object* - 링크 객체

### Returns
- ` id` - (string | number) - 링크의 ID

### Example

~~~jsx
var linkId = gantt.addLink({
    id:1,
    source:1,
    target:2,
    type:gantt.config.links.finish_to_start
});
~~~

### Details

이 메서드는 [onBeforeLinkAdd](api/event/onbeforelinkadd.md) 및 [onAfterLinkAdd](api/event/onafterlinkadd.md) 이벤트를 트리거합니다.

### Related API
- [updateLink](api/method/updatelink.md)
- [deleteLink](api/method/deletelink.md)
- [addTask](api/method/addtask.md)

### Related Guides
- [링크 추가/수정/삭제](guides/crud-dependency.md)


---
sidebar_label: deleteLink
title: deleteLink method
description: "지정된 종속 링크를 제거합니다."
---

# deleteLink

### Description

@short: 지정된 종속 링크를 제거합니다.

@signature: deleteLink: (id: string | number) =\> void

### Parameters

- `id` - (required) *string | number* -    종속 링크의 ID

### Example

~~~jsx
gantt.addLink({
    id:1,
    source:1,
    target:2,
    type:1
});

gantt.deleteLink(1); /*!*/
~~~

### Details

이 메서드는 [onBeforeLinkDelete](api/event/onbeforelinkdelete.md) 및 [onAfterLinkDelete](api/event/onafterlinkdelete.md) 이벤트를 트리거합니다.

### Related API
- [addLink](api/method/addlink.md)
- [deleteTask](api/method/deletetask.md)
- [onAfterLinkDelete](api/event/onafterlinkdelete.md)

### Related Guides
- [링크 추가/수정/삭제](guides/crud-dependency.md)


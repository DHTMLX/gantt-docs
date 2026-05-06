---
sidebar_label: deleteLink
title: deleteLink 메서드
description: "지정된 의존성 링크를 삭제합니다"
---

# deleteLink

### Description

@short: 지정된 의존성 링크를 삭제합니다

@signature: deleteLink: (id: string | number) =\> void

### Parameters

- `id` - (필수) *string | number* -    의존성 링크의 ID

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

이 메서드는 [onBeforeLinkDelete](api/event/onbeforelinkdelete.md) 및 [onAfterLinkDelete](api/event/onafterlinkdelete.md) 이벤트를 호출합니다.

### Related API
- [addLink](api/method/addlink.md)
- [deleteTask](api/method/deletetask.md)
- [onAfterLinkDelete](api/event/onafterlinkdelete.md)

### Related Guides
- [Adding/Updating/Deleting Links](guides/crud-dependency.md)
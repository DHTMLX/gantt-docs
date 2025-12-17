---
sidebar_label: changeLinkId
title: changeLinkId method
description: "링크의 id를 업데이트합니다"
---

# changeLinkId

### Description

@short: 링크의 id를 업데이트합니다

@signature: changeLinkId: (id: string | number, new_id: string | number) =\> void

### Parameters

- `id` - (required) *string | number* -    현재 링크의 id
- `new_id` - (required) *string | number* -    새로운 링크의 id

### Example

~~~jsx
gantt.addLink({
    id:1,
    source:1,
    target:2,
    type:1
});

gantt.changeLinkId(1, 5); //링크의 id를 '1'에서 '5'로 업데이트합니다 /*!*/
~~~

### Details

이 메서드는 [onLinkIdChange](api/event/onlinkidchange.md) 이벤트를 트리거합니다.

### Related API
- [onLinkIdChange](api/event/onlinkidchange.md)
- [changeTaskId](api/method/changetaskid.md)


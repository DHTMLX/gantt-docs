---
sidebar_label: changeLinkId
title: changeLinkId method
description: "更新链接的id"
---

# changeLinkId

### Description

@short: 更新链接的id

@signature: changeLinkId: (id: string | number, new_id: string | number) =\> void

### Parameters

- `id` - (required) *string | number* -    当前链接的id
- `new_id` - (required) *string | number* -     新的链接id

### Example

~~~jsx
gantt.addLink({
    id:1,
    source:1,
    target:2,
    type:1
});

gantt.changeLinkId(1, 5); //将链接的id从 '1' 更新为 '5' /*!*/
~~~

### Details

此方法会触发 [onLinkIdChange](api/event/onlinkidchange.md) 事件。

### Related API
- [onLinkIdChange](api/event/onlinkidchange.md)
- [changeTaskId](api/method/changetaskid.md)


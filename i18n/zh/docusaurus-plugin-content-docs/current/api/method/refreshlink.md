---
sidebar_label: refreshLink
title: refreshLink method
description: "更新指定的 link"
---

# refreshLink

### Description

@short: 更新指定的 link

@signature: refreshLink: (id: string | number) =\> void

### Parameters

- `id` - (required) *string | number* -    link 的 id

### Example

~~~jsx
gantt.addLink({
    id:1,
    source:1,
    target:2,
    type:1
});

var task = gantt.getLink(1);

task.type = 2; /*!*/
gantt.refreshLink(1);       /*!*/
~~~

### Details

此方法用于在修改 link 属性后重新绘制该 link。与 [updateLink](api/method/updatelink.md) 不同，它不会激活 [DataProcessor](guides/server-side.md)，因此不会将更改发送到服务器。

### Related API
- [refreshTask](api/method/refreshtask.md)
- [refreshData](api/method/refreshdata.md)
- [updateTask](api/method/updatetask.md)
- [updateLink](api/method/updatelink.md)


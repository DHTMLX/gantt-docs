---
sidebar_label: refreshLink
title: refreshLink 方法
description: "刷新指定的链接"
---

# refreshLink

### Description

@short: 刷新指定的链接

@signature: refreshLink: (id: string | number) =\> void

### Parameters

- `id` - (必填) *string | number* -     链接 ID

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

您可以在修改链接属性后使用此方法重新绘制链接。与 [updateLink](api/method/updatelink.md) 不同，此方法不会触发 [DataProcessor](guides/server-side.md)，也不会向服务器发送更新。

### Related API
- [refreshTask](api/method/refreshtask.md)
- [refreshData](api/method/refreshdata.md)
- [updateTask](api/method/updatetask.md)
- [updateLink](api/method/updatelink.md)
---
sidebar_label: updateLink
title: updateLink method
description: "更新指定的依赖链接"
---

# updateLink

### Description

@short: 更新指定的依赖链接

@signature: updateLink: (id: string | number) =\> void

### Parameters

- `id` - (required) *string | number* -    任务的 id

### Example

~~~jsx
gantt.addLink({
    id:5, 
    source:1, 
    target:2, 
    type:1
});

gantt.getLink(5).type = 2; // 修改链接的数据
gantt.updateLink(5); // 视觉和功能上应用更新后的链接
~~~

### Details

:::note
 此方法会触发 [onAfterLinkUpdate](api/event/onafterlinkupdate.md) 事件。 
:::

:::note
 如果启用了 dataProcessor，该方法会激活 [DataProcessor](guides/server-side.md)。 
:::

在对链接对象进行任何修改后，应使用此方法来刷新甘特图的内部状态，更新相关的 UI 组件，并将更改发送到后台。

调用此函数会触发 [onAfterLinkUpdate](api/event/onafterlinkupdate.md) 事件，可能导致进一步的重新计算。

当使用 [DataProcessor](guides/server-side.md) 时，此方法会向服务器发起 **update** 请求。

如果只是需要视觉上的更新且不需要保存，建议使用 [refreshLink](api/method/refreshlink.md) 方法。该方法仅会重新绘制甘特图中的链接，不会触发额外的计算或服务器通信。

~~~js
let selectedLink = null;
gantt.templates.link_class = function(link){
    if(link.id == selectedLink) {
        return "selected_link";
    }
};

gantt.attachEvent("onLinkClick", function(id,e){
    selectedLink = id;
    gantt.refreshLink(id); /*!*/
});
~~~

### Related API
- [updateTask](api/method/updatetask.md)
- [refreshLink](api/method/refreshlink.md)
- [refreshTask](api/method/refreshtask.md)
- [onAfterLinkUpdate](api/event/onafterlinkupdate.md)

### Related Guides
- [服务器端集成](guides/server-side.md#updatingdataontheserver)


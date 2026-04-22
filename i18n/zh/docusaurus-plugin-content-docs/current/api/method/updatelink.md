---
sidebar_label: updateLink
title: updateLink method
description: "更新指定的依赖关系链接"
---

# updateLink

### Description

@short: 更新指定的依赖关系链接

@signature: updateLink: (id: string | number) =\> void

### Parameters

- `id` - (required) *string | number* -    任务 ID

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
该方法将触发 [onAfterLinkUpdate](api/event/onafterlinkupdate.md) 事件。 
:::  

:::note
如果启用 dataProcessor，该方法会触发 [DataProcessor](guides/server-side.md)。
:::

应在修改链接对象以更新 Gantt 的状态、重新绘制相关 UI 元素并将变更发送到后端后调用此方法。

调用此方法将触发 [onAfterLinkUpdate](api/event/onafterlinkupdate.md) 事件，可能会导致额外的重新计算。

如果你正在使用 [DataProcessor](guides/server-side.md)，调用此方法将向服务器发送一个 **update** 请求。

若要进行不需要保存的可视化修改，请改用 [refreshLink](api/method/refreshlink.md) 方法。这样将重新绘制 Gantt 中的记录，而不进行额外的计算或服务器请求。

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
- [服务器端集成](guides/server-side.md)
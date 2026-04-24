---
sidebar_label: onBeforeLinkAdd
title: onBeforeLinkAdd event
description: "在向 Gantt 图添加新连线之前触发"
---

# onBeforeLinkAdd

### Description

@short: 在 Gantt 图中添加新连线之前触发

@signature: onBeforeLinkAdd: (id: string | number, link: Link) =\> boolean;

### Parameters

- `id` - (required) *string | number* - 该连线的 ID
- `link` - (required) *Link* - 连线对象

### Returns
- ` result` - (boolean) - 定义事件的默认行为是否将被触发 (<b>true</b>) 还是取消 (<b>false</b>)

### Example

~~~jsx
gantt.attachEvent("onBeforeLinkAdd", function(id,link){
    // 在这里插入您的自定义逻辑 
    return true;
});
~~~

### Details

该事件是可阻止的。返回 *false* 以取消添加该连线。

~~~js
// 防止创建“finish_to_start”类型链接时，源任务与目标任务时间重叠
gantt.attachEvent("onBeforeLinkAdd", function(id, link){
    if (link.type == 0){
        var sourceTask = gantt.getTask(link.source);
        var targetTask = gantt.getTask(link.target);
        if (sourceTask.end_date >= targetTask.start_date){
            alert("This link is illegal")
            return false;
        }
    }
});
~~~

### Related API
- [addLink](api/method/addlink.md)
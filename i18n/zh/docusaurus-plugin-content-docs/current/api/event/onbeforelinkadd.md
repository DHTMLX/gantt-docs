---
sidebar_label: onBeforeLinkAdd
title: onBeforeLinkAdd event
description: "在甘特图中新链接添加之前触发"
---

# onBeforeLinkAdd

### Description

@short: 在甘特图中新链接添加之前触发

@signature: onBeforeLinkAdd: (id: string | number, link: Link) =\> boolean;

### Parameters

- `id` - (required) *string | number* - 链接的ID
- `link` - (required) *Link* - 链接对象

### Returns
- ` result` - (boolean) - 决定事件的默认操作是否继续执行（<b>true</b>）或被阻止（<b>false</b>）

### Example

~~~jsx
gantt.attachEvent("onBeforeLinkAdd", function(id,link){
    // 可以在这里添加自定义逻辑
    return true;
});
~~~

### Details

此事件可以被阻止。返回 *false* 将防止链接被添加。

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


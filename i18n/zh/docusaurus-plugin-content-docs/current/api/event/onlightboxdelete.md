---
sidebar_label: onLightboxDelete
title: onLightboxDelete event
description: "当用户在灯箱中点击“删除”按钮时触发"
---

# onLightboxDelete

### Description

@short: 当用户在灯箱中点击“删除”按钮时触发

@signature: onLightboxDelete: (id: string | number) =\> boolean;

### Parameters

- `id` - (required) *string | number* - 在灯箱中打开的任务的 ID

### Returns
- ` result` - (boolean) - 定义事件的默认操作是否会被触发（<b>true</b>）或取消（<b>false</b>）

### Example

~~~jsx
gantt.attachEvent("onLightboxDelete", function(id){
    const task = gantt.getTask(id);
    if (task.duration > 60){
        alert("持续时间过长，请重试");
        return false;
    }
    return true;
})
~~~

### Details

该事件是可阻塞的。返回 *false* 以取消“删除”操作并保持灯箱打开。

### Related Guides
- [onLightboxCancel](api/event/onlightboxcancel.md)
- [onLightboxSave](api/event/onlightboxsave.md)
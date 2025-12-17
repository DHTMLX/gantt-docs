---
sidebar_label: onLightboxDelete
title: onLightboxDelete event
description: "当用户点击 lightbox 中的'删除'按钮时触发"
---

# onLightboxDelete

### Description

@short: 当用户点击 lightbox 中的"删除"按钮时触发

@signature: onLightboxDelete: (id: string | number) =\> boolean;

### Parameters

- `id` - (required) *string | number* - 任务ID（当前在 lightbox 中打开的任务）

### Returns
- ` result` - (boolean) - 决定默认事件动作是否继续执行（<b>true</b>）或被阻止（<b>false</b>）

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

此事件可以被阻止。返回 *false* 将停止"删除"操作并保持 lightbox 可见。

### Related Guides
- [onLightboxCancel](api/event/onlightboxcancel.md)
- [onLightboxSave](api/event/onlightboxsave.md)


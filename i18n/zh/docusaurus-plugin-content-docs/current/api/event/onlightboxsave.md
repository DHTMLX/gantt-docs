---
sidebar_label: onLightboxSave
title: onLightboxSave event
description: "当用户点击 lightbox 中的'保存'按钮时触发"
---

# onLightboxSave

### Description

@short: 当用户点击 lightbox 中的"保存"按钮时触发

@signature: onLightboxSave: (id: string | number, task: Task, is_new: boolean) =\> boolean;

### Parameters

- `id` - (required) *string | number* - 未修改任务的 ID。请注意，此时 lightbox 中的值尚未应用到任务对象，因此您可以通过 gantt.getTask(id) 访问原始任务
- `task` - (required) *Task* - 更新后的任务对象
- `is_new` - (required) *boolean* - 指示 lightbox 是用于创建新任务（<i>true</i>）还是编辑现有任务（<i>false</i>）

### Returns
- ` result` - (boolean) - 决定默认事件操作是否继续执行（<b>true</b>）或取消（<b>false</b>）

### Example

~~~jsx
gantt.attachEvent("onLightboxSave", function(id, task, is_new){
    // 可以在这里添加自定义逻辑
    return true;
})
~~~

### Details

此事件可以被阻止。返回 *false* 将取消"保存"操作并保持 lightbox 打开状态。

### Related Guides
- [onLightboxCancel](api/event/onlightboxcancel.md)
- [onLightboxDelete](api/event/onlightboxdelete.md)


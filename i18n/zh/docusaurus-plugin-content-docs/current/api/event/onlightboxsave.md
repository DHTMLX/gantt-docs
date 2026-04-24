---
sidebar_label: onLightboxSave
title: onLightboxSave 事件
description: "当用户在灯箱中点击“保存”按钮时触发"
---

# onLightboxSave

### Description

@short: 当用户在灯箱中点击“保存”按钮时触发

@signature: onLightboxSave: (id: string | number, task: Task, is_new: boolean) => boolean;

### Parameters

- `id` - (required) *string | number* - 未修改任务的 id。请注意，在此阶段灯箱中的值尚未应用到任务对象中，您可以通过 gantt.getTask(id) 访问初始任务
- `task` - (required) *Task* - 修改后的任务对象
- `is_new` - (required) *boolean* - 指定用户是否打开灯箱以创建新任务 (<i>true</i>)<br/> 或更新现有任务 (<i>false</i>)

### Returns
- ` result` - (boolean) - 定义事件的默认操作是否会被触发 (<b>true</b>) 或取消 (<b>false</b>)

### Example

~~~jsx
gantt.attachEvent("onLightboxSave", function(id, task, is_new){
    // 在这里插入您的自定义逻辑 
    return true;
})
~~~

### Details

该事件是可阻塞的。返回 *false* 以取消“保存”操作并保持灯箱打开。

### Related Guides
- [onLightboxCancel](api/event/onlightboxcancel.md)
- [onLightboxDelete](api/event/onlightboxdelete.md)
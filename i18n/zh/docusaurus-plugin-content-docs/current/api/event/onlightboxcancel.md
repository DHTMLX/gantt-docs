---
sidebar_label: onLightboxCancel
title: onLightboxCancel 事件
description: "当用户在灯箱中点击「取消」按钮时触发"
---

# onLightboxCancel

### Description

@short: 当用户在灯箱中点击「取消」按钮时触发

@signature: onLightboxCancel: (id: string | number) =\> void;

### Parameters

- `id` - (required) *string | number* - 任务 ID（在灯箱中打开的任务）

### Example

~~~jsx
gantt.attachEvent("onLightboxCancel", function(id){
    // 在这里插入您的自定义逻辑 
})
~~~

### Related Guides
- [onLightboxSave](api/event/onlightboxsave.md)
- [onLightboxDelete](api/event/onlightboxdelete.md)
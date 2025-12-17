---
sidebar_label: onLightboxCancel
title: onLightboxCancel event
description: "当用户在lightbox中按下'取消'按钮时触发"
---

# onLightboxCancel

### Description

@short: 当用户在lightbox中按下"取消"按钮时触发

@signature: onLightboxCancel: (id: string | number) =\> void;

### Parameters

- `id` - (required) *string | number* - 任务ID（当前在lightbox中打开的任务）

### Example

~~~jsx
gantt.attachEvent("onLightboxCancel", function(id){
    // 在这里添加自定义逻辑
})
~~~

### Related Guides
- [onLightboxSave](api/event/onlightboxsave.md)
- [onLightboxDelete](api/event/onlightboxdelete.md)


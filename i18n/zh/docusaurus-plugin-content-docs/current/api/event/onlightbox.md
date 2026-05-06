---
sidebar_label: onLightbox
title: onLightbox 事件
description: "在用户打开 lightbox（编辑表单）后触发"
---

# onLightbox

### Description

@short: 在用户打开 lightbox（编辑表单）后触发

@signature: onLightbox: (task_id: string | number) =\> void;

### Parameters

- `task_id` - (required) *string,number* - 在 lightbox 中打开的任务的 ID

### Example

~~~jsx
gantt.attachEvent("onLightbox", function (task_id){
    // 在这里插入您的自定义逻辑 
});
~~~
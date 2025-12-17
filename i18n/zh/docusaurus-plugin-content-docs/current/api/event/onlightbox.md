---
sidebar_label: onLightbox
title: onLightbox event
description: "当用户打开 lightbox（编辑表单）时触发一次"
---

# onLightbox

### Description

@short: 当用户打开 lightbox（编辑表单）时触发一次

@signature: onLightbox: (task_id: string | number) =\> void;

### Parameters

- `task_id` - (required) *string | number* - 在 lightbox 中打开的任务 ID

### Example

~~~jsx
gantt.attachEvent("onLightbox", function (task_id){
    // 可以在这里添加自定义逻辑
});
~~~

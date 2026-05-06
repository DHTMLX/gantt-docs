---
sidebar_label: onAfterLightbox
title: onAfterLightbox 事件
description: "在用户关闭 lightbox（编辑表单）后触发"
---

# onAfterLightbox

### Description

@short: 在用户关闭 lightbox（编辑表单）后触发

@signature: onAfterLightbox: () =\> void;

### Example

~~~jsx
gantt.attachEvent("onAfterLightbox", function (){
    // 在这里插入您的自定义逻辑
});
~~~
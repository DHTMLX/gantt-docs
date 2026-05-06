---
sidebar_label: onLightboxChange
title: onLightboxChange 事件
description: "lightbox 的结构发生变化时触发"
---

# onLightboxChange

### Description

@short: lightbox 的结构发生变化时触发

@signature: onLightboxChange: (old_type: string, new_type: string) =\> void;

### Parameters

- `old_type` - (required) *string* - 初始 lightbox 结构的名称
- `new_type` - (required) *string* - 新 lightbox 结构的名称

### Example

~~~jsx
gantt.attachEvent("onLightboxChange", function(old_type, new_type){
    if(new_type == "milestone"){
        alert("您已将任务类型更改为 'milestone'")
    }
});
~~~
---
sidebar_label: onLightboxChange
title: onLightboxChange event
description: "当 lightbox 结构更新时触发"
---

# onLightboxChange

### Description

@short: 当 lightbox 结构更新时触发

@signature: onLightboxChange: (old_type: string, new_type: string) =\> void;

### Parameters

- `old_type` - (required) *string* - 原始 lightbox 结构的名称
- `new_type` - (required) *string* - 更新后的 lightbox 结构名称

### Example

~~~jsx
gantt.attachEvent("onLightboxChange", function(old_type, new_type){
    if(new_type == "milestone"){
        alert("您已将任务类型更改为 'milestone'")
    }
});
~~~

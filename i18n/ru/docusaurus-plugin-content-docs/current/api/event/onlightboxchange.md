---
sidebar_label: onLightboxChange
title: onLightboxChange event
description: "срабатывает при обновлении структуры lightbox"
---

# onLightboxChange

### Description

@short: Срабатывает при обновлении структуры lightbox

@signature: onLightboxChange: (old_type: string, new_type: string) =\> void;

### Parameters

- `old_type` - (required) *string* - название исходной структуры lightbox
- `new_type` - (required) *string* - название обновлённой структуры lightbox

### Example

~~~jsx
gantt.attachEvent("onLightboxChange", function(old_type, new_type){
    if(new_type == "milestone"){
        alert("Вы изменили тип задачи на 'milestone'")
    }
});
~~~

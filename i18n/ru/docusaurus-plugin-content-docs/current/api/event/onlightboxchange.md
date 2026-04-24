---
sidebar_label: onLightboxChange
title: onLightboxChange событие
description: "срабатывает при изменении структуры lightbox"
---

# onLightboxChange

### Description

@short: Срабатывает, когда структура lightbox изменяется

@signature: onLightboxChange: (old_type: string, new_type: string) => void;

### Parameters

- `old_type` - (required) *string* - имя исходной структуры lightbox
- `new_type` - (required) *string* - имя новой структуры lightbox

### Example

~~~jsx
gantt.attachEvent("onLightboxChange", function(old_type, new_type){
    if(new_type == "milestone"){
        alert("Вы изменили тип вашей задачи на 'milestone'")
    }
});
~~~
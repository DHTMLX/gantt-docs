---
sidebar_label: onLightboxChange
title: onLightboxChange event
description: "fires when the structure of the lightbox is changed"
---

# onLightboxChange

### Description

@short: Fires when the structure of the lightbox is changed

@signature: onLightboxChange: (old_type: string, new_type: string) =\> void;

### Parameters

- `old_type` - (required) *string* - the name of the initial lighbox's structure
- `new_type` - (required) *string* - the name of the new lighbox's structure

### Example

~~~jsx
gantt.attachEvent("onLightboxChange", function(old_type, new_type){
    if(new_type == "milestone"){
        alert("You have changed the type of your task to 'milestone'")
    }
});
~~~

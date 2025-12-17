---
sidebar_label: onLightbox
title: onLightbox event
description: "fires after the user has opened the lightbox (edit form)"
---

# onLightbox

### Description

@short: Fires after the user has opened the lightbox (edit form)

@signature: onLightbox: (task_id: string | number) =\> void;

### Parameters

- `task_id` - (required) *string,number* - the id of the task opened in the lightbox

### Example

~~~jsx
gantt.attachEvent("onLightbox", function (task_id){
    //any custom logic here
});
~~~

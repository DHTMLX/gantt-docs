---
sidebar_label: resetLightbox
title: resetLightbox method
description: "removes the current lightbox's HTML object element"
---

# resetLightbox

### Description

@short: Removes the current lightbox's HTML object element

@signature: resetLightbox: () =\> void

### Example

~~~jsx
var full_lightbox =[
    {name:"description", height:70, map_to:"text", type:"textarea", focus:true},
    {name:"time",          height:72, map_to:"auto", type:"duration"}
];
var restricted_lightbox = [
    {name:"description", height:70, map_to:"text", type:"textarea", focus:true}
];

gantt.attachEvent("onBeforeLightbox", function(task_id) {
    gantt.resetLightbox(); /*!*/
    var task = gantt.getTask(task_id);  
    if (task.restricted ==true){
        gantt.config.lightbox.sections = restricted_lightbox;
    } else {
        gantt.config.lightbox.sections = full_lightbox;
    };   
    return true;
});
~~~

### Details

The method can be used to change the lightbox's configuration dynamically: you call the method to delete the current lightbox object and regenerate 
a new one based on the lightbox configuration.

---
sidebar_label: resetLightbox
title: resetLightbox method
description: "移除当前 lightbox 的 HTML 对象元素"
---

# resetLightbox

### Description

@short: 移除当前 lightbox 的 HTML 对象元素

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

此方法用于动态更新 lightbox 的配置。它会移除现有的 lightbox HTML 元素，从而允许根据当前配置创建一个全新的 lightbox。

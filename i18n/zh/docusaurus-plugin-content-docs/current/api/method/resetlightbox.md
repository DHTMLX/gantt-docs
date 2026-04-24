---
sidebar_label: resetLightbox
title: resetLightbox 方法
description: "移除当前 lightbox 的 HTML object 元素"
---

# resetLightbox

### Description

@short: 移除当前 lightbox 的 HTML object 元素

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

方法可用于动态更改 lightbox 的配置：通过调用此方法来删除当前的 lightbox 对象，并根据 lightbox 配置重新生成一个新的对象。
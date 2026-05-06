---
sidebar_label: resetLightbox
title: метод resetLightbox
description: "удаляет текущий HTML-объект lightbox"
---

# resetLightbox

### Description

@short: Удаляет текущий HTML-объект lightbox

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

Метод можно использовать для динамического изменения конфигурации lightbox: вызываете метод, чтобы удалить текущий объект lightbox и заново сгенерировать новый, опираясь на конфигурацию lightbox.
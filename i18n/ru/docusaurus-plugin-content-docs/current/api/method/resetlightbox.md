---
sidebar_label: resetLightbox
title: resetLightbox method
description: "удаляет текущий HTML-элемент lightbox'а"
---

# resetLightbox

### Description

@short: Удаляет текущий HTML-элемент lightbox'а

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

Этот метод полезен для обновления настройки lightbox'а на лету. Он удаляет существующий HTML-элемент lightbox'а, позволяя создать новый в соответствии с текущей конфигурацией.

---
sidebar_label: resetLightbox
title: resetLightbox method
description: "entfernt das aktuelle HTML-Objektelement der Lightbox"
---

# resetLightbox

### Description

@short: Entfernt das aktuelle HTML-Objektelement der Lightbox

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

Diese Methode ist nützlich, um die Konfiguration der Lightbox dynamisch zu aktualisieren. Sie entfernt das bestehende HTML-Element der Lightbox, sodass ein neues entsprechend der aktuellen Konfiguration erstellt werden kann.

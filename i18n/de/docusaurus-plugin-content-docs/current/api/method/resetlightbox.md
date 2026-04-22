---
sidebar_label: resetLightbox
title: resetLightbox Methode
description: "entfernt das HTML-Objekt der aktuellen Lightbox"
---

# resetLightbox

### Description

@short: Entfernt das HTML-Objekt der aktuellen Lightbox

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

Die Methode kann verwendet werden, um die Konfiguration der Lightbox dynamisch zu ändern: Sie rufen die Methode auf, um das aktuelle Lightbox-Objekt zu löschen und basierend auf der Lightbox-Konfiguration ein neues zu erzeugen.
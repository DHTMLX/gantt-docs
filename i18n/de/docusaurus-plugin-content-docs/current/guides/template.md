---
title: "Template Control"
sidebar_label: "Template Control"
---

# Template Control

Dies ist ein Container, der HTML-Inhalt enthält.

![template_control](/img/template_control.png)

~~~js
gantt.config.lightbox.sections = [
    {name:"description", height:38, map_to:"text", type:"textarea", focus:true},
    {name:"template", height:16, type:"template", map_to:"my_template"}, /*!*/
    {name:"time", height:72, type:"duration", map_to:"auto"}
];

gantt.locale.labels.section_template = "Details";

gantt.attachEvent("onBeforeLightbox", function(id) {
      var task = gantt.getTask(id);
       task.my_template = "<span id='title1'>Holders: </span>"+ task.users
    +"<span id='title2'>Progress: </span>"+ task.progress*100 +" %";
    return true;
});
~~~

[Template control](https://docs.dhtmlx.com/gantt/samples/05_lightbox/05_template.html)


## Initialisierung

Um das **template**-Steuerelement im Lightbox-Dialog einzubinden, gehen Sie wie folgt vor:

1) Fügen Sie eine Sektion zur Lightbox-Konfiguration hinzu:

~~~js
gantt.config.lightbox.sections = [
    {name:"description", height:38, map_to:"text", type:"textarea", focus:true},
    {name:"template", height:16, type:"template", map_to:"my_template"}, /*!*/
    {name:"time", height:72, type:"duration", map_to:"auto"}
];
~~~

2) Definieren Sie ein Label für die Sektion:

~~~js
gantt.locale.labels.section_template = "Details";
~~~

3) Füllen Sie den Inhalt des Steuerelements über ein Ereignis, zum Beispiel das [onBeforeLightbox](api/event/onbeforelightbox.md)-Ereignis:

~~~js
gantt.attachEvent("onBeforeLightbox", function(id) {
      var task = gantt.getTask(id);
       task.my_template = "<span id='title1'>Holders: </span>"+ task.users
    +"<span id='title2'>Progress: </span>"+ task.progress*100 +" %";
    return true;
});
~~~


## Eigenschaften

Hier sind einige wichtige Eigenschaften, die häufig mit dem **template**-Steuerelement verwendet werden (die vollständige Liste finden Sie [hier](api/config/lightbox.md)):

- **name** - (*string*) gibt den Namen der Sektion an
- **height** - (*number*) legt die Höhe der Sektion fest
- **map_to** - (*string*) die Daten-Eigenschaft, der die Sektion zugeordnet wird
- **type** - (*string*) definiert den Typ des [section control](guides/default-edit-form.md#lightboxcontrols)
- **focus** - (*boolean*) wenn auf *true* gesetzt, erhält die Sektion beim Öffnen der Lightbox den Fokus


---
title: "Vorlagensteuerung"
sidebar_label: "Vorlagensteuerung"
---

# Vorlagensteuerung

Ein Container mit etwas HTML-Inhalt darin.

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

[Vorlagensteuerung](https://docs.dhtmlx.com/gantt/samples/05_lightbox/05_template.html)


## Initialisierung

Um die **template**-Steuerung zur Lightbox hinzuzufügen, befolgen Sie diese Schritte:

1) Fügen Sie der Lightbox-Konfiguration einen Abschnitt hinzu:

~~~js
gantt.config.lightbox.sections = [
    {name:"description", height:38, map_to:"text", type:"textarea", focus:true},
    {name:"template", height:16, type:"template", map_to:"my_template"}, /*!*/
    {name:"time", height:72, type:"duration", map_to:"auto"}
];
~~~

2) Legen Sie eine Bezeichnung für den Abschnitt fest:

~~~js
gantt.locale.labels.section_template = "Details";
~~~

3) Legen Sie den Inhalt des Steuerelements mithilfe eines Ereignisses fest, z. B. des [onBeforeLightbox](api/event/onbeforelightbox.md)-Ereignisses:

~~~js
gantt.attachEvent("onBeforeLightbox", function(id) {
      var task = gantt.getTask(id);
       task.my_template = "<span id='title1'>Holders: </span>"+ task.users
    +"<span id='title2'>Progress: </span>"+ task.progress*100 +" %";
    return true;
});
~~~


## Eigenschaften

Die folgenden Eigenschaften sind überwiegend wichtig und werden typischerweise für die **template**-Steuerung festgelegt (siehe die vollständige Liste [hier](api/config/lightbox.md)):

- **name** - (*string*) der Abschnittsname
- **height** - (*number*) die Abschnittshöhe
- **map_to** - (*string*) der Name einer Daten-Eigenschaft, die dem Abschnitt zugeordnet wird
- **type** - (*string*) der Typ des [section control](guides/default-edit-form.md#lightboxcontrols)
- **focus** - (*boolean*) wenn auf *true* gesetzt, erhält der Abschnitt beim Öffnen der Lightbox den Fokus
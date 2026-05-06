--- 
title: "Textbereich-Steuerung"
sidebar_label: "Textbereich-Steuerung"
---

# Textbereich-Steuerung

Ein mehrzeiliges Textfeld.

![textarea_control](/img/textarea_control.png)

## Initialisierung

Standardmäßig wird ein **textarea**-Steuerelement der Lightbox hinzugefügt. Möchten Sie ein weiteres hinzufügen, führen Sie die untenstehenden Schritte aus:

1) Füge einen Abschnitt zur Lightbox-Konfiguration hinzu:

~~~js
gantt.config.lightbox.sections = [
    {name:"description", height:38, map_to:"desc", type:"textarea",focus:true},
    {name:"details",     height:38, map_to:"text", type:"textarea"}, /*!*/
    {name:"time",        height:72, map_to:"auto", type:"duration"}
];
~~~

2) Weisen Sie dem Abschnitt eine Bezeichnung zu:

~~~js
gantt.locale.labels.section_details = "Einzelheiten";
~~~

## Eigenschaften

Die folgenden Eigenschaften sind für das **textarea**-Steuerelement am wichtigsten und werden üblicherweise festgelegt (siehe die vollständige Liste [hier](api/config/lightbox.md)):

- **name** - (*string*) der Abschnittsname
- **height** - (*number*) die Abschnittshöhe
- **map_to** - (*string*) der Name einer Dateneigenschaft, die dem Abschnitt zugeordnet wird
- **type** - (*string*) der Typ des [Abschnitts-Steuerung](guides/default-edit-form.md#lightboxcontrols)
- **focus** - (*boolean*) falls auf *true* gesetzt, erhält der Abschnitt beim Öffnen der Lightbox den Fokus
- **default_value** - (*any*) der Standardwert des Abschnitts-Steuerelements. Wird nur angewendet, wenn der Eingabewert undefiniert ist. Funktioniert nicht mit *map_to:"text"*
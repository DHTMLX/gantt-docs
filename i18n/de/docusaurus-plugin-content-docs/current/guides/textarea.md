---
title: "Textarea-Steuerelement"
sidebar_label: "Textarea-Steuerelement"
---

# Textarea-Steuerelement

Dies ist ein mehrzeiliges Textfeld.

![textarea_control](/img/textarea_control.png)

## Initialisierung

Standardmäßig enthält das Lightbox-Formular ein **textarea**-Steuerelement. Um ein weiteres hinzuzufügen, gehen Sie wie folgt vor:

1) Fügen Sie dem Lightbox-Konfigurationsarray einen neuen Abschnitt hinzu:

~~~js
gantt.config.lightbox.sections = [
    {name:"description", height:38, map_to:"desc", type:"textarea",focus:true},
    {name:"details",     height:38, map_to:"text", type:"textarea"}, /*!*/
    {name:"time",        height:72, map_to:"auto", type:"duration"}
];
~~~

2) Definieren Sie eine Beschriftung für den neuen Abschnitt:

~~~js
gantt.locale.labels.section_details = "Details";
~~~

## Eigenschaften

Hier sind die wichtigsten Eigenschaften, die häufig mit dem **textarea**-Steuerelement verwendet werden (die vollständige Liste finden Sie [hier](api/config/lightbox.md)):

- **name** - (*string*) der Bezeichner des Abschnitts
- **height** - (*number*) die Höhe des Abschnitts
- **map_to** - (*string*) die Daten-Eigenschaft, die mit dem Abschnitt verknüpft ist
- **type** - (*string*) der Typ des [Abschnitts-Steuerelements](guides/default-edit-form.md#lightboxcontrols)
- **focus** - (*boolean*) wenn auf *true* gesetzt, wird dieser Abschnitt beim Öffnen des Lightbox-Formulars fokussiert
- **default_value** - (*any*) der Anfangswert für das Steuerelement, wird nur angewendet, wenn die Eingabe undefiniert ist. Beachten Sie, dass dies nicht mit *map_to:"text"* funktioniert


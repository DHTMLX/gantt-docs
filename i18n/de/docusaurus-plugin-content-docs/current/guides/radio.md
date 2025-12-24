---
title: "Radio Button-Steuerelement"
sidebar_label: "Radio Button-Steuerelement"
---

# Radio Button-Steuerelement


Dieses Steuerelement präsentiert eine Auswahl von Optionen, bei der jeweils nur eine ausgewählt werden kann.

![Radio Button](/img/radiobutton_control.png)


[Radio control](https://docs.dhtmlx.com/gantt/samples/05_lightbox/02_radio.html)


## Initialisierung


Um das **Radio Button**-Steuerelement in die Lightbox einzubinden, gehen Sie wie folgt vor:

1) Fügen Sie einen Abschnitt in der Lightbox-Konfiguration hinzu:

~~~js
var opts = [
    {key: 1, label: "High"},
    {key: 2, label: "Normal"},
    {key: 3, label: "Low"}                                        
];

gantt.config.lightbox.sections = [
    {name: "description", height: 38, map_to: "text", type: "textarea", focus: true},
    {name: "priority", height: 22, map_to: "priority", type: "radio", options: [opts]}, /*!*/
    {name: "time", type: "duration", map_to: "auto"}
];
~~~

2) Definieren Sie eine Beschriftung für diesen Abschnitt:

~~~js
gantt.locale.labels.section_priority = "Priority";
~~~
  

[Radio control](https://docs.dhtmlx.com/gantt/samples/05_lightbox/02_radio.html)


## Eigenschaften


Hier sind einige der wichtigsten Eigenschaften, die häufig mit dem **Radio Button**-Steuerelement verwendet werden (die vollständige Liste finden Sie [hier](api/config/lightbox.md)):

- **name** - (*string*) der Name des Abschnitts
- **map_to** - (*string*) die Daten-Eigenschaft, der der Abschnitt entspricht
- **type** - (*string*) der [Typ des Abschnitts-Steuerelements](guides/default-edit-form.md#lightboxcontrols)
- **options** - (*array*) ein Array von Objekten, das die auswählbaren Optionen definiert (*wird mit **select**, **checkbox** und **radio** Steuerelementen verwendet*). Jedes Objekt stellt eine Option dar und enthält:
    - **key** - (*string*) der Bezeichner der Option, der mit den Aufgabendaten abgeglichen wird, um die Option zuzuweisen
    - **label** - (*string*) der angezeigte Text für die Option
- **focus** - (*boolean*) wenn auf *true* gesetzt, erhält der Abschnitt automatisch den Fokus, sobald die Lightbox geöffnet wird
- **default_value** - (*any*) der Standardwert für das Steuerelement, der nur angewendet wird, wenn der Eingabewert nicht definiert ist            


## Befüllen des Steuerelements mit Daten


Um die Optionen für das **Radio Button**-Steuerelement festzulegen, verwenden Sie den [options](api/config/lightbox.md)-Parameter:

~~~js
gantt.config.lightbox.sections = [        
    {name: "priority", map_to: "priority", type: "radio", options: [
        {key: 1, label: "High"},
        {key: 2, label: "Normal"},
        {key: 3, label: "Low"},
    ]}        
];
~~~

Jedes Element im [options](api/config/lightbox.md)-Array benötigt zwei Eigenschaften:

- **key** - der Bezeichner der Option
- **label** - der angezeigte Text für die Option


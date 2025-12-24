---
title: "Baselines-Steuerung"
sidebar_label: "Baselines-Steuerung"
---

# Baselines-Steuerung


:::info
Dieses Feature ist nur in der PRO Edition enthalten.
:::

Dies ist eine Sammlung von Selektoren, die dazu dienen, die [Baselines](guides/inbuilt-baselines.md) für eine Aufgabe festzulegen, indem das Startdatum und die Dauer in Tagen definiert werden.

~~~js
gantt.config.lightbox.sections = [
    { name: "description", height: 38, map_to: "text", type: "textarea", focus: true },
    { name: "time", type: "duration", map_to: "auto" },
    { name: "baselines", height: 100, type: "baselines", map_to: "baselines" }, /*!*/
];
~~~


[Display baselines](https://docs.dhtmlx.com/gantt/samples/04_customization/15_baselines.html)


## Initialisierung


Um das **baselines**-Steuerelement in der Lightbox zu verwenden, gehen Sie wie folgt vor:

1) Fügen Sie eine Sektion zur Lightbox-Konfiguration hinzu:

~~~js
gantt.config.lightbox.sections = [
    { name:"description", height:38, map_to:"text", type:"textarea", focus:true},
    { name:"baselines", type:"baselines" },  /*!*/
    { name:"time", type:"duration", map_to:"auto" }
];
~~~
  
2) Definieren Sie ein Label für diese Sektion:

~~~js
gantt.locale.labels.section_baselines = "Baselines";
~~~

## Eigenschaften


Hier sind die wichtigsten Eigenschaften, die häufig mit dem **baselines**-Steuerelement verwendet werden (die vollständige Liste finden Sie [hier](api/config/lightbox.md)):

- **name** - (*string*) der Bezeichner der Sektion
- **height** - (*number*) die Höhe der Sektion
- **map_to** - (*string*) sollte auf "baselines" gesetzt werden
- **formatter** - (object) eine Instanz des [durationFormatter](guides/working-time.md#taskdurationindecimalformat)-Objekts
- **type** - (*string*) der Typ des [Sektions-Steuerelements](guides/default-edit-form.md#lightboxcontrols)
- **focus** - (*boolean*) wenn true, wird diese Sektion beim Öffnen der Lightbox fokussiert
- **readonly** - (*boolean*) wenn true, ist die Sektion schreibgeschützt
- **year_range** - (*array,number*) definiert den Bereich für den Jahres-Selektor. Es gibt zwei Möglichkeiten:
    - *year_range: [2005, 2025]* - von 2005 bis 2025 
    - *year_range: 10*  - von (aktuelles Jahr - 10) bis (aktuelles Jahr + 10)
- **single_date** - (*boolean*) wenn true, wird nur der *Startdatum*-Selektor angezeigt. Aufgaben, die auf diese Weise bearbeitet werden, haben eine Dauer von null, was hauptsächlich für [Meilensteine](guides/task-types.md#milestones) nützlich ist
- **time_format** - (*string*) legt die Reihenfolge der Datums-/Zeit-Selektoren fest

## Lokalisierung


Sie können die Beschriftungen für diese Teile des **baselines**-Steuerelements anpassen:

- **gantt.locale.labels.baselines_section_placeholder** - Text, der angezeigt wird, wenn keine Baselines hinzugefügt wurden
- **gantt.locale.labels.baselines_remove_button** - Beschriftung für den Button, der eine Baseline entfernt (Standard: *"Remove"*)
- **gantt.locale.labels.baselines_add_button** - Beschriftung für den Button, der eine neue Baseline hinzufügt (Standard: *"Add Baseline"*)
- **gantt.locale.labels.baselines_remove_all_button** - Beschriftung für den Button, der alle Baselines entfernt (Standard: *"Remove All"*)


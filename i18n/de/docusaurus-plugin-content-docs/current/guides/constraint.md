---
title: "Constraint-Steuerung"
sidebar_label: "Constraint-Steuerung"
---

# Constraint-Steuerung

:::info
Dieses Feature ist nur in der PRO Edition enthalten.
:::

Dies ist ein spezielles Steuerelement, das dazu dient, [Zeitbeschränkungen für Gantt-Aufgaben](guides/auto-scheduling.md#timeconstraintsfortasks) festzulegen.

![Constraint control](/img/constraint_control.png)

~~~js
gantt.config.lightbox.sections = [
    { name:"description", height:38, map_to:"text", type:"textarea", focus:true},
    { name:"constraint", type:"constraint" },  /*!*/
    { name:"time", type:"duration", map_to:"auto" }
];
~~~


[Auto-Schedule From Project Start & Constraints](https://docs.dhtmlx.com/gantt/samples/02_extensions/19_constraints_scheduling.html)


## Initialisierung

Um das **constraint**-Steuerelement in das Lightbox-Formular einzubinden, gehen Sie wie folgt vor:

1. Fügen Sie einen Abschnitt in die Lightbox-Konfiguration ein:

~~~js
gantt.config.lightbox.sections = [
    { name:"description", height:38, map_to:"text", type:"textarea", focus:true},
    { name:"constraint", type:"constraint" },  /*!*/
    { name:"time", type:"duration", map_to:"auto" }
];
~~~

2. Definieren Sie ein Label für den Abschnitt:

~~~js
gantt.locale.labels.section_constraint = "Constraint";
~~~


[Auto-Schedule From Project Start & Constraints](https://docs.dhtmlx.com/gantt/samples/02_extensions/19_constraints_scheduling.html)


## Eigenschaften

Hier sind die wichtigsten Eigenschaften, die häufig mit dem **constraint**-Steuerelement verwendet werden (die vollständige Liste finden Sie [hier](api/config/lightbox.md)):

- **name** - (*string*) identifiziert den Namen des Abschnitts 
- **type** - (*string*) gibt den Typ des [section control](guides/default-edit-form.md#lightboxcontrols) an


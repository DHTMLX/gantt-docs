--- 
title: "Zeitbeschränkungssteuerung"
sidebar_label: "Zeitbeschränkungssteuerung"
---

# Zeitbeschränkungssteuerung

:::info
Diese Funktionalität ist nur in der PRO Edition verfügbar.
:::

Ein komplexes Steuerelement, das verwendet wird, um [Zeitbeschränkungen für Gantt-Aufgaben](guides/auto-scheduling.md#timeconstraintsfortasks) festzulegen.

![Zeitbeschränkungssteuerung](/img/constraint_control.png)

~~~js
gantt.config.lightbox.sections = [
    { name:"description", height:38, map_to:"text", type:"textarea", focus:true},
    { name:"constraint", type:"constraint" },  /*!*/
    { name:"time", type:"duration", map_to:"auto" }
];
~~~

[Automatische Planung ab Projektstart und Beschränkungen](https://docs.dhtmlx.com/gantt/samples/02_extensions/19_constraints_scheduling.html)


## Initialisierung

Um das **constraint**-Steuerelement dem Lightbox hinzuzufügen, befolgen Sie die untenstehenden Schritte:

1. Fügen Sie eine Sektion zur Lightbox-Konfiguration hinzu:

~~~js
gantt.config.lightbox.sections = [
    { name:"description", height:38, map_to:"text", type:"textarea", focus:true},
    { name:"constraint", type:"constraint" },  /*!*/
    { name:"time", type:"duration", map_to:"auto" }
];
~~~

2. Legen Sie eine Beschriftung für den Abschnitt fest:

~~~js
gantt.locale.labels.section_constraint = "Beschränkung";
~~~


[Automatische Planung ab Projektstart und Beschränkungen](https://docs.dhtmlx.com/gantt/samples/02_extensions/19_constraints_scheduling.html)


## Eigenschaften

Die folgenden Eigenschaften sind größtenteils wichtig und werden üblicherweise für das **constraint**-Steuerelement festgelegt (siehe die vollständige Liste [hier](api/config/lightbox.md)):

- **name** - (*string*) der Abschnittsname 
- **type** - (*string*) der Typ des [Abschnitts-Steuerelements](guides/default-edit-form.md#lightboxcontrols)
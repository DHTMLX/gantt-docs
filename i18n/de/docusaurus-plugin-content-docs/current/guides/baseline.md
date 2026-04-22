---
title: "Baselines-Steuerung"
sidebar_label: "Baselines-Steuerung"
---

# Baselines-Steuerung

:::info
Diese Funktionalität ist nur in der PRO-Edition verfügbar.
:::

Eine Reihe von Selektoren zur Festlegung der [baselines](guides/inbuilt-baselines.md) für eine Aufgabe, indem das Startdatum der Aufgabe und die Anzahl der Tage angegeben werden.

~~~js
gantt.config.lightbox.sections = [
    { name: "description", height: 38, map_to: "text", type: "textarea", focus: true },
    { name: "time", type: "duration", map_to: "auto" },
    { name: "baselines", height: 100, type: "baselines", map_to: "baselines" }, /*!*/
];
~~~

[Display baselines](https://docs.dhtmlx.com/gantt/samples/04_customization/15_baselines.html)

## Initialization

Um die **baselines**-Steuerung dem Lightbox hinzuzufügen, folgen Sie den untenstehenden Schritten:

1) Fügen Sie dem Lightbox-Konfiguration eine Sektion hinzu:

~~~js
gantt.config.lightbox.sections = [
    { name:"description", height:38, map_to:"text", type:"textarea", focus:true},
    { name:"baselines", type:"baselines" },  /*!*/
    { name:"time", type:"duration", map_to:"auto" }
];
~~~
  
2) Legen Sie eine Bezeichnung für den Abschnitt fest:

~~~js
gantt.locale.labels.section_baselines = "Baselines";
~~~

## Eigenschaften

Die folgenden Eigenschaften sind hauptsächlich wichtig und werden häufig für die **baselines**-Steuerung gesetzt (siehe die vollständige Liste [hier](api/config/lightbox.md)):

- **name** - (*string*) der Abschnittsname 
- **height** - (*number*) die Abschnittshöhe
- **map_to** - (*string*) setzen Sie es auf "baselines"
- **formatter** - (object) eine Instanz des [durationFormatter](guides/working-time.md#taskdurationindecimalformat)-Objekts
- **type** - (*string*) der Typ des [section control](guides/default-edit-form.md#lightboxcontrols)
- **focus** - (*boolean*) wenn auf *true* gesetzt, erhält der Abschnitt beim Öffnen der Lightbox den Fokus
- **readonly** - (*boolean*) wenn Sie den Wert "true" setzen, ist der Abschnitt schreibgeschützt
- **year_range** - (*array,number*) legt einen Bereich für den Jahresauswahl fest. Der Bereich kann auf zwei Arten festgelegt werden: 
    - *year_range: [2005, 2025]* - ein Zeitraum von 2005 bis 2025 
    - *year_range: 10*  - ein Zeitraum [aktuelles Jahr - 10 Jahre; aktuelles Jahr + 10 Jahre]
- **single_date** - (*boolean*) wenn Sie den Wert "true" setzen, wird im Abschnitt nur der *Startdatum*-Auswahl angezeigt. Bearbeitete Aufgaben werden nur durch das Startdatum festgelegt und haben eine Nulldauer. Sinnvoll nur für [milestones](guides/task-types.md#milestones)
- **time_format** - (*string*) legt die Reihenfolge der Datum-Uhrzeit-Auswahlen fest

## Lokalisierung

Sie können die Bezeichnungen der folgenden Elemente der **baselines**-Steuerung lokalisieren:

- **gantt.locale.labels.baselines_section_placeholder** - der Text, der angezeigt wird, wenn keine Baselines hinzugefügt wurden
- **gantt.locale.labels.baselines_remove_button** - der Text des Buttons zum Entfernen einer Baseline (*"Remove"* standardmäßig)
- **gantt.locale.labels.baselines_add_button** - der Text des Buttons zum Hinzufügen einer neuen Baseline (*"Add Baseline"* standardmäßig)
- **gantt.locale.labels.baselines_remove_all_button** - der Text des Buttons zum Entfernen aller Baselines (*"Remove All"* standardmäßig)
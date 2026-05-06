---
sidebar_label: baselines
title: baselines config
description: "legt fest, wie baselines im Gantt-Chart funktionieren"
---

# baselines

### Description

@short: Konfiguriert die Funktionalität von Baselines im Gantt-Diagramm

@signature: baselines: BaselineConfig | boolean

### Example

~~~jsx
gantt.config.baselines = {
  datastore: "baselines",
  render_mode: false,
  dataprocessor_baselines: false,
  row_height: 16,
  bar_height: 8
};
gantt.init("gantt_here");
~~~

### Related samples
- [Baselines anzeigen](https://docs.dhtmlx.com/gantt/samples/04_customization/15_baselines.html)

### Details

Diese Konfiguration definiert, wie Baselines im Gantt-Diagramm behandelt und angezeigt werden. Sie kann als Objekt gesetzt werden, um die Anzeige anzupassen, oder als Boolean, um die Funktion zu aktivieren oder zu deaktivieren. Die Objektkonfiguration enthält die folgenden Eigenschaften:

-  **datastore** - (*string*) - der Name des Datastore, der zur Speicherung von Baseline-Einträgen verwendet wird. Für verwandte Funktionen siehe die Methode `getDatastore`.
-  **render_mode** - (*boolean | string*) - bestimmt, wie Baselines angezeigt werden:
  - **_false_** - Baselines werden nicht angezeigt.
  - **_"taskRow"_** - Baselines werden in derselben Zeile wie die Task-Leiste angezeigt.
  - **_"separateRow"_** - Baselines werden in einer separaten Unterzeile angezeigt, was die Zeilenhöhe der Task erhöht.
  - **_"individualRow"_** - jede Baseline wird in einer eigenen Unterzeile unterhalb der Aufgabe dargestellt.
- **dataprocessor_baselines** - (*boolean*) - gibt an, ob Baseline-Updates den DataProcessor als einzelne Einträge auslösen.
- **row_height** - (*number*) - definiert die Höhe der Unterzeile für Baselines, gilt nur, wenn `render_mode` auf `"separateRow"` oder `"individualRow"` gesetzt ist.
- **bar_height** -  (*number*) - legt die Höhe der Baseline-Leiste fest.

### Related API
- [getDatastore](api/method/getdatastore.md)

### Related Guides
- [Zusätzliche Elemente in Timeline](guides/inbuilt-baselines.md)

### Change log
- hinzugefügt in v9.0
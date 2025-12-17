---
sidebar_label: baselines
title: baselines config
description: "legt fest, wie baselines im Gantt-Chart funktionieren"
---

# baselines

### Description

@short: Legt fest, wie baselines im Gantt-Chart funktionieren

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
- [Display baselines](https://docs.dhtmlx.com/gantt/samples/04_customization/15_baselines.html)

### Details

Diese Einstellung steuert, wie baselines im Gantt-Chart verwaltet und angezeigt werden. Sie kann entweder ein Objekt für detaillierte Anpassungen oder ein einfacher Boolean sein, um die Funktion ein- oder auszuschalten. Das Objekt enthält folgende Optionen:

-  **datastore** - (*string*) - der Name des Datastores, in dem die baseline-Einträge gespeichert werden. Weitere Informationen dazu finden Sie in der Methode `getDatastore`.
-  **render_mode** - (*boolean | string*) - definiert, wie baselines dargestellt werden:
  - **_false_** - baselines werden nicht angezeigt.
  - **_"taskRow"_** - baselines erscheinen in derselben Zeile wie die Task-Bar.
  - **_"separateRow"_** - baselines erhalten eine eigene Subrow, wodurch die Task-Zeile höher wird.
  - **_"individualRow"_** - jede baseline wird in einer eigenen Subrow unterhalb der Task dargestellt.
- **dataprocessor_baselines** - (*boolean*) - bestimmt, ob Änderungen an baselines den DataProcessor für jeden Eintrag auslösen.
- **row_height** - (*number*) - legt die Höhe der baseline-Subrow fest, verwendet nur bei `render_mode` `"separateRow"` oder `"individualRow"`.
- **bar_height** -  (*number*) - steuert die Höhe der baseline-Bar.

### Related API
- [getDatastore](api/method/getdatastore.md)

### Related Guides
- ["Zusätzliche Elemente in der Zeitleiste"](guides/inbuilt-baselines.md)

### Change log
- hinzugefügt in v9.0


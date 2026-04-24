---
sidebar_label: refreshData
title: refreshData method
description: "aktualisiert Daten im Gantt-Diagramm"
---

# refreshData

### Description

@short: Aktualisiert Daten im Gantt-Diagramm

@signature: refreshData: () =\> void

### Example

~~~jsx
gantt.refreshData();
~~~

### Related samples
- [Grundlegende Filterung](https://docs.dhtmlx.com/gantt/samples/07_grid/03_filtering.html)

### Details

Die Methode dient nicht zum Neuladen, sondern zum Neuzeichnen der Daten im Gantt-Diagramm. Siehe das Beispiel:

:::note
sample: [Gantt. Daten neu zeichnen](https://snippet.dhtmlx.com/ces4sfdh)
:::

Wenn Sie Daten vom Server laden müssen, verwenden Sie entweder die [parse()](api/method/parse.md) oder [load()](api/method/load.md) Methode.

:::note
sample: [Gantt. Daten aus unterschiedlichen Datenobjekten laden](https://snippet.dhtmlx.com/h9ob1hxr)
:::

### Related API
- [refreshLink](api/method/refreshlink.md)
- [refreshTask](api/method/refreshtask.md)

### Related Guides
- [Grundlegende Operationen mit Aufgaben](guides/crud-task.md)
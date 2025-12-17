---
sidebar_label: refreshData
title: refreshData method
description: "aktualisiert die Daten im Gantt-Diagramm"
---

# refreshData

### Description

@short: Aktualisiert die Daten im Gantt-Diagramm

@signature: refreshData: () =\> void

### Example

~~~jsx
gantt.refreshData();
~~~

### Related samples
- [Basic filtering](https://docs.dhtmlx.com/gantt/samples/07_grid/03_filtering.html)

### Details

Diese Methode dient dazu, die bereits im Gantt-Diagramm vorhandenen Daten neu zu zeichnen, ohne sie neu zu laden. Hier ein Beispiel zur Veranschaulichung:

:::note
Sample: [Gantt. Daten neu zeichnen](https://snippet.dhtmlx.com/ces4sfdh) 
:::

Wenn Sie Daten vom Server abrufen müssen, sollten Sie stattdessen die Methoden [parse()](api/method/parse.md) oder [load()](api/method/load.md) verwenden.

:::note
Sample: [Gantt. Daten aus verschiedenen Datenobjekten laden](https://snippet.dhtmlx.com/h9ob1hxr) 
:::

### Related API
- [refreshLink](api/method/refreshlink.md)
- [refreshTask](api/method/refreshtask.md)

### Related Guides
- ["Grundlegende Operationen mit Aufgaben"](guides/crud-task.md)


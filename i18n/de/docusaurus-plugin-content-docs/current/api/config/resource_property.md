---
sidebar_label: resource_property
title: resource_property Konfiguration
description: "definiert die Eigenschaft eines Aufgaben-Objekts, die die Ressource-ID speichert, die mit resourceGrid/Timeline/Histogram/Calendar verbunden ist"
--- 

# resource_property
:::info
Diese Funktionalität ist nur in der PRO-Edition verfügbar.
:::
### Description

@short: Definiert die Eigenschaft eines Aufgaben-Objekts, die die Ressource-ID speichert, die mit resourceGrid/Timeline/Histogram/Calendar verbunden ist

@signature: resource_property: string

### Example

~~~jsx
gantt.config.resource_store = "users";
gantt.config.resource_property = "user_id";

gantt.config.layout = {
  css: "gantt_container",
  rows: [
    {
      cols: [
        {view: "grid", group:"grids", scrollY: "scrollVer"},
        {resizer: true, width: 1},
        {view: "timeline", scrollX: "scrollHor", scrollY: "scrollVer"},
        {view: "scrollbar", id: "scrollVer", group:"vertical"}
      ],
      gravity:2
    },
    {resizer: true, width: 1},
    {
      config: resourceConfig,
      cols: [
        {view: "resourceGrid", group:"grids", scrollY: "resourceVScroll" },
        {resizer: true, width: 1},
        {view: "resourceTimeline", scrollX: "scrollHor", scrollY: "resourceVScroll"},
        {view: "scrollbar", id: "resourceVScroll", group:"vertical"}
      ],
      gravity:1
    },
    {view: "scrollbar", id: "scrollHor"}
  ]
};

var resourcesStore = gantt.createDatastore({
    name: gantt.config.resource_store
});

gantt.init("gantt_here");
gantt.parse({data: [
  {id: 1, text: "Project #2", start_date: "01-04-2018", duration: 18, open: true},
  {id: 2, text: "Task #1", start_date: "02-04-2018", duration:8, user_id:1, parent: 1},
  {id: 3, text: "Task #2", start_date: "11-04-2018", duration:8, user_id:2, parent: 1}
 ],
 links: [
  {id: 1, source: 1, target: 2, type: "1"},
  {id: 2, source: 2, target: 3, type: "0"}
 ]
});

resourcesStore.parse([
    {id: 1, text: "John"},
    {id: 2, text: "Mike"},
    {id: 3, text: "Anna"},
    {id: 4, text: "Bill"}
]);
~~~


**Standardwert:** "owner_id"

### Related samples
- [Ressourcen-Auslastungsdiagramm](https://docs.dhtmlx.com/gantt/samples/11_resources/04_resource_usage_diagram.html)
- [Vorlagen des Ressourcen-Diagramms](https://docs.dhtmlx.com/gantt/samples/11_resources/05_resource_usage_templates.html)

### Details

Gibt die Eigenschaft des Aufgabenobjekts an, die die Ressource-ID speichert, die mit resourceGrid/Timeline/Histogram/Calendar verbunden ist. Kann zur Laufzeit geändert werden.

### Related API
- [resource_store](api/config/resource_store.md)

### Related Guides
- [Ressourcenverwaltung](guides/resource-management.md)
- [Arbeitszeitberechnung](guides/working-time.md#assigningcalendartoresource)
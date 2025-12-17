---
sidebar_label: resource_store
title: resource_store config
description: "gibt den Namen des dataStore an, der mit den Ansichten resourceGrid/resourceTimeline/resourceHistogram verknüpft ist"
---

# resource_store
:::info
 Diese Funktion ist nur in der PRO-Edition verfügbar. 
:::
### Description

@short: Gibt den Namen des dataStore an, der mit den Ansichten resourceGrid/resourceTimeline/resourceHistogram verknüpft ist

@signature: resource_store: string

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
  {id: 1, text: "Project #2", start_date: "01-04-2018", duration:18, open: true},
  {id: 2, text: "Task #1", start_date: "02-04-2018", user_id:1, duration:8, parent: 1},
  {id: 3, text: "Task #2", start_date: "11-04-2018", user_id:2, duration:8, parent: 1}
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

**Default value:** "resource"

### Related samples
- [Resource load diagram](https://docs.dhtmlx.com/gantt/samples/11_resources/04_resource_usage_diagram.html)
- [Templates of the Resource diagram](https://docs.dhtmlx.com/gantt/samples/11_resources/05_resource_usage_templates.html)

### Details

Definiert einen datastore, der mit den Ansichten "resourceGrid" und "resourceTimeline" verbunden ist. Alternativ kann die "bind"-Eigenschaft der Ansicht gesetzt werden.

### Related API
- [resource_property](api/config/resource_property.md)

### Related Guides
- ["Ressourcenmanagement"](guides/resource-management.md)


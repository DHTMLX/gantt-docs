---
sidebar_label: resource_property
title: resource_property config
description: "defines the property of a task object that stores a resource id associated with resourceGrid/Timeline/Histogram/Calendar"
---

# resource_property
:::info
This functionality is available in the PRO edition only. 
:::
### Description

@short: Defines the property of a task object that stores a resource id associated with resourceGrid/Timeline/Histogram/Calendar

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

**Default value:** "owner_id"

### Related samples
- [Resource load diagram](https://docs.dhtmlx.com/gantt/samples/11_resources/04_resource_usage_diagram.html)
- [Templates of the Resource diagram](https://docs.dhtmlx.com/gantt/samples/11_resources/05_resource_usage_templates.html)

### Details

Specifies the property of the task object which stores the resource id associated with resourceGrid/Timeline/Histogram/Calendar. Can be changed on the runtime.

### Related API
- [resource_store](api/config/resource_store.md)

### Related Guides
- [Resource Management](guides/resource-management.md)
- [Work Time Calculation](guides/working-time.md#assigningcalendartoresource)


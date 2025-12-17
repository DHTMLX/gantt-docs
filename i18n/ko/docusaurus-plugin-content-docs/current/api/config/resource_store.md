---
sidebar_label: resource_store
title: resource_store config
description: "resourceGrid/resourceTimeline/resourceHistogram 뷰와 연결된 dataStore의 이름을 지정합니다."
---

# resource_store
:::info
이 기능은 PRO 에디션에서만 사용할 수 있습니다. 
:::
### Description

@short: ResourceGrid/resourceTimeline/resourceHistogram 뷰와 연결된 dataStore의 이름을 지정합니다.

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


"resourceGrid"와 "resourceTimeline" 뷰에 연결되는 datastore를 정의합니다. 또는 뷰의 "bind" 속성을 설정할 수도 있습니다.

### Related API
- [resource_property](api/config/resource_property.md)

### Related Guides
- [리소스 관리](guides/resource-management.md)


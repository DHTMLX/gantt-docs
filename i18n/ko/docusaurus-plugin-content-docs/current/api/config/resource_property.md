---
sidebar_label: resource_property
title: resource_property config
description: "작업 객체의 어떤 속성이 resourceGrid/Timeline/Histogram/Calendar와 연결된 리소스 ID를 포함하는지 정의합니다."
---

# resource_property
:::info
이 기능은 PRO 에디션에서만 사용할 수 있습니다. 
:::
### Description

@short: 작업 객체의 어떤 속성이 resourceGrid/Timeline/Histogram/Calendar와 연결된 리소스 ID를 포함하는지 정의합니다.

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

작업 객체에서 resourceGrid/Timeline/Histogram/Calendar와 연관된 리소스 ID를 포함하는 속성을 지정합니다. 이 설정은 런타임 중에 변경할 수 있습니다.

### Related API
- [resource_store](api/config/resource_store.md)

### Related Guides
- [리소스 관리](guides/resource-management.md)
- [작업 시간 계산](guides/working-time.md#assigningcalendartoresource)


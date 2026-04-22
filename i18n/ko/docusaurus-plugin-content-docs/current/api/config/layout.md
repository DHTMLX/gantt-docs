---
sidebar_label: layout
title: layout config
description: "레이아웃 객체를 정의합니다."
---

# layout

### Description

@short: 레이아웃 객체를 지정합니다

@signature: layout: any

### Example

~~~jsx
gantt.config.layout = {
     css: "gantt_container",
     rows:[
        {
           cols: [
          {view: "grid", id: "grid", scrollX:"scrollHor", scrollY:"scrollVer"},
          {resizer: true, width: 1},
          {view: "timeline", id: "timeline", scrollX:"scrollHor", scrollY:"scrollVer"},
          {view: "scrollbar", scroll: "y", id:"scrollVer"}
           ]
         },
        {view: "scrollbar", scroll: "x", id:"scrollHor", height:20}
     ]
};

gantt.init("gantt_here");
~~~


### Details

:::note
레이아웃 구성을 Gantt 초기화 전에 지정해야 합니다. 레이아웃에 변경을 가한 경우 [resetLayout](api/method/resetlayout.md)을 사용하여 새로고침해야 합니다.
:::

### Related API
- [resetLayout](api/method/resetlayout.md)

### Related Guides
- [Gantt Layout](guides/layout-config.md)
- [How-tos](guides/how-to.md#how-to-toggle-gridchart) (격자/차트를 토글하는 방법 읽기)
- [How-tos](guides/how-to.md#how-to-toggle-the-resource-view) (리소스 뷰를 토글하는 방법 읽기)
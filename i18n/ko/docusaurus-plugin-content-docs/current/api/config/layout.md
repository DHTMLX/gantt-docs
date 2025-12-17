---
sidebar_label: layout
title: layout config
description: "레이아웃 객체를 정의합니다."
---

# layout

### Description

@short: 레이아웃 객체를 정의합니다.

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
Gantt 차트를 초기화하기 전에 layout 설정을 해야 합니다. 나중에 layout을 업데이트할 경우, [resetLayout](api/method/resetlayout.md)를 사용하여 반드시 레이아웃을 새로 고쳐야 합니다. 
:::

### Related API
- [resetLayout](api/method/resetlayout.md)

### Related Guides
- [간트 레이아웃](guides/layout-config.md)
- [How-tos](guides/how-to.md#howtotogglegridchart) (grid/chart 전환 방법 참고)
- [How-tos](guides/how-to.md#howtotoggletheresourceview) (리소스 뷰 전환 방법 참고)


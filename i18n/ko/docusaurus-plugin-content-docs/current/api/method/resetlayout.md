---
sidebar_label: resetLayout
title: resetLayout method
description: "현재 레이아웃 구성에 따라 Gantt 레이아웃을 재구성합니다"
---

# resetLayout

### Description

@short: 현재 레이아웃 구성에 따라 Gantt 레이아웃을 재구성합니다

@signature: resetLayout: () =\> void

### Example

~~~jsx
gantt.init("gantt_here");

gantt.config.layout = {
    css: "gantt_container",
    rows: [
        {
            cols: [
                {view: "grid", scrollX: "scrollHor", scrollY: "scrollVer"},
                {resizer: true, width: 1},
                {view: "timeline", scrollX: "scrollHor", scrollY: "scrollVer"},
                {view: "scrollbar", id: "scrollVer"}
            ]
        },
        {view: "scrollbar", id: "scrollHor", height: 20}
    ]
};

gantt.resetLayout();
~~~

### Details

:::note
 이 메서드는 [addTaskLayer](api/method/addtasklayer.md) 및 [addLinkLayer](api/method/addlinklayer.md) 메서드를 사용하여 타임라인 영역에 추가된 사용자 정의 레이어를 모두 제거합니다. 
따라서 **gantt.resetLayout** 호출 후에는 이러한 사용자 정의 레이어를 다시 설정하여 페이지에 표시되도록 해야 합니다. 
:::

### Related API
- [layout](api/config/layout.md)

### Related Guides
- [간트 레이아웃](guides/layout-config.md)


---
sidebar_label: resetLayout
title: resetLayout 메서드
description: "레이아웃 구성의 현재 값을 사용하여 Gantt 레이아웃을 재구성합니다"
---

# resetLayout

### Description

@short: 레이아웃 구성의 현재 값을 사용하여 Gantt 레이아웃을 재구성합니다

@signature: resetLayout: () => void

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
이 메서드는 [addTaskLayer](api/method/addtasklayer.md) 및 [addLinkLayer](api/method/addlinklayer.md) 메서드를 통해 타임라인 영역에 추가된 사용자 정의 레이어를 제거합니다.
따라서 페이지에 사용자 정의 레이어가 표시되려면 **gantt.resetLayout** 메서드를 호출한 후에 이를 다시 정의해야 합니다.
:::

### Related API
- [layout](api/config/layout.md)

### Related Guides
- [간트 레이아웃](guides/layout-config.md)


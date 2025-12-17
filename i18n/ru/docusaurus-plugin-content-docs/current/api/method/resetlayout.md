---
sidebar_label: resetLayout
title: resetLayout method
description: "перестраивает layout Gantt на основе текущей конфигурации layout"
---

# resetLayout

### Description

@short: Перестраивает layout Gantt на основе текущей конфигурации layout

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
 Этот метод очищает любые кастомные слои, добавленные в область timeline с помощью методов [addTaskLayer](api/method/addtasklayer.md) и [addLinkLayer](api/method/addlinklayer.md). 
В результате, эти кастомные слои необходимо настроить заново после вызова **gantt.resetLayout**, чтобы они отображались на странице. 
:::

### Related API
- [layout](api/config/layout.md)

### Related Guides
- [Макет Gantt](guides/layout-config.md)


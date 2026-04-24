---
sidebar_label: resetLayout
title: Метод resetLayout
description: "Воссоздает раскладку Gantt, используя текущее значение конфигурации раскладки"
---

# resetLayout

### Description

@short: Воссоздает раскладку Gantt, используя текущее значение конфигурации раскладки

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
Этот метод удаляет пользовательские слои, добавленные в область таймлайна через методы [addTaskLayer](api/method/addtasklayer.md) и [addLinkLayer](api/method/addlinklayer.md). Следовательно, после вызова метода **gantt.resetLayout** необходимо заново определить эти слои, чтобы пользовательские слои отображались на странице.
:::

### Related API
- [layout](api/config/layout.md)

### Related Guides
- [Gantt Layout](guides/layout-config.md)
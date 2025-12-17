---
sidebar_label: layout
title: layout config
description: "определяет объект layout"
---

# layout

### Description

@short: Определяет объект layout

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
 Конфигурация layout должна быть задана до инициализации диаграммы Ганта. Если вы обновляете layout позже, обязательно выполните его обновление с помощью [resetLayout](api/method/resetlayout.md). 
:::

### Related API
- [resetLayout](api/method/resetlayout.md)

### Related Guides
- [Макет Gantt](guides/layout-config.md)
- [Решения](guides/how-to.md#howtotogglegridchart) (читайте, как переключать grid/chart)
- [Решения](guides/how-to.md#howtotoggletheresourceview) (читайте, как переключать ресурсный вид)


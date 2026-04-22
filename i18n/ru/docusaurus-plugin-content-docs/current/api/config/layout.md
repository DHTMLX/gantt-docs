---
sidebar_label: layout
title: конфигурация layout
description: "указывается объект layout"
---

# layout

### Description

@short: Указывает объект layout

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
Обратите внимание, что конфигурацию layout следует задавать до инициализации Gantt. Если вы внесёте изменения в layout, вам нужно обновить его с помощью [resetLayout](api/method/resetlayout.md). 
:::

### Related API
- [resetLayout](api/method/resetlayout.md)

### Related Guides
- [Gantt Layout](guides/layout-config.md)
- [How-tos](guides/how-to.md#how-to-toggle-gridchart) (прочитайте, как переключать grid/chart)
- [How-tos](guides/how-to.md#how-to-toggle-the-resource-view) (прочитайте, как переключать представление ресурсов)
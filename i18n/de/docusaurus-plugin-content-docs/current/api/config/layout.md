---
sidebar_label: layout
title: Layout-Konfiguration
description: "legt das Layout-Objekt fest"
---

# Layout

### Description

@short: Legt das Layout-Objekt fest

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
Beachten Sie, dass Sie die Layout-Konfiguration vor der Gantt-Initialisierung festlegen sollten. Wenn Sie Änderungen am Layout vornehmen, müssen Sie es mit [resetLayout](api/method/resetlayout.md) aktualisieren.
:::

### Related API
- [resetLayout](api/method/resetlayout.md)

### Related Guides
- [Gantt Layout](guides/layout-config.md)
- [How-tos](guides/how-to.md#how-to-toggle-gridchart) (read how to toggle grid/chart)
- [How-tos](guides/how-to.md#how-to-toggle-the-resource-view) (read how to toggle the resource view)
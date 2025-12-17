---
sidebar_label: layout
title: layout config
description: "definiert das layout-Objekt"
---

# layout

### Description

@short: Definiert das layout-Objekt

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
 Die layout-Konfiguration sollte vor der Initialisierung des Gantt-Diagramms gesetzt werden. Wenn Sie das layout später aktualisieren, stellen Sie sicher, dass Sie es mit [resetLayout](api/method/resetlayout.md) neu laden. 
:::

### Related API
- [resetLayout](api/method/resetlayout.md)

### Related Guides
- ["Gantt-Layout"](guides/layout-config.md)
- ["How-tos"](guides/how-to.md#howtotogglegridchart) (lesen Sie, wie man grid/chart umschaltet)
- ["How-tos"](guides/how-to.md#howtotoggletheresourceview) (lesen Sie, wie man die Ressourcenansicht umschaltet)


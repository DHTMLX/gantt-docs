---
sidebar_label: resetLayout
title: resetLayout method
description: "baut das Gantt-Layout basierend auf der aktuellen Layout-Konfiguration neu auf"
---

# resetLayout

### Description

@short: Baut das Gantt-Layout basierend auf der aktuellen Layout-Konfiguration neu auf

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
 Diese Methode entfernt alle benutzerdefinierten Layer, die mit den Methoden [addTaskLayer](api/method/addtasklayer.md) und [addLinkLayer](api/method/addlinklayer.md) im Timeline-Bereich hinzugefügt wurden. 
Daher müssen diese benutzerdefinierten Layer nach dem Aufruf von **gantt.resetLayout** erneut eingerichtet werden, damit sie auf der Seite angezeigt werden. 
:::

### Related API
- [layout](api/config/layout.md)

### Related Guides
- ["Gantt-Layout"](guides/layout-config.md)


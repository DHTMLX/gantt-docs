---
sidebar_label: resetLayout
title: resetLayout Methode
description: "erstellt das Gantt-Layout basierend auf dem aktuellen Wert der Layout-Konfiguration neu"
---

# resetLayout

### Description

@short: Baut das Gantt-Layout anhand des aktuellen Werts der Layout-Konfiguration neu

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
Diese Methode entfernt benutzerdefinierte Layer, die dem Timeline-Bereich über die Methoden [addTaskLayer](api/method/addtasklayer.md) und [addLinkLayer](api/method/addlinklayer.md) hinzugefügt wurden. 
Daher müssen Sie diese nach dem Aufruf der Methode **gantt.resetLayout** neu definieren, damit benutzerdefinierte Layer auf der Seite angezeigt werden.
:::

### Related API
- [layout](api/config/layout.md)

### Related Guides
- [Gantt Layout](guides/layout-config.md)
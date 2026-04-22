---
sidebar_label: rtl
title: RTL-Konfiguration
description: "Schaltet Gantt in den Rechts-nach-Links-Modus um"
---

# RTL

### Description

@short: Umschaltet Gantt in den Rechts-nach-Links-Modus

@signature: rtl: boolean

### Example

~~~jsx
gantt.config.rtl = true;
gantt.config.layout = {
    css: "gantt_container",
    rows: [
        {
            cols: [
                {view: "scrollbar", id: "scrollVer"},
                {view: "timeline", scrollX: "scrollHor", scrollY: "scrollVer"},
                {resizer: true, width: 1},
                {view: "grid", scrollX: "scrollHor", scrollY: "scrollVer"}
            ]
        },
        {view: "scrollbar", id: "scrollHor", height: 20}
    ]
};
gantt.init("gantt_here");
~~~


**Standardwert:** false

### Related samples
- [Gantt rechts-nach-links](https://docs.dhtmlx.com/gantt/samples/10_layout/04_rtl.html)

### Details

Wenn die Konfigurationsoption auf **true** gesetzt wird, ändert sich die Richtung der Zeitachse in der Timeline und die Reihenfolge der Zeilen im Grid zu Rechts-nach-Links.

Es wirkt sich nicht auf das [Layout](api/config/layout.md) des Gantt aus, daher müssen Sie das Layout neu definieren, um die Positionen von Grid und Timeline zu tauschen.

Vielleicht möchten Sie auch [die Richtung des Textes für Labels, die im Gantt verwendet werden, festlegen](https://developer.mozilla.org/en-US/docs/Web/CSS/direction).

### Related Guides
- [RTL (Right-to-left) Modus](guides/rtl-mode.md)
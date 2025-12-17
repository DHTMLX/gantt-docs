---
sidebar_label: rtl
title: rtl config
description: "wechselt Gantt in den Rechts-nach-Links-Modus"
---

# rtl

### Description

@short: Wechselt Gantt in den Rechts-nach-Links-Modus

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

**Default value:** false

### Related samples
- [Right to left gantt](https://docs.dhtmlx.com/gantt/samples/10_layout/04_rtl.html)

### Details

Wenn diese Option durch Setzen auf **true** aktiviert wird, ändert sich die Richtung der Zeitskala der timeline und die Reihenfolge der Zeilen im grid auf rechts-nach-links.

Diese Einstellung aktualisiert die Gantt-Layout-Konfiguration nicht automatisch, daher müssen Sie das Layout selbst anpassen, um die Positionen von grid und timeline zu tauschen.

Sie sollten auch die [Textausrichtung für Labels im Gantt anpassen](https://developer.mozilla.org/en-US/docs/Web/CSS/direction).

### Related Guides
- ["RTL (Rechts-nach-links) Modus"](guides/rtl-mode.md)

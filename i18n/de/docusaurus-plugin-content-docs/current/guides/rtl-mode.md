---
title: "RTL-Modus (Rechts-nach-Links-Modus)"
sidebar_label: "RTL-Modus (Rechts-nach-Links-Modus)"
---

# RTL-Modus (Rechts-nach-Links-Modus)

![rtl_mode](/img/rtl_mode.png)

Sie können das Gantt-Diagramm im Rechts-nach-Links-Modus verwenden, der über die Konfigurationsoption [rtl](api/config/rtl.md) aktiviert wird. Wenn Sie ihn auf *true* setzen, ändert sich die Richtung der Zeitachse im Zeitstrahl und die Reihenfolge der Zeilen im Raster von rechts nach links.

~~~js
gantt.config.rtl = true;
~~~

Das Aktivieren des RTL-Modus wirkt sich nicht auf das [gantt.config.layout](api/config/layout.md) des Gantt aus, daher müssen Sie es neu definieren, um die Positionen des Grids und der Timeline zu tauschen. So wird es im Folgenden gemacht:

~~~js
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
~~~

[Gantt rechts-nach-links](https://docs.dhtmlx.com/gantt/samples/10_layout/04_rtl.html)

Sie möchten außerdem vielleicht [die Textausrichtung für Beschriftungen im Gantt festlegen](https://developer.mozilla.org/en-US/docs/Web/CSS/direction).
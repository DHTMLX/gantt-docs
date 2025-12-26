---
title: "RTL (Rechts-nach-links) Modus"
sidebar_label: "RTL (Rechts-nach-links) Modus"
---

# RTL (Rechts-nach-links) Modus

![rtl_mode](/img/rtl_mode.png)

Das Gantt-Diagramm unterstützt einen Rechts-nach-links-Modus (RTL), der über die Konfigurationsoption [rtl](api/config/rtl.md) aktiviert werden kann. 
Wenn diese Option auf *true* gesetzt ist, ändert sich die Richtung der Zeitskala im Zeitstrahl, und die Reihenfolge der Zeilen im Grid wird umgekehrt, sodass sie von rechts nach links verlaufen.

~~~js
gantt.config.rtl = true;
~~~

Das Aktivieren des RTL-Modus aktualisiert nicht automatisch die [gantt.config.layout](api/config/layout.md), daher muss das Layout angepasst werden, um die Positionen von Grid und Timeline zu tauschen. Dies kann folgendermaßen umgesetzt werden:

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


[Right to left gantt](https://docs.dhtmlx.com/gantt/samples/10_layout/04_rtl.html)


Es kann außerdem sinnvoll sein, [die Textausrichtung für Beschriftungen im Gantt-Diagramm anzupassen](https://developer.mozilla.org/en-US/docs/Web/CSS/direction).


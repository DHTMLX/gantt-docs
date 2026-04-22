---
title: "RTL (Right-to-left) режим"
sidebar_label: "RTL (Right-to-left) режим"
---

# RTL (Right-to-left) режим

![rtl_mode](/img/rtl_mode.png)

Вы можете использовать диаграмму Gantt в режиме справа налево, который включается через параметр конфигурации [rtl](api/config/rtl.md). Установка значения *true* изменит направление временной шкалы на таймлайне и порядок строк в гриде на режим справа налево.

~~~js
gantt.config.rtl = true;
~~~

Включение rtl-режима не повлияет на разметку Gantt ([gantt.config.layout](api/config/layout.md)), поэтому вам нужно будет переопределить её, чтобы поменять местами позиции грид и таймлайн. Это делается следующим образом:

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


[Gantt справа налево](https://docs.dhtmlx.com/gantt/samples/10_layout/04_rtl.html)


Возможно, вам также потребуется [установить направление текста для меток, используемых в Gantt](https://developer.mozilla.org/en-US/docs/Web/CSS/direction).
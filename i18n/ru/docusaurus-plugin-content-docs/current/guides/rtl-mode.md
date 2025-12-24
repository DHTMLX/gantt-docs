---
title: "RTL (Right-to-left) режим"
sidebar_label: "RTL (Right-to-left) режим"
---

# RTL (Right-to-left) режим


![rtl_mode](/img/rtl_mode.png)

Gantt поддерживает режим отображения справа налево (RTL), который можно включить с помощью опции конфигурации [rtl](api/config/rtl.md). 
Если установить значение *true*, направление временной шкалы на диаграмме и порядок строк в гриде изменятся, чтобы отображаться справа налево.

~~~js
gantt.config.rtl = true;
~~~

Включение режима rtl не обновляет автоматически [gantt.config.layout](api/config/layout.md), поэтому необходимо вручную изменить layout, чтобы поменять местами грид и временную шкалу. Это можно сделать следующим образом:

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


Также может быть полезно [изменить направление текста для подписей в Gantt](https://developer.mozilla.org/en-US/docs/Web/CSS/direction).


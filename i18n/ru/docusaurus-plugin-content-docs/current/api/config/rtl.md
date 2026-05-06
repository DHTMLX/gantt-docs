---
sidebar_label: rtl
title: rtl config
description: "Переключает Gantt в режим справа налево"
---

# rtl

### Description

@short: Переключает Gantt в режим справа налево

@signature: rtl: boolean

### Example

~~~ jsx
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

**Значение по умолчанию:** false

### Related samples
- [Gantt справа налево](https://docs.dhtmlx.com/gantt/samples/10_layout/04_rtl.html)

### Details

Установка этой опции конфигурации в значение **true** изменит направление временной шкалы во timeline и порядок строк в grid на справа налево.

Это не влияет на [layout](api/config/layout.md) диаграммы Gantt, поэтому вам нужно заново определить макет, чтобы поменять местами позиции grid и timeline.

Возможно, вам также захочется [установить направление текста для меток, используемых в gantt](https://developer.mozilla.org/en-US/docs/Web/CSS/direction).

### Related Guides
- [RTL (Right-to-left) режим](guides/rtl-mode.md)
---
sidebar_label: rtl
title: rtl config
description: "переключает gantt в режим справа налево"
---

# rtl

### Description

@short: Переключает gantt в режим справа налево

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

Включение этой опции установкой значения **true** переключит направление временной шкалы timeline и порядок строк в grid на режим справа налево.

Данная настройка не обновляет автоматически конфигурацию layout gantt, поэтому необходимо самостоятельно скорректировать layout, чтобы поменять местами позиции grid и timeline.

Также может потребоваться [настроить направление текста для подписей в gantt](https://developer.mozilla.org/en-US/docs/Web/CSS/direction).

### Related Guides
- [RTL (Right-to-left) режим](guides/rtl-mode.md)

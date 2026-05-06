---
sidebar_label: render
title: метод render
description: "отрисовывает всю диаграмму Ганта"
---

# render

### Description

@short: Отрисовывает всю диаграмму Ганта

@signature: render: () => void

### Example

~~~jsx
gantt.config.scales = [
    {unit: "month", step: 1, format: "%F, %Y"},
    {unit: "day", step: 1, format: "%j, %D"}
];
gantt.init("gantt_here");
 
gantt.config.scales = [
    {unit: "day", step: 1, format: "%j, %D"}
];
gantt.render();
~~~


### Related samples
- [Динамические масштабы](https://docs.dhtmlx.com/gantt/samples/03_scales/05_dynamic_scales.html)

### Details

Вы можете использовать метод [batchUpdate](api/method/batchupdate.md) для обновления сразу нескольких задач и связей за одну повторную перерисовку, вместо выполнения нескольких обновлений с несколькими повторными перерисовками.

### Related Guides
- [Динамическая настройка параметров масштаба](guides/dynamic-scale.md)
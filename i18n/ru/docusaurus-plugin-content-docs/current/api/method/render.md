---
sidebar_label: render
title: render method
description: "рисует весь Gantt chart"
---

# render

### Description

@short: Рисует весь Gantt chart

@signature: render: () =\> void

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
- [Dynamic scales](https://docs.dhtmlx.com/gantt/samples/03_scales/05_dynamic_scales.html)

### Details

Метод [batchUpdate](api/method/batchupdate.md) позволяет обновлять несколько задач или связей одновременно с одним вызовом render, избегая необходимости в множественных обновлениях и render-ах.

### Related Guides
- [Динамическое изменение настроек масштаба](guides/dynamic-scale.md)


---
sidebar_label: render
title: render method
description: "zeichnet das gesamte Gantt-Diagramm"
---

# render

### Description

@short: Zeichnet das gesamte Gantt-Diagramm

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

Die [batchUpdate](api/method/batchupdate.md) Methode ermöglicht es, mehrere Tasks oder Links gleichzeitig zu aktualisieren, indem ein einzelnes Re-render durchgeführt wird. Dadurch wird vermieden, dass mehrere Updates und renders notwendig sind.

### Related Guides
- ["Dynamische Änderung der Skalierungseinstellungen"](guides/dynamic-scale.md)


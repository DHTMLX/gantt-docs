---
sidebar_label: render
title: render method
description: "renders the whole Gantt chart"
---

# render

### Description

@short: Renders the whole Gantt chart

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

You can use the [batchUpdate](api/method/batchupdate.md) method to update multiple tasks/links at once with a single re-rendering instead of making multiple updates with multiple re-renderings.

### Related Guides
- [Dynamic Change of Scale Settings](guides/dynamic-scale.md)


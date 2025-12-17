---
sidebar_label: render
title: render method
description: "전체 간트 차트를 그립니다."
---

# render

### Description

@short: 전체 간트 차트를 그립니다.

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

[batchUpdate](api/method/batchupdate.md) 메서드는 여러 작업이나 링크를 한 번에 업데이트하고 단일 render를 수행할 수 있게 하여, 여러 번의 업데이트와 render를 피할 수 있도록 합니다.

### Related Guides
- [스케일 설정의 동적 변경](guides/dynamic-scale.md)


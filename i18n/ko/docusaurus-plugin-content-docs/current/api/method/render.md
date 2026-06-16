---
sidebar_label: render
title: render method
description: "전체 Gantt 차트를 렌더링합니다."
---

# render

### Description

@short: 전체 Gantt 차트를 렌더링합니다.

@signature: render: () =\> void

### Example

~~~jsx
gantt.config.scales = [
    { unit: "month", step: 1, format: "%F, %Y" },
    { unit: "day", step: 1, format: "%j, %D" }
];
gantt.init("gantt_here");

gantt.config.scales = [
    { unit: "day", step: 1, format: "%j, %D" }
];
gantt.render();
~~~

### Related samples
- [Dynamic scales](https://docs.dhtmlx.com/gantt/samples/03_scales/05_dynamic_scales.html)

### Details

여러 작업과 링크를 한 번의 재렌더링으로 한꺼번에 업데이트하려면 [`batchUpdate()`](api/method/batchupdate.md) 메서드를 사용할 수 있습니다. 이는 여러 번의 업데이트와 재렌더링을 수행하는 대신 한 번의 재렌더링으로 처리합니다.

### Related Guides
- [스케일 설정의 동적 변경](guides/dynamic-scale.md)


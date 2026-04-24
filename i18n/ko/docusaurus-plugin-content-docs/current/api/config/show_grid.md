---
sidebar_label: show_grid
title: show_grid config
description: "Gantt 차트의 그리드 영역을 표시합니다"
---

# show_grid

### Description

@short: Gantt 차트의 그리드 영역을 표시합니다

@signature: show_grid: boolean

### Example

~~~jsx
// Gantt 차트의 그리드 영역을 숨깁니다.
gantt.config.show_grid = false;
gantt.init("gantt_here");
~~~

**Default value:** true

### Details

*gantt.config.show_grid = false* 는 그리드 영역을 빠르게 숨길 필요가 있을 때 유용하며, 반면 *gantt.config.show_chart = false* 는 타임라인 영역을 숨기는 데 사용됩니다. 간단한 레이아웃에서 작업하는 경우, 이 두 옵션을 함께 사용하는 것은 피하는 것이 좋습니다. 그렇지 않으면 예기치 않은 결과가 발생할 수 있습니다. 대신, 레이아웃 구성을 [gantt.config.layout](api/config/layout.md) 를 통해 변경해야 합니다.

:::note
샘플: [Gantt. Toggle grid (custom layout) ](https://snippet.dhtmlx.com/omk98l0x)
:::

### Related API
- [show_chart](api/config/show_chart.md)

### Related Guides
- [How-tos](guides/how-to.md#how-to-toggle-gridchart)
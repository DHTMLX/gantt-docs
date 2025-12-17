---
sidebar_label: show_grid
title: show_grid config
description: "Gantt 차트의 그리드 영역 표시 여부를 제어합니다."
---

# show_grid

### Description

@short: Gantt 차트의 그리드 영역 표시 여부를 제어합니다.

@signature: show_grid: boolean

### Example

~~~jsx
// Gantt 차트의 그리드 영역을 숨깁니다.
gantt.config.show_grid = false;
gantt.init("gantt_here");
~~~

**Default value:** true (그리드가 표시됨)

### Details

*gantt.config.show_grid = false*로 설정하면 Gantt 차트의 그리드 영역을 빠르게 숨길 수 있습니다. 반면에 *gantt.config.show_chart = false*는 타임라인 영역을 숨깁니다. 단순한 레이아웃을 사용할 때는 이 두 옵션을 동시에 사용하는 것을 피하는 것이 좋습니다. 그렇지 않으면 예상치 못한 동작이 발생할 수 있습니다. 대신 [gantt.config.layout](api/config/layout.md)를 통해 레이아웃 구성을 조정하는 방법을 고려하세요.

**show_grid** 옵션은 [기본 레이아웃 구성](guides/layout-config.md#defaultlayout)을 [gantt.config.layout](api/config/layout.md)으로 변경하지 않은 경우에만 작동합니다. 커스텀 레이아웃을 사용 중이라면, 여러 개의 커스텀 구성을 만들어 그리드를 표시하거나 숨길 때마다 전환해야 합니다.<br> 

:::note

**Related example:** [Gantt. Toggle grid (custom layout)](https://snippet.dhtmlx.com/omk98l0x)

:::

### Related API
- [show_chart](api/config/show_chart.md)

### Related Guides
- [How-tos](guides/how-to.md#howtotogglegridchart)


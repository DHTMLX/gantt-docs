---
sidebar_label: show_chart
title: show_chart 설정
description: "Gantt 차트의 차트(타임라인) 영역을 표시합니다."
---

# show_chart

### Description

@short: Gantt 차트의 차트(타임라인) 영역을 표시합니다

@signature: show_chart: boolean

### Example

~~~jsx
//hides the timeline area of the Gantt chart
gantt.config.show_chart = false;
gantt.init("gantt_here");
~~~

**Default value:** true (차트가 보입니다)

### Details

*gantt.config.show_chart = false*은 Gantt 차트의 타임라인 영역을 빠르게 숨겨야 할 때 유용합니다. 반면 *gantt.config.show_grid = false*는 그리드 영역을 숨기기 위한 용도입니다. 간단한 레이아웃으로 작업하는 경우, 이 두 옵션을 함께 사용하는 것은 예기치 않은 결과를 초래할 수 있으므로 피하는 것이 좋습니다. 대신 레이아웃 구성을 [gantt.config.layout](api/config/layout.md)로 변경해야 합니다.

The **show_chart** config will only work if you have not changed [the default configuration of the layout](guides/layout-config.md#default-layout) via [gantt.config.layout](api/config/layout.md). In case you have configured a custom layout, then you have to create several custom configurations and to switch between them to hide/show the chart. 

:::note
예시: [Gantt. Toggle timeline (custom layout) ](https://snippet.dhtmlx.com/aukjyqc8)
:::

### Related API
- [show_grid](api/config/show_grid.md)

### Related Guides
- [How-tos](guides/how-to.md#how-to-toggle-gridchart)
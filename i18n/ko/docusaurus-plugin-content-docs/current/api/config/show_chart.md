---
sidebar_label: show_chart
title: show_chart config
description: "간트 차트에서 타임라인 섹션의 표시 여부를 제어합니다."
---

# show_chart

### Description

@short: 간트 차트에서 타임라인 섹션의 표시 여부를 제어합니다.

@signature: show_chart: boolean

### Example

~~~jsx
// 간트 차트의 타임라인 섹션을 숨깁니다.
gantt.config.show_chart = false;
gantt.init("gantt_here");
~~~

**Default value:** true (타임라인 섹션이 표시됩니다)

### Details

*gantt.config.show_chart = false* 설정은 간트 차트의 타임라인 부분을 빠르게 숨기는 방법이며, *gantt.config.show_grid = false* 는 그리드 섹션을 숨깁니다. 단순한 레이아웃을 사용할 때는 두 옵션을 동시에 사용하지 않는 것이 좋습니다. 동시에 사용 시 예상치 못한 동작이 발생할 수 있기 때문입니다. 대신, [gantt.config.layout](api/config/layout.md)을 통해 레이아웃 구성을 조정하는 것이 권장됩니다.

**show_chart** 옵션은 레이아웃이 [기본 구성](guides/layout-config.md#defaultlayout) 상태이고 [gantt.config.layout](api/config/layout.md)을 통해 수정되지 않은 경우에만 작동합니다. 커스텀 레이아웃을 사용 중이라면, 여러 개의 커스텀 구성을 정의하고 전환하여 차트의 표시 여부를 제어해야 합니다.<br>

:::note

**Related example:** [Gantt. Toggle timeline (custom layout)](https://snippet.dhtmlx.com/aukjyqc8)

:::

### Related API
- [show_grid](api/config/show_grid.md)

### Related Guides
- [How-tos](guides/how-to.md#howtotogglegridchart)


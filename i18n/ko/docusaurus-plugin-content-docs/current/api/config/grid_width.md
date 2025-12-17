---
sidebar_label: grid_width
title: grid_width config
description: "그리드의 너비를 설정합니다"
---

# grid_width

### Description

@short: 그리드의 너비를 설정합니다

@signature: grid_width: number

### Example

~~~jsx
gantt.config.grid_width = 400;

gantt.init("gantt_here");
~~~

**Default value:** 360

### Details

그리드 열의 너비는 두 가지 요소에 따라 결정됩니다: 각 열의 [width](api/config/columns.md)와 그리드 전체의 너비입니다. 열 너비들의 총합이 그리드 너비와 일치하지 않을 경우, Gantt는 이 값들 중 하나를 조정합니다.

- gantt가 [gantt.init()](api/method/init.md)를 사용해 초기화될 때는 열의 [width](api/config/columns.md)가 우선합니다.
- gantt가 [gantt.render()](api/method/render.md)를 사용해 렌더링될 때는 **grid_width**가 우선합니다. <br> 

:::note

**Related example:** [Adjustment of column width](https://snippet.dhtmlx.com/5/36b6baa89)

:::
- [gantt.init()](api/method/init.md)로 gantt를 초기화하고 열 너비가 지정되지 않았거나 **'*'**로 설정된 경우에는 **grid_width**가 우선합니다. <br>

:::note

**Related example:** [Adjusting column width](https://snippet.dhtmlx.com/5/a35378204)

:::


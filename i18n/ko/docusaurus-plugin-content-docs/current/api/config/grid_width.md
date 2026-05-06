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

그리드 열의 너비는 두 가지 속성에 따라 결정됩니다: 열의 [width](api/config/columns.md)와 그리드의 너비. 열 너비의 합계가 그리드 너비와 같지 않으면, Gantt는 두 매개변수 중 하나를 변경합니다.

- gantt를 [gantt.init()](api/method/init.md)로 초기화할 때, 열의 [width](api/config/columns.md)가 우선 순위입니다.
- gantt를 [gantt.render()](api/method/render.md)로 렌더링할 때, **grid_width**가 우선 순위입니다.

:::note
샘플: [Adjustment of column width ](https://snippet.dhtmlx.com/5/36b6baa89)
:::

- gantt를 [gantt.init()](api/method/init.md)로 초기화할 때, 열의 너비가 명시되지 않았거나 **'*'**로 설정된 경우에도, **grid_width**가 우선 순위입니다.

:::note
샘플: [Adjusting column width ](https://snippet.dhtmlx.com/5/a35378204)
:::
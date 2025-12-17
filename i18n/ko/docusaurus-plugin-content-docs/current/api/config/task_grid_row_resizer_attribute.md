---
sidebar_label: task_grid_row_resizer_attribute
title: task_grid_row_resizer_attribute config
description: "그리드 행의 리사이저 DOM 요소에 사용되는 속성 이름을 정의하며, 해당 행의 인덱스를 나타냅니다."
---

# task_grid_row_resizer_attribute

### Description

@short: 그리드 행의 리사이저 DOM 요소에 사용되는 속성 이름을 정의하며, 해당 행의 인덱스를 나타냅니다.

@signature: task_grid_row_resizer_attribute: string

### Example

~~~jsx
gantt.config.task_grid_row_resizer_attribute = "data-grid-row-index"
~~~

**Default value:** "data-row-index"

### Related samples
- [Resizable rows in grid](https://docs.dhtmlx.com/gantt/samples/02_extensions/28_row_resize.html)

### Details

:::note
 이 설정은 [gantt.config.resize_rows](api/config/resize_rows.md)가 활성화된 경우에 적용됩니다. 
:::

### Related API
- [resize_rows](api/config/resize_rows.md)

### Related Guides
- [그리드에서 행 크기 조정하기](guides/resizing-rows.md)


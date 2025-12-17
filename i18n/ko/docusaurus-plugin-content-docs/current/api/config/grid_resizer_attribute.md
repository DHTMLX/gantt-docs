---
sidebar_label: grid_resizer_attribute
title: grid_resizer_attribute config
description: "그리드 리사이저의 DOM 요소에 사용할 속성 이름을 지정합니다"
---

# grid_resizer_attribute

### Description

@short: 그리드 리사이저의 DOM 요소에 사용할 속성 이름을 지정합니다

### Example

~~~jsx
gantt.config.grid_resizer_attribute = "gridresizer";
~~~

**Default value:** "grid_resizer"

### Details

:::note
이 속성은 더 이상 사용되지 않습니다. 대신 [grid_resizer_column_attribute](api/config/grid_resizer_column_attribute.md)를 사용하는 것이 권장됩니다: 
:::

~~~js
gantt.config.grid_resizer_column_attribute = "data-column-index";
~~~

### Related API
- [grid_resizer_column_attribute](api/config/grid_resizer_column_attribute.md)
- [grid_resize](api/config/grid_resize.md)


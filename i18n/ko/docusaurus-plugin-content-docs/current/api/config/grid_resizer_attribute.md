--- 
sidebar_label: grid_resizer_attribute
title: grid_resizer_attribute config
description: "grid resizer의 DOM 요소 속성 이름을 설정합니다"
---

# grid_resizer_attribute

:::warning
이 속성은 더 이상 사용되지 않습니다.
:::

### Description

@short: grid resizer의 DOM 요소 속성 이름을 설정합니다

### Example

~~~jsx
gantt.config.grid_resizer_attribute = "gridresizer";
~~~

**Default value:** "grid_resizer"

### Details

:::note
대신 [grid_resizer_column_attribute](api/config/grid_resizer_column_attribute.md)를 사용하십시오:
:::

~~~js
gantt.config.grid_resizer_column_attribute = "data-column-index";
~~~

### Related API
- [grid_resizer_column_attribute](api/config/grid_resizer_column_attribute.md)
- [grid_resize](api/config/grid_resize.md)
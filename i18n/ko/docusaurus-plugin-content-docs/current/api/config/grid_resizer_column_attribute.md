---
sidebar_label: grid_resizer_column_attribute
title: grid_resizer_column_attribute config
description: "칼럼 리사이저의 DOM 요소 속성 이름을 설정합니다. 이 속성은 열의 인덱스를 나타냅니다"
---

# grid_resizer_column_attribute

:::info
이 기능은 PRO 에디션에서만 사용할 수 있습니다.
:::

### Description

@short: 칼럼 리사이저의 DOM 요소 속성 이름을 설정합니다. 이 속성은 열의 인덱스를 나타냅니다

@signature: grid_resizer_column_attribute: string

### Example

~~~jsx
gantt.config.grid_resizer_column_attribute = "data-column-index";
~~~

**기본값:** "data-column-index"

### Related API
- [grid_resize](api/config/grid_resize.md)
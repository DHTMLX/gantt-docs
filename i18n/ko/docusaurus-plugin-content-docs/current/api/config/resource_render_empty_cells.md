---
sidebar_label: resource_render_empty_cells
title: resource_render_empty_cells 구성
description: "자원 타임라인에 미할당 셀에 대해 요소를 렌더링하고 템플릿을 호출하도록 지시합니다"
---

# resource_render_empty_cells

:::info
이 기능은 PRO 에디션에서만 이용 가능합니다.
:::

### Description

@short: 리소스 타임라인이 비할당 셀에 대해 요소를 렌더링하고 템플릿을 호출하도록 지시합니다

@signature: resource_render_empty_cells: boolean

### Example

~~~jsx
gantt.config.resource_render_empty_cells = true;
~~~

**Default value:** false

### Details

기본적으로, 리소스 타임라인은 할당된 작업이 없는 셀에 대해 [resource_cell_value](api/template/resource_cell_value.md)와 [resource_cell_class](api/template/resource_cell_class.md) 템플릿을 호출하지 않습니다.

이 옵션이 활성화되면, 리소스 타임라인의 모든 셀에 대해 템플릿이 호출됩니다.

### Related API
- [resource_cell_class](api/template/resource_cell_class.md)
- [resource_cell_value](api/template/resource_cell_value.md)

### Related Guides
- [Resource Management](guides/resource-management.md)
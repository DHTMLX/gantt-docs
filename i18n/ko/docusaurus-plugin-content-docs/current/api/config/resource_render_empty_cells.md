---
sidebar_label: resource_render_empty_cells
title: resource_render_empty_cells config
description: "리소스 타임라인에서 작업이 할당되지 않은 셀에도 요소를 렌더링하고 템플릿을 사용할 수 있게 합니다."
---

# resource_render_empty_cells
:::info
이 기능은 PRO 에디션에서만 사용할 수 있습니다. 
:::
### Description

@short: 리소스 타임라인에서 작업이 할당되지 않은 셀에도 요소를 렌더링하고 템플릿을 사용할 수 있게 합니다.

@signature: resource_render_empty_cells: boolean

### Example

~~~jsx
gantt.config.resource_render_empty_cells = true;
~~~

**Default value:** false

### Details

일반적으로 리소스 타임라인은 작업이 할당되지 않은 셀에 대해 [resource_cell_value](api/template/resource_cell_value.md) 및 [resource_cell_class](api/template/resource_cell_class.md) 템플릿을 호출하지 않습니다.

이 옵션을 켜면 작업 할당 여부와 관계없이 리소스 타임라인의 모든 셀에 템플릿이 적용됩니다.

### Related API
- [resource_cell_class](api/template/resource_cell_class.md)
- [resource_cell_value](api/template/resource_cell_value.md)

### Related Guides
- [리소스 관리](guides/resource-management.md)


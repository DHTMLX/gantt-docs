---
sidebar_label: resource_cell_class
title: resource_cell_class template
description: "리소스 타임라인 뷰의 셀에 적용할 CSS 클래스 이름을 정의합니다."
---

# resource_cell_class
:::info
이 기능은 PRO 에디션에서만 사용할 수 있습니다. 
:::
### Description

@short: 리소스 타임라인 뷰의 셀에 적용할 CSS 클래스 이름을 정의합니다.

@signature: resource_cell_class: (start_date: Date, end_date: Date, resource: any, tasks: Array\<Task\>, assignments: any[]) =\> string | void;

### Parameters

- `start_date` - (required) *Date* - 스케일 셀의 시작 날짜  
- `end_date` - (required) *Date* - 스케일 셀의 종료 날짜
- `resource` - (required) *object* - 리소스 객체
- `tasks` - (required) *Array* - &lt;Task&gt;        해당 셀의 시작 및 종료 날짜와 겹치는 지정된 리소스에 할당된 작업 목록
- `assignments` - (required) *array* - 작업의 지정된 시작 및 종료 날짜와 연결된 리소스 할당 목록

### Returns
- ` className` - (string | void) - 셀 엘리먼트의 className 속성에 추가할 문자열

### Example

~~~jsx
gantt.templates.resource_cell_class = function(start_date, end_date, resource, tasks,
    assignments){
    if (tasks.length <= 1) {
        return "workday_ok";
    } else {
        return "workday_over";
    }
};
~~~

### Related samples
- [Resource load diagram](https://docs.dhtmlx.com/gantt/samples/11_resources/04_resource_usage_diagram.html)
- [Templates of the Resource diagram](https://docs.dhtmlx.com/gantt/samples/11_resources/05_resource_usage_templates.html)
- [Assign multiple owners to a task](https://docs.dhtmlx.com/gantt/samples/11_resources/06_assign_multiple_owners.html)
- [Work and material resources](https://docs.dhtmlx.com/gantt/samples/11_resources/12_work_and_material_resources.html)

### Details

:::note
 "assignments" 파라미터는 [process_resource_assignments](api/config/process_resource_assignments.md) 설정이 활성화된 경우에만 제공됩니다. 
:::

- 리소스 타임라인의 셀에 적용할 CSS 클래스 이름을 제어합니다.
- 리소스 타임라인은 [resource_property](api/config/resource_property.md)에 정의된 속성을 기준으로 작업과 리소스를 연결합니다.
- 작업이 없는 셀에는 이 템플릿이 호출되지 않으며, [resource_render_empty_cells](api/config/resource_render_empty_cells.md)가 활성화된 경우에만 호출됩니다.
- [프로젝트 타입](api/config/types.md)의 작업은 제외되며 `tasks` 파라미터에 포함되지 않습니다.

### Related API
- [resource_property](api/config/resource_property.md)
- [resource_render_empty_cells](api/config/resource_render_empty_cells.md)
- [resource_cell_value](api/template/resource_cell_value.md)
- [process_resource_assignments](api/config/process_resource_assignments.md)

### Related Guides
- [리소스 관리](guides/resource-management.md)

### Change log
- **assignments** 파라미터는 v7.1에서 도입되었습니다.


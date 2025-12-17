---
sidebar_label: resource_cell_value
title: resource_cell_value template
description: "리소스 타임라인 셀의 HTML 콘텐츠를 설정합니다"
---

# resource_cell_value
:::info
이 기능은 PRO 에디션에서만 사용할 수 있습니다. 
:::
### Description

@short: 리소스 타임라인 셀의 HTML 콘텐츠를 설정합니다

@signature: resource_cell_value: (start_date: Date, end_date: Date, resource: any, tasks: Array\<Task\>, assignments: any[]) =\> string | number | void;

### Parameters

- `start_date` - (required) *Date* - 스케일 셀의 시작 날짜  
- `end_date` - (required) *Date* - 스케일 셀의 종료 날짜
- `resource` - (required) *object* - 리소스 객체
- `tasks` - (required) *Array* - &lt;Task&gt;            셀의 시작/종료 날짜와 겹치는 지정된 리소스에 할당된 작업들
- `assignments` - (required) *array* - 작업의 지정된 시작/종료 날짜에 할당된 리소스 할당 정보

### Returns
- ` html` - (string | number | void) - 셀의 innerHTML에 삽입될 HTML 문자열

### Example

~~~jsx
gantt.templates.resource_cell_value = function(start_date, end_date, resource, tasks,
    assignments){
    return "<div>" + tasks.length * 8 + "</div>";
};
~~~

### Related samples
- [Resource load diagram](https://docs.dhtmlx.com/gantt/samples/11_resources/04_resource_usage_diagram.html)
- [Templates of the Resource diagram](https://docs.dhtmlx.com/gantt/samples/11_resources/05_resource_usage_templates.html)
- [Assign multiple owners to a task](https://docs.dhtmlx.com/gantt/samples/11_resources/06_assign_multiple_owners.html)
- [Work and material resources](https://docs.dhtmlx.com/gantt/samples/11_resources/12_work_and_material_resources.html)

### Details


:::note
 "assignments" 인수는 [process_resource_assignments](api/config/process_resource_assignments.md) 설정이 활성화된 경우에만 제공됩니다. 
:::

- 리소스 타임라인 내 셀의 HTML 콘텐츠를 설정합니다.
- 리소스 타임라인은 작업 객체의 [resource_property](api/config/resource_property.md) 속성을 사용하여 작업과 리소스를 연결합니다.
- 작업이 없는 셀에 대해서는 [resource_render_empty_cells](api/config/resource_render_empty_cells.md)가 활성화되지 않은 한 이 템플릿이 호출되지 않습니다.
- [프로젝트 타입](api/config/types.md)의 작업은 제외되며 `tasks` 인수로 전달되지 않습니다.

### Related API
- [resource_property](api/config/resource_property.md)
- [resource_render_empty_cells](api/config/resource_render_empty_cells.md)
- [resource_cell_class](api/template/resource_cell_class.md)
- [process_resource_assignments](api/config/process_resource_assignments.md)

### Related Guides
- [리소스 관리](guides/resource-management.md)

### Change log
- **assignments** 매개변수는 v7.1에서 추가되었습니다


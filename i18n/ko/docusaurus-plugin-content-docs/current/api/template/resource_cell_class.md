---
sidebar_label: resource_cell_class
title: resource_cell_class 템플릿
description: "자원 타임라인 셀의 셀에 적용되는 CSS 클래스 이름을 정의합니다"
---

# resource_cell_class
:::info
이 기능은 PRO 에디션에서만 사용 가능합니다.
:::
### Description

@short: 자원 타임라인 셀의 셀에 적용되는 CSS 클래스 이름을 정의합니다

@signature: resource_cell_class: (start_date: Date, end_date: Date, resource: any, tasks: Array\<Task\>, assignments: any[]) => string | void;

### Parameters

- `start_date` - (필수) *Date* - 스케일 셀의 시작 날짜  
- `end_date` - (필수) *Date* - 스케일 셀의 종료 날짜
- `resource` - (필수) *object* - 자원 객체
- `tasks` - (필수) *Array* - &lt;Task&gt;        지정된 자원에 할당되고 셀의 시작/종료 날짜와 겹치는 작업들
- `assignments` - (필수) *배열* - 특정 작업의 시작/종료 날짜에 할당된 자원 할당들

### Returns
- ` className` - (string | void) - 셀 요소의 className 속성에 덧붙여지는 문자열

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
"assignments" 매개변수는 [process_resource_assignments](api/config/process_resource_assignments.md) 구성이 활성화된 경우에만 사용 가능합니다.
:::

- 자원 타임라인 뷰에서 셀의 CSS 클래스 이름을 정의합니다.
- 자원 타임라인은 작업 객체의 [resource_property](api/config/resource_property.md) 속성에 의해 작업을 자원에 연결합니다.
- 템플릿은 작업이 위치하지 않은 셀에는 호출되지 않지만 [resource_render_empty_cells](api/config/resource_render_empty_cells.md)가 활성화된 경우에는 호출됩니다.
- [project type](api/config/types.md) 유형의 작업은 계산되지 않으며 `tasks` 매개변수로 전달되지 않습니다.

### Related API
- [resource_property](api/config/resource_property.md)
- [resource_render_empty_cells](api/config/resource_render_empty_cells.md)
- [resource_cell_value](api/template/resource_cell_value.md)
- [process_resource_assignments](api/config/process_resource_assignments.md)

### Related Guides
- [Resource Management](guides/resource-management.md)

### Change log
- the **assignments** parameter is added in v7.1
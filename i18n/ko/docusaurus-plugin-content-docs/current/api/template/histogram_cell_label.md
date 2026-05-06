---
sidebar_label: histogram_cell_label
title: histogram_cell_label 템플릿
description: "셀 안의 레이블을 정의합니다"
---

# histogram_cell_label
:::info
이 기능은 PRO 에디션에서만 사용할 수 있습니다. 
:::
### Description

@short: 셀 안의 레이블 정의

@signature: histogram_cell_label: (start_date: Date, end_date: Date, resource: any, tasks: Array\<Task\>, assignments: any[]) =\> string | number | void;

### Parameters

- `start_date` - (필수) *Date* - 스케일 셀의 시작 날짜  
- `end_date` - (필수) *Date* - 스케일 셀의 종료 날짜
- `resource` - (필수) *object* - 리소스 객체
- `tasks` - (필수) *Array* - &lt;Task&gt; 지정된 리소스에 할당되고 셀의 시작일과 종료일과 겹치는 작업들
- `assignments` - (필수) *array* - 지정된 시작일과 종료일 동안 작업에 할당된 리소스 할당들

### Returns
- ` label` - (string | number | void) - 히스토그램 셀 안의 레이블에 대한 HTML 텍스트

### Example

~~~jsx
gantt.templates.histogram_cell_label = function(start_date,end_date,resource,tasks,
    assignments){
    return tasks.length * 8;
};
~~~

### Related samples
- [Resource histogram](https://docs.dhtmlx.com/gantt/samples/11_resources/09_resource_histogram.html)
- [Assign workload in percents](https://docs.dhtmlx.com/gantt/samples/11_resources/10_resource_histogram_workload_percents.html)
- [Assign resource values to specific days](https://docs.dhtmlx.com/gantt/samples/11_resources/13_resource_assignments_for_days.html)

### Details
:::note
"assignments" 인자는 [process_resource_assignments](api/config/process_resource_assignments.md) 설정이 활성화될 때에만 사용할 수 있습니다.
:::

### Related API
- [histogram_cell_class](api/template/histogram_cell_class.md)
- [histogram_cell_allocated](api/template/histogram_cell_allocated.md)
- [histogram_cell_capacity](api/template/histogram_cell_capacity.md)
- [process_resource_assignments](api/config/process_resource_assignments.md)
- [resource_property](api/config/resource_property.md)

### Related Guides
- [리소스 관리](guides/resource-management.md#resourceviewpanel)

### Change log
- **assignments** 매개변수는 버전 7.1에서 도입되었습니다.


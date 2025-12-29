---
sidebar_label: histogram_cell_label
title: histogram_cell_label template
description: "셀 내부에 표시되는 레이블을 정의합니다."
---

# histogram_cell_label
:::info
이 기능은 PRO 에디션에서만 사용할 수 있습니다. 
:::
### Description

@short: 셀 내부에 표시되는 레이블을 정의합니다.

@signature: histogram_cell_label: (start_date: Date, end_date: Date, resource: any, tasks: Array\<Task\>, assignments: any[]) =\> string | number | void;

### Parameters

- `start_date` - (required) *Date* - 스케일 셀의 시작 날짜  
- `end_date` - (required) *Date* - 스케일 셀의 종료 날짜
- `resource` - (required) *object* - 셀과 연관된 리소스 객체
- `tasks` - (required) *Array* - &lt;Task&gt;        셀의 시작 및 종료 날짜와 겹치는 지정된 리소스에 할당된 작업들
- `assignments` - (required) *array* - 작업의 지정된 시작/종료 날짜와 연결된 리소스 할당 정보

### Returns
- ` label` - (string | number | void) - histogram 셀 내부에 레이블로 사용될 HTML 문자열 또는 숫자

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
 "assignments" 매개변수는 [process_resource_assignments](api/config/process_resource_assignments.md) 설정이 활성화된 경우에만 제공됩니다. 
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


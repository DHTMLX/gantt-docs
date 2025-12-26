---
sidebar_label: histogram_cell_class
title: histogram_cell_class template
description: "리소스 패널의 셀에 적용되는 CSS 클래스를 정의합니다."
---

# histogram_cell_class
:::info
이 기능은 PRO 에디션에서만 사용할 수 있습니다. 
:::
### Description

@short: 리소스 패널의 셀에 적용되는 CSS 클래스를 정의합니다.

@signature: histogram_cell_class: (start_date: Date, end_date: Date, resource: any, tasks: Array\<Task\>, assignments: any[]) =\> string | void;

### Parameters

- `start_date` - (required) *Date* - 스케일 셀의 시작 날짜  
- `end_date` - (required) *Date* - 스케일 셀의 종료 날짜
- `resource` - (required) *object* - 리소스 객체
- `tasks` - (required) *Array* - &lt;Task&gt;        해당 리소스에 할당되고 셀의 시작/종료 날짜와 겹치는 작업들
- `assignments` - (required) *array* - 작업의 시작/종료 날짜와 연결된 리소스 할당 정보

### Returns
- ` className` - (string | void) - 히스토그램 타임라인 셀에 적용할 CSS 클래스

### Example

~~~jsx
gantt.templates.histogram_cell_class = function(start_date,end_date,resource,tasks,
    assignments){
    return "";
};
~~~

### Related samples
- [Resource histogram](https://docs.dhtmlx.com/gantt/samples/11_resources/09_resource_histogram.html)
- [Assign workload in percents](https://docs.dhtmlx.com/gantt/samples/11_resources/10_resource_histogram_workload_percents.html)
- [Assign resource values to specific days](https://docs.dhtmlx.com/gantt/samples/11_resources/13_resource_assignments_for_days.html)

### Details

:::note
 "assignments" 인자는 [process_resource_assignments](api/config/process_resource_assignments.md) 설정이 활성화된 경우에만 제공됩니다. 
:::

### Related API
- [histogram_cell_label](api/template/histogram_cell_label.md)
- [histogram_cell_allocated](api/template/histogram_cell_allocated.md)
- [histogram_cell_capacity](api/template/histogram_cell_capacity.md)
- [process_resource_assignments](api/config/process_resource_assignments.md)
- [resource_property](api/config/resource_property.md)

### Related Guides
- [리소스 관리](guides/resource-management.md#resourceviewpanel)

### Change log
- **assignments** 파라미터는 v7.1에서 도입되었습니다.


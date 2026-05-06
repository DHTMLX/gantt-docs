---
sidebar_label: histogram_cell_class
title: histogram_cell_class 템플릿
description: "리소스 패널의 셀에 적용되는 CSS 클래스 정의"
---

# histogram_cell_class
:::info
이 기능은 PRO 에디션에서만 사용할 수 있습니다. 
:::
### Description

@short: 리소스 패널의 셀에 적용되는 CSS 클래스 정의

@signature: histogram_cell_class: (start_date: Date, end_date: Date, resource: any, tasks: Array\<Task\>, assignments: any[]) =\> string | void;

### Parameters

- `start_date` - (required) *Date* - 스케일 셀의 시작 날짜  
- `end_date` - (required) *Date* - 스케일 셀의 종료 날짜
- `resource` - (required) *object* - 리소스 객체
- `tasks` - (required) *Array* - &lt;Task&gt; 지정된 리소스에 할당되고 셀의 시작/종료 날짜와 겹치는 작업들
- `assignments` - (required) *array* - 작업의 시작/종료 날짜에 지정된 리소스 할당

### Returns
- ` className` - (string | void) - 히스토그램 타임라인 셀에 대한 CSS 클래스

### Example

~~~jsx
gantt.templates.histogram_cell_class = function(start_date,end_date,resource,tasks,
    assignments){
    return "";
};
~~~

### Related samples
- [리소스 히스토그램](https://docs.dhtmlx.com/gantt/samples/11_resources/09_resource_histogram.html)
- [작업 부하를 퍼센트로 할당](https://docs.dhtmlx.com/gantt/samples/11_resources/10_resource_histogram_workload_percents.html)
- [특정 날짜에 리소스 값을 할당](https://docs.dhtmlx.com/gantt/samples/11_resources/13_resource_assignments_for_days.html)

### Details

:::note
'assignments' 인수는 [process_resource_assignments](api/config/process_resource_assignments.md) 구성이 활성화될 때만 사용할 수 있습니다.
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


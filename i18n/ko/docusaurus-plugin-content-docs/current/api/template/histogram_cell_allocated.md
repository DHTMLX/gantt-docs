---
sidebar_label: histogram_cell_allocated
title: histogram_cell_allocated template
description: "리소스 히스토그램(resourceHistogram)에서 채워진 구간의 높이를 지정합니다."
---

# histogram_cell_allocated
:::info
이 기능은 PRO 에디션에서만 사용할 수 있습니다. 
:::
### Description

@short: 리소스 히스토그램(resourceHistogram)에서 채워진 구간의 높이를 지정합니다.

@signature: histogram_cell_allocated: (start_date: Date, end_date: Date, resource: any, tasks: Array\<Task\>, assignments: any[]) =\> number | void;

### Parameters

- `start_date` - (required) *Date* - 스케일 셀의 시작 날짜  
- `end_date` - (required) *Date* - 스케일 셀의 종료 날짜
- `resource` - (required) *object* - 리소스 객체
- `tasks` - (required) *Array* - &lt;Task&gt;        셀의 시작/종료 날짜와 겹치는 해당 리소스에 할당된 작업들
- `assignments` - (required) *array* - 작업의 지정된 시작/종료 날짜와 연결된 리소스 할당 목록

### Returns
- ` height` - (number | void) - resourceHistogram에서 채워진 구간의 높이

### Example

~~~jsx
gantt.templates.histogram_cell_allocated=function(start_date,end_date,resource,tasks,
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
 "assignments" 파라미터는 [process_resource_assignments](api/config/process_resource_assignments.md) 설정이 활성화된 경우에만 접근 가능합니다. 
:::

템플릿의 반환 값은 0부터 *maxCapacity*까지의 범위를 가질 수 있습니다.

**maxCapacity 설명**

각 히스토그램 행이 막대 그래프로 표현될 때, maxCapacity는 그 차트 Y축의 높이를 나타냅니다. 아래 예시 이미지에서 maxCapacity는 24입니다:

### Related API
- [histogram_cell_class](api/template/histogram_cell_class.md)
- [histogram_cell_label](api/template/histogram_cell_label.md)
- [histogram_cell_capacity](api/template/histogram_cell_capacity.md)
- [process_resource_assignments](api/config/process_resource_assignments.md)
- [resource_property](api/config/resource_property.md)

### Related Guides
- [리소스 관리](guides/resource-management.md#resourceviewpanel)

### Change log
- **assignments** 파라미터는 v7.1 버전에서 도입되었습니다.


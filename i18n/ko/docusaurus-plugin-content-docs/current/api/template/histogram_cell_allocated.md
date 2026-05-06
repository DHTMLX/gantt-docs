---
sidebar_label: histogram_cell_allocated
title: histogram_cell_allocated 템플릿
description: "리소스 히스토그램에서 채워진 영역의 높이를 정의합니다"
---

# histogram_cell_allocated
:::info
이 기능은 PRO 에디션에서만 사용할 수 있습니다. 
:::
### Description

@short: resourceHistogram에서 채워진 영역의 높이를 정의합니다

@signature: histogram_cell_allocated: (start_date: Date, end_date: Date, resource: any, tasks: Array\<Task\>, assignments: any[]) =\> number | void;

### Parameters

- `start_date` - (필수) *Date* - 스케일 셀의 시작 날짜  
- `end_date` - (필수) *Date* - 스케일 셀의 끝 날짜
- `resource` - (필수) *object* - 자원 객체
- `tasks` - (필수) *Array* - &lt;Task&gt;        지정된 자원에 할당되고 셀의 시작/종료 날짜와 겹치는 작업들
- `assignments` - (필수) *array* - 지정된 작업의 시작일과 종료일에 할당된 자원 할당

### Returns
- ` height` - (number | void) - resourceHistogram에서 채워진 영역의 높이

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
“assignments” 인수는 [process_resource_assignments](api/config/process_resource_assignments.md) 구성이 활성화될 때만 사용할 수 있습니다.
:::

템플릿의 값은 0에서 *maxCapacity*까지 설정할 수 있습니다.

**maxCapacity 정의**

히스토그램의 각 행이 막대 차트로 간주될 때, maxCapacity는 이 차트의 Y-축 스케일의 높이입니다. 아래 이미지에서 maxCapacity = 24:

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


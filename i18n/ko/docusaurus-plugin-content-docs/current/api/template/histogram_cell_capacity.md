---
sidebar_label: histogram_cell_capacity
title: histogram_cell_capacity template
description: "리소스의 사용 가능 용량을 나타내는 선의 높이를 정의합니다."
---

# histogram_cell_capacity
:::info
이 기능은 PRO 에디션에서만 사용할 수 있습니다. 
:::
### Description

@short: 리소스의 사용 가능 용량을 나타내는 선의 높이를 정의합니다.

@signature: histogram_cell_capacity: (start_date: Date, end_date: Date, resource: any, tasks: Array\<Task\>, assignments: any[]) =\> number | void;

### Parameters

- `start_date` - (required) *Date* - 스케일 셀의 시작 날짜  
- `end_date` - (required) *Date* - 스케일 셀의 종료 날짜
- `resource` - (required) *object* - 리소스 객체 자체
- `tasks` - (required) *Array* - &lt;Task&gt;        셀의 시작/종료 날짜와 겹치는 리소스에 할당된 작업들
- `assignments` - (required) *array* - 작업의 지정된 시작/종료 날짜와 연결된 리소스 할당 정보

### Returns
- ` height` - (number | void) - 리소스 사용 가능 용량을 나타내는 선의 높이

### Example

~~~jsx
gantt.templates.histogram_cell_capacity=function(start_date,end_date,resource,tasks,
    assignments){
    return 24;
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

템플릿의 반환 값은 -1에서 maxCapacity까지의 범위를 가질 수 있습니다. 0 미만의 값은 선이 렌더링되지 않도록 합니다.

**maxCapacity 설명**

각 히스토그램 행을 막대 그래프로 생각해보세요. maxCapacity는 그 차트의 Y축 높이를 나타냅니다. 아래 이미지에서 maxCapacity는 24입니다:

![maxCapacity](/img/maxcapacity.png)

기본적으로, 모든 리소스의 **maxCapacity**는 24로 설정되어 있습니다. *histogram_cell_capacity* 템플릿에서 24를 초과하는 값을 반환해도 계산은 올바르게 수행되지만, 리소스 패널의 셀 영역이 예상대로 채워지지 않을 수 있습니다.

![filled_capacity](/img/filled_capacity.png)

또한 전체 히스토그램에 대해 전역적으로 또는 각 리소스별로 **maxCapacity**를 설정할 수 있는 옵션도 있습니다. 아래 예제를 참고하세요:

:::note

**Related example:** [maxCapacity 설정 예제](https://snippet.dhtmlx.com/glnqcsgq)

:::

### Related API
- [histogram_cell_class](api/template/histogram_cell_class.md)
- [histogram_cell_label](api/template/histogram_cell_label.md)
- [histogram_cell_allocated](api/template/histogram_cell_allocated.md)
- [process_resource_assignments](api/config/process_resource_assignments.md)
- [resource_property](api/config/resource_property.md)

### Related Guides
- [리소스 관리](guides/resource-management.md#resourceviewpanel)

### Change log
- **assignments** 파라미터가 v7.1에 추가됨


---
sidebar_label: histogram_cell_capacity
title: histogram_cell_capacity 템플릿
description: "리소스의 사용 가능 용량을 정의하는 선의 높이를 지정합니다"
---

# histogram_cell_capacity
:::info
이 기능은 PRO 에디션에서만 사용할 수 있습니다.
:::
### Description

@short: 리소스의 사용 가능 용량을 정의하는 선의 높이를 지정합니다

@signature: histogram_cell_capacity: (start_date: Date, end_date: Date, resource: any, tasks: Array\<Task\>, assignments: any[]) =\> number | void;

### Parameters

- `start_date` - (필수) *Date* - 눈금 셀의 시작 날짜
- `end_date` - (필수) *Date* - 눈금 셀의 종료 날짜
- `resource` - (필수) *object* - 리소스 객체
- `tasks` - (필수) *Array* - &lt;Task&gt;        지정된 리소스에 할당되고 셀의 시작/종료 날짜와 겹치는 작업들
- `assignments` - (필수) *array* - 작업의 시작/종료 날짜에 할당된 리소스 할당들

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
"assignments" 매개변수는 [](api/config/process_resource_assignments.md) 구성(config)이 활성화될 때에만 사용할 수 있습니다.
:::

템플릿 값은 -1에서 maxCapacity까지 설정할 수 있습니다. 0보다 작은 값은 선을 렌더링하지 않습니다.

**maxCapacity 정의**

히스토그램의 각 행이 막대 차트로 간주되면, maxCapacity는 이 차트의 Y축 눈금의 높이입니다. 아래 그림에서 maxCapacity = 24:

![maxCapacity](/img/maxcapacity.png)

기본적으로 모든 리소스에 대해 **maxCapacity**는 24입니다. 이는 *histogram_cell_capacity* 템플릿에서 24보다 큰 값을 반환하면 숫자는 올바르게 계산되지만 리소스 패널의 셀 영역이 기대한 대로 채워지지 않을 수 있음을 의미합니다.

![filled_capacity](/img/filled_capacity.png)

하지만 모든 히스토그램에 대해 한 번에, 그리고 각 리소스별로 **maxCapacity**를 구성하는 기능이 있습니다. 아래 예제를 확인하세요:

:::note
  https://snippet.dhtmlx.com/glnqcsgq maxCapacity 구성
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


---
sidebar_label: getResourceAssignments
title: getResourceAssignments method
description: "지정된 리소스에 연결된 모든 작업을 반환합니다."
---

# getResourceAssignments
:::info
이 기능은 PRO 에디션에서만 사용할 수 있습니다. 
:::
### Description

@short: 지정된 리소스에 연결된 모든 작업을 반환합니다.

@signature: getResourceAssignments: (resourceId: string | number, taskId?: string | number) =\> ResourceAssignment[]

### Parameters

- `resourceId` - (required) *string | number* - 리소스의 식별자
- `taskId` - (optional) *string | number* - 작업의 식별자

### Returns
- ` assignments` - (ResourceAssignment[]) - 리소스에 할당된 작업을 나타내는 객체 배열

### Example

~~~jsx
gantt.getResourceAssignments("6"); // -> 세부 정보 표시
~~~

### Related samples
- [Resource histogram](https://docs.dhtmlx.com/gantt/samples/11_resources/09_resource_histogram.html)
- [Assign workload in percents](https://docs.dhtmlx.com/gantt/samples/11_resources/10_resource_histogram_workload_percents.html)
- [Work and material resources](https://docs.dhtmlx.com/gantt/samples/11_resources/12_work_and_material_resources.html)

### Details

이 메서드는 다음과 같은 구조의 객체 배열을 제공합니다:

~~~js
[ 
    {task_id: 5, resource_id: "6", value: 5, delay: 0, duration: 7, 
        start_date: "03-04-2019 00:00", end_date: "12-04-2019 00:00", 
        id: 1617258553240, mode: "default"},
    {task_id: 18, resource_id: "6", value: 2, delay: 0, duration: 2, 
        start_date: "05-04-2019 00:00", end_date: "09-04-2019 00:00", 
        id: 1617258553250, mode: "default"},
    {task_id: 19, resource_id: "6", value: 3, delay: 0, duration: 4, 
        start_date: "09-04-2019 00:00", end_date: "13-04-2019 00:00", 
        id: 1617258553251, mode: "default"},
    {task_id: 21, resource_id: "6", value: 5, delay: 0, duration: 4, 
        start_date: "03-04-2019 00:00", end_date: "09-04-2019 00:00", 
        id: 1617258553254, mode: "default"}
]
~~~

각 객체는 다음 속성을 포함합니다:

- **id** - (*string | number*) - 할당의 고유 식별자
- **task_id** - (*string | number*) - 리소스에 할당된 작업의 ID
- **resource_id** - (*string | number*) - 작업에 할당된 리소스의 ID
- **value** - (*number | string*) - 작업에 할당된 리소스의 양
- **delay** - (*number*) - 할당 시작 날짜와 작업 시작 날짜 간의 오프셋
- **start_date** - (*Date*) - 할당이 시작될 예정인 시점
- **end_date** - (*Date*) - 할당이 종료될 예정인 시점
- **duration** - (*number*) - 할당이 지속되는 기간
- **mode** - (*string*) - 리소스 할당 시간을 계산하는 데 사용되는 모드: "default"|"fixedDates"|"fixedDuration"
- **[customProperty: string]** - (*any*) - 추가적인 사용자 정의 속성


:::note
note *delay*, *duration*, *start_date*, *end_date*, *id*, *mode* 속성은 [process_resource_assignments](api/config/process_resource_assignments.md)가 활성화된 경우에만 자동으로 채워집니다. 
:::

### Related API
- [getTaskAssignments](api/method/gettaskassignments.md)
- [process_resource_assignments](api/config/process_resource_assignments.md)

### Related Guides
- [리소스 관리](guides/resource-management.md)

### Change log
- v7.1부터 반환 객체에 *delay*, *duration*, *start_date*, *end_date*, *id*, *mode* 속성이 포함됩니다.


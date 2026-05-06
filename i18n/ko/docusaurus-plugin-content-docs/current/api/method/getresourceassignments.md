---
sidebar_label: getResourceAssignments
title: getResourceAssignments 메서드
description: "리소스에 할당된 모든 작업을 반환합니다"
---

# getResourceAssignments

:::info
이 기능은 PRO 에디션에서만 사용할 수 있습니다. 
:::

### Description

@short: 리소스에 할당된 모든 작업을 반환합니다

@signature: getResourceAssignments: (resourceId: string | number, taskId?: string | number) =\> ResourceAssignment[]

### Parameters

- `resourceId` - (required) *string | number* - 리소스의 ID
- `taskId` - (required) *string | number* - 작업의 ID


### Returns
- `assignments` - (ResourceAssignment[]) - 이 리소스에 할당된 작업의 객체 배열

### Example

~~~jsx
gantt.getResourceAssignments("6"); // -> 자세한 내용 참조
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

- **id** - (*string | number*) - 할당의 ID
- **task_id** - (*string | number*) - 이 리소스가 할당된 작업의 ID
- **resource_id** - (*string | number*) - 작업에 할당된 리소스의 ID
- **value** - (*number | string*) - 작업에 할당된 리소스의 양
- **delay** - (*number*) - 할당 시작일과 작업 시작일의 차이
- **start_date** - (*Date*) - 할당이 시작되어야 하는 날짜
- **end_date** - (*Date*) - 할당이 끝나야 하는 날짜
- **duration** - (*number*) - 할당의 기간
- **mode** - (*string*) - 리소스 할당 시간의 계산 모드: "default"|"fixedDates"|"fixedDuration"
- **[customProperty: string]** - (*any*) - 사용자 정의 속성

:::note
 *delay*, *duration*, *start_date*, *end_date*, *id*, *mode* 는 [process_resource_assignments](api/config/process_resource_assignments.md)가 활성화될 때만 자동으로 채워집니다.  
:::

### Related API
- [getTaskAssignments](api/method/gettaskassignments.md)
- [process_resource_assignments](api/config/process_resource_assignments.md)

### Related Guides
- [자원 관리](guides/resource-management.md)

### Change log
- 반환 객체에는 *delay*, *duration*, *start_date*, *end_date*, *id*, *mode* 속성이 v7.1부터 포함됩니다
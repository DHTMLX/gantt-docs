---
sidebar_label: getTaskAssignments
title: getTaskAssignments method
description: "특정 작업에 대한 파싱된 리소스 할당 정보를 데이터스토어에서 가져옵니다."
---

# getTaskAssignments
:::info
이 기능은 PRO 에디션에서만 사용할 수 있습니다. 
:::
### Description

@short: 특정 작업에 대한 파싱된 리소스 할당 정보를 데이터스토어에서 가져옵니다.

@signature: getTaskAssignments: (taskId: string | number) =\> ResourceAssignment[]

### Parameters

- `taskId` - (required) *string | number* -    작업의 ID

### Returns
- ` param` - (ResourceAssignment[]) - 작업에 할당된 리소스 정보를 나타내는 객체 배열

### Example

~~~jsx
gantt.getTaskAssignments(5); // -> 세부 정보 확인
~~~

### Related samples
- [Assign resource values to specific days](https://docs.dhtmlx.com/gantt/samples/11_resources/13_resource_assignments_for_days.html)

### Details

:::note
**getTaskAssignments** 메서드는 [process_resource_assignments](api/config/process_resource_assignments.md)가 비활성화된 경우 작동하지 않습니다. 
:::

이 메서드는 다음과 같은 구조를 가진 객체 배열을 반환합니다:

~~~js
[
    {
        task_id: 5,
        id: 1617254693938, 
        delay: 0, duration: 2, 
        start_date: "03-04-2019 00:00", 
        end_date: "05-04-2019 00:00", 
        mode: "fixedDuration", 
        resource_id: 6, 
        value: 3
    },
    {
        task_id: 5,
        id: 1617254693946, 
        delay: 3, duration: 1, 
        start_date: "06-04-2019 00:00", 
        end_date: "07-04-2019 00:00", 
        mode: "fixedDuration", 
        resource_id: 6, 
        value: 6
    }
]
~~~

각 객체는 다음 속성을 포함합니다:

- **id** - (*string | number*) - 할당의 고유 ID
- **task_id** - (*string | number*) - 리소스가 할당된 작업의 ID
- **resource_id** - (*string | number*) - 작업에 할당된 리소스의 ID
- **value** - (*number | string*) - 작업에 할당된 리소스의 양
- **delay** - (*number*) - 할당 시작일과 작업 시작일 간의 오프셋
- **start_date** - (*Date*) - 할당이 시작되는 예정 시각
- **end_date** - (*Date*) - 할당이 종료되는 예정 시각
- **duration** - (*number*) - 할당 기간
- **mode** - (*string*) - 리소스 할당 시간 계산 방식: "default"|"fixedDates"|"fixedDuration"
- **[customProperty: string]** - (*any*) - 추가적인 사용자 정의 속성


:::note
*delay*, *duration*, *start_date*, *end_date*, *id*, *mode* 속성은 [process_resource_assignments](api/config/process_resource_assignments.md)가 활성화된 경우에만 자동으로 채워집니다. 
:::

### Related API
- [getResourceAssignments](api/method/getresourceassignments.md)
- [process_resource_assignments](api/config/process_resource_assignments.md)

### Related Guides
- [리소스 관리](guides/resource-management.md#assigningresources)

### Change log
- v7.1에 추가됨


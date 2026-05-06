---
sidebar_label: getTaskAssignments
title: getTaskAssignments 메서드
description: "데이터 저장소에서 특정 작업의 파싱된 자원 할당을 반환합니다"
---

# getTaskAssignments

:::info
이 기능은 PRO 에디션에서만 사용할 수 있습니다. 
:::

### Description

@short: 데이터 저장소에서 특정 작업의 파싱된 자원 할당을 반환합니다

@signature: getTaskAssignments: (taskId: string | number) =\> ResourceAssignment[]

### Parameters

- `taskId` - (required) *string | number* -    태스크 ID

### Returns
- ` param` - (ResourceAssignment[]) - 태스크의 자원 할당 객체 배열

### Example

~~~jsx
gantt.getTaskAssignments(5); // 자세히 보기
~~~

### Related samples
- [Assign resource values to specific days](https://docs.dhtmlx.com/gantt/samples/11_resources/13_resource_assignments_for_days.html)

### Details

:::note
**getTaskAssignments** 메서드는 [process_resource_assignments](api/config/process_resource_assignments.md)가 비활성화되면 사용할 수 없습니다. 
:::

메서드는 아래와 같은 객체 배열을 반환합니다:

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

각 객체에는 다음 속성이 포함됩니다:

- **id** - (*string | number*) - 할당의 ID
- **task_id** - (*string | number*) - 자원이 할당된 작업의 ID
- **resource_id** - (*string | number*) - 작업에 할당된 자원의 ID
- **value** - (*number* | *string*) - 작업에 할당된 자원의 수량
- **delay** - (*number*) - 할당 시작일과 태스크 시작일의 차이
- **start_date** - (*Date*) - 할당이 시작되어야 하는 날짜
- **end_date** - (*Date*) - 할당이 종료되어야 하는 날짜
- **duration** - (*number*) - 할당의 지속 시간
- **mode** - (*string*) - 자원 할당 시간의 계산 모드: "default"|"fixedDates"|"fixedDuration"
- **[customProperty: string]** - (*any*) - 임의의 커스텀 속성


:::note
 *delay*, *duration*, *start_date*, *end_date*, *id*, *mode*은 [process_resource_assignments](api/config/process_resource_assignments.md)가 활성화된 경우에만 자동으로 채워집니다. 
:::

### Related API
- [getResourceAssignments](api/method/getresourceassignments.md)
- [process_resource_assignments](api/config/process_resource_assignments.md)

### Related Guides
- [리소스 관리](guides/resource-management.md#assigningresources)

### Change log
- v7.1에 추가
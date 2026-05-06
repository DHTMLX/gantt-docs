---
sidebar_label: getTaskResources
title: getTaskResources method
description: "데이터스토어에서 특정 작업에 할당된 고유 자원 배열을 반환합니다"
---

# getTaskResources

:::info
이 기능은 PRO 에디션에서만 사용할 수 있습니다.
:::

### Description

@short: 데이터스토어에서 특정 작업에 할당된 고유 자원 배열을 반환합니다

@signature: getTaskResources: (taskId: string | number) =\> ResourceItem[]

### Parameters

- `taskId` - (필수) *string | number* - 작업 ID

### Returns
- ` param` - (ResourceItem[]) - 리소스 객체의 배열

### Example

~~~jsx
gantt.getTaskResources(5); // 자세히 보기
~~~

### Related samples
- [Assign resource values to specific days](https://docs.dhtmlx.com/gantt/samples/11_resources/13_resource_assignments_for_days.html)

### Details

:::note
 getTaskResources 메서드는 [process_resource_assignments](api/config/process_resource_assignments.md)가 비활성화된 경우 사용할 수 없습니다. 
:::

메서드는 다음 속성을 갖는 **resourceItem** 객체의 배열을 반환합니다:

- **id** - (*string | number*) - 리소스 아이템의 ID
- **open?** - (*boolean*) - 트리에서 리소스 아이템이 확장되어 있는지 여부를 나타냅니다 (*true*) 또는 축소되어 있는지 여부를 나타냅니다 (*false*)
- **parent?** - (*string | number*) - 부모 리소스 아이템의 ID
- **text?** - (*string*) - 리소스 이름
- **unit?** - (*string*) - 할당의 단위
- **[customProperty: string]** - (*any*) - 임의의 사용자 정의 속성


~~~js
[
    {id: 6, text: "John", parent:1, unit: "hours/day" },
    {id: 7, text: "Mike", parent:2, unit: "hours/day" }
]
~~~

### Related API
- [getResourceAssignments](api/method/getresourceassignments.md)
- [process_resource_assignments](api/config/process_resource_assignments.md)

### Related Guides
- [리소스 관리](guides/resource-management.md#assigningresources)

### Change log
- added in v8.0
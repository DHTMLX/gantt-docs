---
sidebar_label: getTaskResources
title: getTaskResources method
description: "특정 작업에 할당된 고유한 리소스 목록을 데이터스토어에서 가져옵니다."
---

# getTaskResources
:::info
이 기능은 PRO 에디션에서만 사용할 수 있습니다. 
:::
### Description

@short: 특정 작업에 할당된 고유한 리소스 목록을 데이터스토어에서 가져옵니다.

@signature: getTaskResources: (taskId: string | number) =\> ResourceItem[]

### Parameters

- `taskId` - (required) *string | number* -    작업의 식별자

### Returns
- ` param` - (ResourceItem[]) - 리소스 객체를 담은 배열

### Example

~~~jsx
gantt.getTaskResources(5); // -> 자세한 내용 보기
~~~

### Related samples
- [Assign resource values to specific days](https://docs.dhtmlx.com/gantt/samples/11_resources/13_resource_assignments_for_days.html)

### Details

:::note
 **getTaskResources** 메서드는 [process_resource_assignments](api/config/process_resource_assignments.md)가 비활성화된 경우 작동하지 않습니다. 
:::

이 메서드는 다음 속성을 가진 **resourceItem** 객체 배열을 반환합니다:

- **id** - (*string | number*) - 리소스 항목의 ID
- **open?** - (*boolean*) - 트리에서 리소스 항목이 확장되어 있는지(*true*) 또는 축소되어 있는지(*false*) 표시
- **parent?** - (*string | number*) - 리소스 항목의 상위 ID
- **text?** - (*string*) - 리소스 이름
- **unit?** - (*string*) - 할당에 사용되는 단위
- **[customProperty: string]** - (*any*) - 추가적인 커스텀 속성


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
- v8.0에 추가됨


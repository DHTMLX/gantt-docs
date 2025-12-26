---
sidebar_label: resource_assignment_store
title: resource_assignment_store config
description: "리소스 할당을 저장하는 데이터스토어의 이름을 정의합니다."
---

# resource_assignment_store
:::info
이 기능은 PRO 에디션에서만 사용할 수 있습니다. 
:::
### Description

@short: 리소스 할당을 저장하는 데이터스토어의 이름을 정의합니다.

@signature: resource_assignment_store: string

### Example

~~~jsx
var assignmentStore = gantt.getDatastore(gantt.config.resource_assignment_store);
~~~

**Default value:** "resourceAssignments"

### Related samples
- [Assign resource values to specific days](https://docs.dhtmlx.com/gantt/samples/11_resources/13_resource_assignments_for_days.html)

### Details

데이터스토어는 자동으로 설정됩니다.

[process_resource_assignments](api/config/process_resource_assignments.md) 설정이 활성화된 경우에만 생성됩니다.

이 데이터스토어를 사용하여 프로그래밍 방식으로 리소스 할당을 관리할 수 있습니다:

~~~js
var assignmentStore = gantt.getDatastore(gantt.config.resource_assignment_store);

assignmentStore.addItem({
    resource_id: 5,
    task_id: 2,
    value: 4
});
assignmentStore.removeItem(assignment.id);
assignmentStore.updateItem(assignment.id);

// 데이터스토어에서 할당을 업데이트한 후에는,
// 작업 객체에 변경 사항을 적용하기 위해 `updateTaskAssignments`를 호출하세요:
gantt.updateTaskAssignments(taskId);
~~~

### Related API
- [updateTaskAssignments](api/method/updatetaskassignments.md)
- [process_resource_assignments](api/config/process_resource_assignments.md)

### Related Guides
- [리소스 관리](guides/resource-management.md)

### Change log
- v7.1에 추가됨


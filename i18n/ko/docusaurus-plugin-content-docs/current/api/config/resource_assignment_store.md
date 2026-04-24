---
sidebar_label: resource_assignment_store
title: resource_assignment_store 설정
description: "자원 할당을 저장하는 dataStore의 이름을 지정합니다"
---

# resource_assignment_store

:::info
이 기능은 PRO 에디션에서만 사용 가능합니다.
:::

### Description

@short: 자원 할당을 저장하는 dataStore의 이름을 지정합니다

@signature: resource_assignment_store: string

### Example

~~~jsx
var assignmentStore = gantt.getDatastore(gantt.config.resource_assignment_store);
~~~

**기본값:** "resourceAssignments"

### Related samples
- [Assign resource values to specific days](https://docs.dhtmlx.com/gantt/samples/11_resources/13_resource_assignments_for_days.html)

### Details

데이터스토어는 자동으로 생성됩니다.

데이터스토어는 [process_resource_assignments](api/config/process_resource_assignments.md) 설정이 활성화될 때만 생성됩니다.

데이터스토어는 코드에서 자원 할당을 수정하는 데 사용할 수 있습니다:

~~~js
var assignmentStore = gantt.getDatastore(gantt.config.resource_assignment_store);

assignmentStore.addItem({
    resource_id: 5,
    task_id: 2,
    value: 4
});
assignmentStore.removeItem(assignment.id);
assignmentStore.updateItem(assignment.id);

// 데이터스토어에서 할당이 업데이트된 후, 작업 객체에 변경 내용을 기록하려면
// `updateTaskAssignments` 를 호출해야 합니다:
gantt.updateTaskAssignments(taskId);
~~~

### Related API
- [updateTaskAssignments](api/method/updatetaskassignments.md)
- [process_resource_assignments](api/config/process_resource_assignments.md)

### Related Guides
- [Resource Management](guides/resource-management.md)

### Change log
- v7.1에서 추가됨
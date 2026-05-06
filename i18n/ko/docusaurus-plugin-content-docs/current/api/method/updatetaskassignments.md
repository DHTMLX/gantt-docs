---
sidebar_label: updateTaskAssignments
title: updateTaskAssignments 메서드
description: "데이터스토어의 리소스 할당 값으로 태스크 객체의 리소스 속성을 업데이트합니다"
--- 

# updateTaskAssignments

:::info
이 기능은 PRO 에디션에서만 사용할 수 있습니다. 
:::

### Description

@short: 데이터스토어의 리소스 할당 값으로 태스크 객체의 리소스 속성을 업데이트합니다

@signature: updateTaskAssignments: (taskId: number | string) =\> void

### Parameters

- `taskId` - (필수) *number | string* - 태스크 ID

### Example

~~~jsx
var assignmentStore = gantt.getDatastore(gantt.config.resource_assignment_store);

assignmentStore.addItem({
    resource_id: 5,
    task_id: 2,
    value: 4
});
assignmentStore.removeItem(assignment.id);
assignmentStore.updateItem(assignment.id);

// 데이터스토어에서 할당이 업데이트된 후, 변경 내용을 태스크 객체에 기록하려면
// `updateTaskAssignments`를 호출하여 변경 내용을 태스크 객체에 작성합니다:
gantt.updateTaskAssignments(taskId);
~~~

### Related samples
- [Assign resource values to specific days](https://docs.dhtmlx.com/gantt/samples/11_resources/13_resource_assignments_for_days.html)

### Details
:::note
참고: 이 메서드는 [process_resource_assignments](api/config/process_resource_assignments.md) 구성이 활성화될 때만 사용할 수 있습니다.
:::

기본적으로 할당 저장소는 태스크 객체에서 채워집니다. 이는 태스크 객체의 리소스 속성(예: task.users)을 수정하면 변경 내용이 데이터 저장소에 자동으로 반영됨을 의미합니다.

~~~js
task[gantt.config.resource_property] = [
    {
        resource_id: "6",
        value: 3,
        start_date: "03-04-2019 00:00",
        end_date: "05-04-2019 00:00",
    }
];
gantt.updateTask(taskId);
~~~

다음과 같이 반대 방향으로 할당 데이터를 새로 고쳐야 할 수도 있습니다. 예를 들어, 데이터스토어 API를 사용하여 리소스 할당을 수정한 다음 해당 변경을 태스크 객체에 적용하려는 경우입니다. 이 경우 데이터스토어의 값으로 태스크 객체의 리소스 속성을 업데이트하려면 **gantt.updateTaskAssignments()** 메서드를 호출해야 합니다:

~~~js
var taskId = 2;
var assignmentStore = gantt.getDatastore(gantt.config.resource_assignment_store);
assignmentStore.addItem({
    task_id: taskId,
    resource_id: 3,
    value: 8,
    delay: 1
})
gantt.updateTaskAssignments(taskId);


console.log(gantt.getTask(taskId));
// -> { id: 2, users: [{resource_id: 3, value: 8, delay: 1, start_date: ...}], ...)
~~~

### Related API
- [resource_assignment_store](api/config/resource_assignment_store.md)
- [resource_property](api/config/resource_property.md)
- [process_resource_assignments](api/config/process_resource_assignments.md)

### Related Guides
- [리소스 관리](guides/resource-management.md)

### Change log
- v7.1에 추가됨


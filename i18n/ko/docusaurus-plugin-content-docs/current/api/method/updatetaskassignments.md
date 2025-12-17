---
sidebar_label: updateTaskAssignments
title: updateTaskAssignments method
description: "현재 데이터스토어에 저장된 리소스 할당 정보를 기반으로 작업 객체의 resource 속성을 업데이트합니다."
---

# updateTaskAssignments
:::info
이 기능은 PRO 에디션에서만 사용할 수 있습니다. 
:::
### Description

@short: 현재 데이터스토어에 저장된 리소스 할당 정보를 기반으로 작업 객체의 resource 속성을 업데이트합니다.

@signature: updateTaskAssignments: (taskId: number | string) =\> void

### Parameters

- `taskId` - (required) *number | string* - 작업 ID

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

// 데이터스토어 내 할당 정보가 변경된 후,  
// 작업 객체에 이러한 변경 사항을 동기화하려면 `updateTaskAssignments`를 호출하세요:
gantt.updateTaskAssignments(taskId);
~~~

### Related samples
- [Assign resource values to specific days](https://docs.dhtmlx.com/gantt/samples/11_resources/13_resource_assignments_for_days.html)

### Details


:::note
 이 메서드는 [process_resource_assignments](api/config/process_resource_assignments.md) 설정이 활성화된 경우에만 작동합니다. 
:::

일반적으로 할당 저장소는 작업 객체로부터 채워집니다. 즉, 작업의 resource 속성(예: task.users)을 업데이트하면 해당 변경 내용이 자동으로 데이터스토어에 반영됩니다.

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

<br>
때때로, 할당 정보를 반대로 업데이트하고 싶을 수 있습니다 - 즉, 데이터스토어에서 직접 변경한 후 그 변경 사항을 작업 객체에 적용하는 경우입니다. 이럴 때는 **gantt.updateTaskAssignments()** 를 호출하여 작업 객체의 resource 속성을 데이터스토어 값으로 새로고침하세요:

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
- [리소스 관리](guides/resource-management.md#managingresourceassignments)

### Change log
- v7.1에 추가됨


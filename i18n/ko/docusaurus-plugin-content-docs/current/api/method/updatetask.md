---
sidebar_label: updateTask
title: updateTask method
description: "지정된 태스크를 업데이트합니다"
---

# updateTask

### Description

@short: 지정된 태스크를 업데이트합니다

@signature: updateTask: (id: string | number, newState?: Task) =\> void

### Parameters

- `id` - (required) *string | number* - 태스크 ID
- `newState` - (optional) *Task* - 선택 사항, 태스크의 새로운 값들

### Example

~~~jsx
var taskId = gantt.addTask({
    id:10,
    text:"Task #10",
    start_date:"02-04-2013",
    duration:8,
    parent:1
});

gantt.getTask(taskId).text = "Task #13"; //태스크 데이터를 수정합니다
gantt.updateTask(taskId); //변경 사항을 적용하고 태스크를 새로 고칩니다
~~~

### Details

:::note
 이 메서드는 [onAfterTaskUpdate](api/event/onaftertaskupdate.md) 이벤트를 트리거합니다. 
:::
:::note
 dataProcessor가 활성화된 경우, 이 메서드는 dataProcessor도 활성화합니다. 
:::

이 메서드는 태스크 객체를 변경한 후 호출해야 합니다. Gantt의 내부 상태를 업데이트하고, 관련 UI 부분을 새로 고치며, 업데이트된 정보를 백엔드로 전송합니다.

호출 시 [onAfterTaskUpdate](api/event/onaftertaskupdate.md) 이벤트를 발생시키며, 이 이벤트는 추가 계산을 시작할 수 있습니다.

[DataProcessor](guides/server-side.md)를 사용하는 경우, 이 메서드를 호출하면 서버에 **update** 요청을 보냅니다.

저장할 필요 없는 시각적 업데이트의 경우, **[refreshTask](api/method/refreshtask.md) 메서드를 대신 사용하세요**. 이 방법은 추가 계산 없이 태스크의 외관만 새로 고칩니다.

~~~js
gantt.templates.task_class = function(start, end, task){
    if(task.$active) {
        return "active_task";
    }
};

gantt.attachEvent("onTaskClick", function(id,e){
    gantt.getTask(id).$active = true;
    gantt.refreshTask(id); /*!*/
});
~~~


또는, **updateTask** 메서드의 두 번째 인자로 새로운 태스크 객체를 전달하여 태스크를 업데이트할 수도 있습니다:

~~~js
var task = {
    id: 2, text: 'New task text', 
    start_date: new Date(2025,03,02), 
    end_date: new Date(2025,03,04), 
    $source: [1], 
    $target: [2]
}
gantt.updateTask(2,task);
~~~

:::note

**Related example:** [Updating task](https://snippet.dhtmlx.com/fnfpoiik)

:::

### Related API
- [updateLink](api/method/updatelink.md)
- [refreshLink](api/method/refreshlink.md)
- [refreshTask](api/method/refreshtask.md)

### Related Guides
- [Server-Side Integration](guides/server-side.md#updatingdataontheserver)


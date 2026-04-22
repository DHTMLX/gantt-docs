---
sidebar_label: updateTask
title: updateTask 메서드
description: "지정된 태스크를 업데이트합니다"
--- 

# updateTask

### Description

@short: 지정된 태스크를 업데이트합니다

@signature: updateTask: (id: string | number, newState?: Task) => void

### Parameters

- `id` - (필수) *string | number* - 태스크 ID
- `newState` - (선택) *Task* - 태스크의 새로운 값

### Example

~~~jsx
const taskId = gantt.addTask({
    id: 10,
    text: "Task #10",
    start_date: "2027-04-02",
    duration: 8,
    parent: 1
});

gantt.getTask(taskId).text = "Task #13"; // 태스크 데이터를 변경
gantt.updateTask(taskId); // 업데이트된 태스크를 렌더링합니다
~~~

### Details

:::note
이 메서드는 [`onAfterTaskUpdate`](api/event/onaftertaskupdate.md) 이벤트를 발생시킵니다.
:::

:::note
메서드는 dataProcessor가 활성화되어 있을 경우 [DataProcessor](api/method/dataprocessor.md)를 트리거합니다.
:::

이 메서드는 태스크 객체를 수정한 후 Gantt의 상태를 업데이트하고, 관련 UI 요소를 다시 렌더링하며 변경 사항을 백엔드로 전송하기 위해 호출해야 합니다.

이 메서드를 호출하면 [`onAfterTaskUpdate`](api/event/onaftertaskupdate.md) 이벤트가 발생하며, 이는 추가적인 재계산을 촉발할 수 있습니다.

만약 [DataProcessor](api/method/dataprocessor.md)를 사용 중이라면 이 메서드를 호출하면 서버로 **업데이트** 요청이 발생합니다.

저장할 필요 없이 시각적 변경을 원한다면, 대신 [`refreshTask()`](api/method/refreshtask.md) 메서드를 사용하세요.

~~~js {5}
gantt.templates.task_class = (startDate, endDate, task) => task.$active ? "active_task" : "";

gantt.attachEvent("onTaskClick", (taskId, event) => {
    gantt.getTask(taskId).$active = true;
    gantt.refreshTask(taskId);
});
~~~

다음 기존 태스크를 새 값으로 대체하려면 `updateTask()` 메서드의 두 번째 매개변수로 새 태스크 객체를 설정하면 됩니다:

~~~js
const updatedTask = {
    id: 2,
    text: 'New task text',
    start_date: new Date(2025, 3, 2),
    end_date: new Date(2025, 3, 4),
    $source: [1],
    $target: [2]
};

gantt.updateTask(2, updatedTask);
~~~

:::note
예시: [Updating task](https://snippet.dhtmlx.com/fnfpoiik)
:::

### Related API
- [updateLink](api/method/updatelink.md)
- [refreshLink](api/method/refreshlink.md)
- [refreshTask](api/method/refreshtask.md)

### Related Guides
- [Server-Side Integration](guides/server-side.md)
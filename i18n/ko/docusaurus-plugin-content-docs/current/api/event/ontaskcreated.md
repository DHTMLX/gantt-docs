---
sidebar_label: onTaskCreated
title: onTaskCreated event
description: "사용자가 그리드에서 '+' 버튼을 클릭하여 새 작업을 추가하거나 createTask 메서드가 호출될 때 발생합니다."
---

# onTaskCreated

### Description

@short: 사용자가 그리드에서 '+' 버튼을 클릭하여 새 작업을 추가하거나 [createTask](api/method/createtask.md) 메서드가 호출될 때 발생합니다.

@signature: onTaskCreated: (task: Task) =\> boolean;

### Parameters

- `task` - (required) *Task* - 새 작업 객체

### Returns
- ` result` - (boolean) - `false`를 반환하면 새 작업 생성이 중단되고, `true`를 반환하면 기본 프로세스가 계속 진행됩니다.

### Example

~~~jsx
gantt.attachEvent("onTaskCreated", function(task){
    task.projectId = 1;
    return true;
});
~~~

### Details

이 이벤트는 새 작업이 표시되기 직전에 발생하며, **기본값을 설정**하거나 **작업 생성을 취소**할 수 있는 기회를 제공합니다.

이 시점에서 새 작업은 이미 데이터스토어에 존재하며 [getTask](api/method/gettask.md) 메서드를 통해 접근할 수 있습니다.

이벤트 핸들러가 `false`를 반환하면, 작업은 [onAfterTaskDelete](api/event/onaftertaskdelete.md) 이벤트를 트리거하지 않고 데이터스토어에서 제거됩니다.

[createTask](api/method/createtask.md) 메서드를 통해 작업을 생성할 때 이벤트는 다음 순서로 발생합니다:

1. [onTaskCreated](api/event/ontaskcreated.md)
2. [onBeforeLightbox](api/event/onbeforelightbox.md)
3. [onLightbox](api/event/onlightbox.md)
4. [onAfterLightbox](api/event/onafterlightbox.md)
5. [onAfterTaskAdd](api/event/onaftertaskadd.md)
6. [onBeforeTaskAdd](api/event/onbeforetaskadd.md)

### Related API
- [createTask](api/method/createtask.md)
- [columns](api/config/columns.md)


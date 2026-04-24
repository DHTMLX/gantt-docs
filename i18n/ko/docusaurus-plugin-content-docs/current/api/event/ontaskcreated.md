---
sidebar_label: onTaskCreated
title: onTaskCreated 이벤트
description: "그리드에서 '+' 버튼을 눌러 사용자가 새 작업을 만들거나, createTask 메서드가 호출될 때 발생합니다"
---

# onTaskCreated

### Description

@short: 그리드에서 '+' 버튼을 눌러 사용자가 새 작업을 만들거나, [createTask](api/method/createtask.md) 메서드가 호출될 때 발생합니다

@signature: onTaskCreated: (task: Task) =\> boolean;

### Parameters

- `task` - (필수) *Task* - 새 작업의 객체

### Returns
- ` result` - (boolean) - 반환값이 `false`인 경우 새 작업의 생성을 취소하고, `true`를 반환하면 기본 처리가 계속됩니다

### Example

~~~jsx
gantt.attachEvent("onTaskCreated", function(task){
    task.projectId = 1;
    return true;
});
~~~

### Details

이벤트는 새 작업이 화면에 표시되기 전에 발생합니다. 이를 통해 기본값을 설정하거나 작업 생성 자체를 취소할 수 있습니다.

이벤트가 트리거될 때까지 새 작업은 [getTask](api/method/gettask.md) 메서드를 통해 데이터 저장소에서 이미 사용 가능하게 되어 있습니다.

이벤트 핸들러가 `false`를 반환하면 작업은 데이터 저장소에서 제거되고 [onAfterTaskDelete](api/event/onaftertaskdelete.md) 이벤트가 트리거되지 않습니다.

[createTask](api/method/createtask.md) 메서드로 작업을 생성할 때 발생하는 최종 이벤트 순서는 다음과 같습니다:

1. [onTaskCreated](api/event/ontaskcreated.md)
2. [onBeforeLightbox](api/event/onbeforelightbox.md)
3. [onLightbox](api/event/onlightbox.md)
4. [onAfterLightbox](api/event/onafterlightbox.md)
5. [onAfterTaskAdd](api/event/onaftertaskadd.md)
6. [onBeforeTaskAdd](api/event/onbeforetaskadd.md)

### Related API
- [createTask](api/method/createtask.md)
- [columns](api/config/columns.md)
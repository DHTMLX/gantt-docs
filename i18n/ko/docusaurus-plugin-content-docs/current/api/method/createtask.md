---
sidebar_label: createTask
title: createTask method
description: "새로운 작업을 추가하고 라이트박스를 열어 확인합니다"
---

# createTask

### Description

@short: 새로운 작업을 추가하고 라이트박스를 열어 확인합니다

@signature: createTask: (task?: NewTask, parent?: string | number, index?: number) =\> string | number

### Parameters

- `task` - (optional) *NewTask* - 선택 사항, 작업 객체
- `parent` - (optional) *string | number* -            선택 사항, 부모의 ID
- `index` - (optional) *number* - 선택 사항, 작업이 추가될 위치 (0 이상)

### Returns
- ` id` - (string, number) - 작업의 ID

### Example

~~~jsx
var taskId = gantt.createTask({
    id:10,
    text:"Task #5",
    start_date:"02-09-2013",
    duration:28
}, "project_2", 2);
~~~

### Details

*index* 파라미터에 0 이상의 값을 제공하면, 해당 작업은 브랜치 내에서 지정된 위치에 삽입됩니다. 
*index*가 지정되지 않으면, 작업은 브랜치의 끝에 추가됩니다.

이 메서드는 [onTaskCreated](api/event/ontaskcreated.md) 이벤트를 트리거합니다. 이 이벤트는 새 작업이 실제로 데이터셋에 추가되기 전에 발생하므로, 
예를 들어 사용자가 라이트박스에서 '취소' 버튼을 누르면 작업 저장을 완전히 취소할 수 있습니다.

createTask()로 작업을 생성할 때 발생하는 이벤트 순서는 다음과 같습니다:

1. [onTaskCreated](api/event/ontaskcreated.md)
2. [onBeforeLightbox](api/event/onbeforelightbox.md)
3. [onLightbox](api/event/onlightbox.md)
4. [onAfterLightbox](api/event/onafterlightbox.md)
5. [onAfterTaskAdd](api/event/onaftertaskadd.md)
6. [onBeforeTaskAdd](api/event/onbeforetaskadd.md)

### Related API
- [onTaskCreated](api/event/ontaskcreated.md)
- [addTask](api/method/addtask.md)

### Related Guides
- [작업의 기본 작업](guides/crud-task.md)


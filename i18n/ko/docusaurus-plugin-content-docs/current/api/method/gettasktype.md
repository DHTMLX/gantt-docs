---
sidebar_label: getTaskType
title: getTaskType method
description: "태스크의 유형을 반환합니다"
---

# getTaskType

### Description

@short: 태스크의 유형을 반환합니다

@signature: getTaskType: (task: Task) =\> string

### Parameters

- `task` - (required) *Task* - 태스크 객체

### Returns
- ` type` - (string) - 태스크의 유형

### Example

~~~jsx
var type = gantt.getTaskType(gantt.getTask(12));
~~~

### Details

- 만약 **task.type** 속성이 정의되어 있고 비어 있지 않으면, 이 속성의 값이 반환됩니다.
- 그렇지 않으면, **gantt.config.types.task**의 값이 대신 반환됩니다.

Since the **task.type** property is optional, you have to take into account that it may be empty when you check the type of the task in code, e.g.

~~~js
// BAD:
if (task.type === gantt.config.types.task){
    // code specific for task items
}
~~~

- **type** 속성이 없는 항목은 이 조건을 충족하지 못합니다. 이는 잘못된 것이며, 이러한 항목은 기본적으로 *task* 타입을 갖기 때문입니다.

대신 비어 있는 값을 위한 조건을 추가할 수 있습니다:

~~~js
// GOOD:
if (!task.type || task.type === gantt.config.types.task){
    // code specific for task items
}
~~~

또는 **getTaskType** 메서드를 사용하십시오: 

~~~js
// EVEN BETTER:
if (gantt.getTaskType(task) === gantt.config.types.task){
    // code specific for task items
}
~~~

이 코드는 명시적으로 타입이 지정된 모든 항목은 물론, Gantt 내부 로직에 의해 기본 타입이 할당된 항목에서도 작동합니다.

다음 메서드는 모든 유형의 항목에 대해 동일한 조건을 작성하고 잘못된 타입 탐지로 인한 잠재적 버그를 피하기 위한 안전한 방법으로 사용할 수 있습니다:

~~~js
switch (gantt.getTaskType(task)){
    case gantt.config.task:
        break;
    case gantt.config.project:
        break;
    case gantt.config.milestone:
        break;
}
~~~

### Related Guides
- [Task Types](guides/task-types.md)
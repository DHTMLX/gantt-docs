---
sidebar_label: getTaskType
title: getTaskType method
description: "작업의 유형을 반환합니다"
---

# getTaskType

### Description

@short: 작업의 유형을 반환합니다

@signature: getTaskType: (task: Task) =\> string

### Parameters

- `task` - (required) *Task* - 작업 객체

### Returns
- ` type` - (string) - 작업의 유형

### Example

~~~jsx
var type = gantt.getTaskType(gantt.getTask(12));
~~~

### Details

- **task.type** 속성이 설정되어 있고 비어 있지 않은 경우, 그 값을 반환합니다.
- **task.type**이 정의되어 있지 않거나 비어 있으면, 대신 **gantt.config.types.task**를 반환합니다.

**task.type** 속성은 선택 사항이므로, 코드에서 작업 유형을 확인할 때 비어 있을 수 있는 상황을 처리하는 것이 중요합니다. 예를 들어:

~~~js
// BAD:
if (task.type === gantt.config.types.task){
    // 작업 항목에 특화된 코드
}
~~~

- **type** 속성이 없는 작업은 이 조건을 만족하지 않으므로, 기본적으로 *task* 유형으로 간주되는 작업임에도 불구하고 올바르지 않은 결과가 됩니다.

더 나은 방법은 빈 값에 대한 확인을 포함하는 것입니다:

~~~js
// GOOD:
if (!task.type || task.type === gantt.config.types.task){
    // 작업 항목에 특화된 코드
}
~~~

또는, 더 좋은 방법으로 **getTaskType** 메서드를 사용하세요:

~~~js
// EVEN BETTER:
if (gantt.getTaskType(task) === gantt.config.types.task){
    // 작업 항목에 특화된 코드
}
~~~

이렇게 하면 명시적으로 유형이 설정된 작업과 Gantt가 내부적으로 기본 유형을 할당한 작업 모두에 대해 코드가 올바르게 작동합니다.

다음 메서드를 사용하여 작업 유형을 안정적으로 가져오고 모든 항목 유형을 포괄하는 조건을 작성할 수도 있습니다. 이렇게 하면 잘못된 유형 감지 문제를 피할 수 있습니다:

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
- [작업 유형](guides/task-types.md)

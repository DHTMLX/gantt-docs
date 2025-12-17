---
sidebar_label: getTaskType
title: getTaskType method
description: "возвращает тип задачи"
---

# getTaskType

### Description

@short: Возвращает тип задачи

@signature: getTaskType: (task: Task) =\> string

### Parameters

- `task` - (required) *Task* - объект задачи

### Returns
- ` type` - (string) - тип задачи

### Example

~~~jsx
var type = gantt.getTaskType(gantt.getTask(12));
~~~

### Details

- Если свойство **task.type** задано и не пусто, возвращается его значение.
- Если же **task.type** не определено или пусто, метод возвращает **gantt.config.types.task**.

Поскольку свойство **task.type** является необязательным, важно учитывать случаи, когда оно может быть пустым при проверке типа задачи в вашем коде, например:

~~~js
// ПЛОХО:
if (task.type === gantt.config.types.task){
    // код, специфичный для задач
}
~~~

- Задачи без свойства **type** не удовлетворят этому условию, что неверно, так как такие задачи по умолчанию считаются имеющими тип *task*.

Лучше добавить проверку на пустое значение:

~~~js
// ХОРОШО:
if (!task.type || task.type === gantt.config.types.task){
    // код, специфичный для задач
}
~~~

Или, что ещё лучше, использовать метод **getTaskType**:

~~~js
// ЕЩЁ ЛУЧШЕ:
if (gantt.getTaskType(task) === gantt.config.types.task){
    // код, специфичный для задач
}
~~~

Это гарантирует корректную работу кода как для задач с явно заданным типом, так и для тех, у которых тип назначен по умолчанию внутри Gantt.

Также вы можете использовать следующий метод как надёжный способ получения типа задачи и написания условий, охватывающих все типы элементов, избегая проблем с некорректным определением типа:

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
- [Типы задач](guides/task-types.md)

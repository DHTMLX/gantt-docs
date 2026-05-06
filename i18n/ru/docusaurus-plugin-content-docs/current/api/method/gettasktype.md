---
sidebar_label: getTaskType
title: getTaskType метод
description: "возвращает тип задачи"
---

# getTaskType

### Description

@short: Возвращает тип задачи

@signature: getTaskType: (task: Task) => string

### Parameters

- `task` - (обязателен) *Task* - объект задачи

### Returns
- `type` - (string) - тип задачи

### Example

~~~jsx
var type = gantt.getTaskType(gantt.getTask(12));
~~~

### Details

- Если **task.type** свойство определено и не пусто, будет возвращено значение этого свойства. 
- В противном случае будет возвращено значение **gantt.config.types.task**.

Поскольку свойство **task.type** является необязательным, следует учитывать, что оно может быть пустым при проверке типа задачи в коде, например.

~~~js
// BAD:
if (task.type === gantt.config.types.task){
    // code specific for task items
}
~~~

- Элементы, у которых нет свойства **type**, не будут соответствовать этому условию. Это было бы неверно, потому что такие элементы по умолчанию имеют тип *task*.

Вместо этого можно либо добавить условие для пустых значений:

~~~js
// GOOD:
if (!task.type || task.type === gantt.config.types.task){
    // code specific for task items
}
~~~

Или использовать метод **getTaskType**: 

~~~js
// EVEN BETTER:
if (gantt.getTaskType(task) === gantt.config.types.task){
    // code specific for task items
}
~~~

Код будет работать как для элементов, которые явно имеют заданный тип, так и для элементов, которым дефолтный тип назначается внутренней логикой Gantt.

Следующий метод можно использовать как безопасный способ получения типов задач, чтобы записывать одинаковые условия для всех типов элементов и избегать потенциальных ошибок с определением типа:

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
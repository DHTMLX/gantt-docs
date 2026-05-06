---
sidebar_label: createTask
title: createTask method
description: "добавляет новую задачу и открывает lightbox для подтверждения"
---

# createTask

### Description

@short: Добавляет новую задачу и открывает lightbox для подтверждения

@signature: createTask: (task?: NewTask, parent?: string | number, index?: number) =\> string | number

### Parameters

- `task`    -	 (optional) *NewTask*	- необязательный, объект задачи
- `parent`	-	(optional) *string | number*	- необязательный, идентификатор родителя
- `index`	-	(optional) *number*	- необязательный, позиция, в которую будет добавлена задача (0 или больше)

### Returns
- ` id` - (string, number) - идентификатор задачи

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

Если параметр *index* имеет значение 0 или больше, задача будет добавлена в указанную позицию в ветке.
В противном случае задача будет добавлена в конец ветви задач.

Метод вызывает событие [onTaskCreated](api/event/ontaskcreated.md). Примечание: событие срабатывает до того, как новая задача будет добавлена в набор данных, что позволяет отменить сохранение этой задачи вообще, например, если пользователь нажимает кнопку 'Cancel' в lightbox.

Окончательный порядок событий, которые срабатывают при создании задачи с помощью метода createTask():

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
- [Основные операции с задачами](guides/crud-task.md)
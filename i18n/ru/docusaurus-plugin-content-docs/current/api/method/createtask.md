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

- `task` - (optional) *NewTask* - опционально, объект задачи
- `parent` - (optional) *string | number* -            опционально, id родителя
- `index` - (optional) *number* - опционально, позиция, на которую будет добавлена задача (0 или больше)

### Returns
- ` id` - (string, number) - id задачи

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

Если вы указываете параметр *index* со значением 0 или больше, задача будет вставлена именно на эту позицию внутри ветки. 
Если параметр *index* не указан, задача будет просто добавлена в конец ветки.

Этот метод вызывает событие [onTaskCreated](api/event/ontaskcreated.md). Обратите внимание, что это событие происходит до того, как новая задача фактически добавлена в набор данных, 
что означает, что вы можете отменить сохранение задачи - например, если пользователь нажимает кнопку «Отмена» в lightbox.


Последовательность событий при создании задачи через createTask():

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
- [Базовые операции с задачами](guides/crud-task.md)


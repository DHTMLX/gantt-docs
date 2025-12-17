---
sidebar_label: onTaskCreated
title: onTaskCreated event
description: "вызывается, когда пользователь добавляет новую задачу, нажимая кнопку '+' в grid, или когда вызывается метод createTask"
---

# onTaskCreated

### Description

@short: Вызывается, когда пользователь добавляет новую задачу, нажимая кнопку '+' в grid, или когда вызывается метод [createTask](api/method/createtask.md)

@signature: onTaskCreated: (task: Task) =\> boolean;

### Parameters

- `task` - (required) *Task* - объект новой задачи

### Returns
- ` result` - (boolean) - возврат `false` остановит создание новой задачи, возврат `true` позволит продолжить стандартный процесс

### Example

~~~jsx
gantt.attachEvent("onTaskCreated", function(task){
    task.projectId = 1;
    return true;
});
~~~

### Details

Это событие происходит непосредственно перед отображением новой задачи, давая вам возможность **установить значения по умолчанию** или **отменить создание задачи**.

На этом этапе новая задача уже существует в datastore и может быть получена с помощью метода [getTask](api/method/gettask.md).

Если обработчик события возвращает `false`, задача удаляется из datastore без вызова события [onAfterTaskDelete](api/event/onaftertaskdelete.md).

При создании задачи через метод [createTask](api/method/createtask.md) события происходят в следующем порядке:

1. [onTaskCreated](api/event/ontaskcreated.md) 
2. [onBeforeLightbox](api/event/onbeforelightbox.md) 
3. [onLightbox](api/event/onlightbox.md) 
4. [onAfterLightbox](api/event/onafterlightbox.md) 
5. [onAfterTaskAdd](api/event/onaftertaskadd.md) 
6. [onBeforeTaskAdd](api/event/onbeforetaskadd.md)

### Related API
- [createTask](api/method/createtask.md)
- [columns](api/config/columns.md)


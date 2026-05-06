---
sidebar_label: onTaskCreated
title: onTaskCreated event
description: "fires when a user creates a new task by pressing the'+' button in a grid, or when the createTask method is called"
---

# onTaskCreated

### Description

@short: Вызывается, когда пользователь создает новую задачу нажатие кнопки '+' в grid, или когда вызывается метод [createTask](api/method/createtask.md)

@signature: onTaskCreated: (task: Task) =\> boolean;

### Parameters

- `task` - (обязательный) *Task* - объект новой задачи

### Returns
- ` result` - (boolean) - возвращает `false`, что отменяет создание новой задачи; возвращает `true`, что продолжает выполнение обработки по умолчанию

### Example

~~~jsx
gantt.attachEvent("onTaskCreated", function(task){
    task.projectId = 1;
    return true;
});
~~~

### Details

Событие срабатывает до отображения новой задачи, что позволяет вам **установить значения по умолчанию** или **отменить создание** задачи.

К моменту срабатывания этого события новая задача уже доступна в datastore через метод [getTask](api/method/gettask.md).

Если обработчик события возвращает `false`, задача будет удалена из datastore без срабатывания события [onAfterTaskDelete](api/event/onaftertaskdelete.md).

Окончательный порядок срабатывания событий, которые происходят при создании задачи с помощью метода [createTask](api/method/createtask.md):

1. [onTaskCreated](api/event/ontaskcreated.md)
2. [onBeforeLightbox](api/event/onbeforelightbox.md)
3. [onLightbox](api/event/onlightbox.md)
4. [onAfterLightbox](api/event/onafterlightbox.md)
5. [onAfterTaskAdd](api/event/onaftertaskadd.md)
6. [onBeforeTaskAdd](api/event/onbeforetaskadd.md)

### Related API
- [createTask](api/method/createtask.md)
- [columns](api/config/columns.md)
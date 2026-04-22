---
sidebar_label: onBeforeTaskUpdate
title: onBeforeTaskUpdate event
description: "срабатывает до того, как пользователь обновляет задачу"
---

# onBeforeTaskUpdate

### Description

@short: Срабатывает до того, как пользователь обновляет задачу

@signature: onBeforeTaskUpdate: (id: string | number, new_task: Task) =\> void;

### Parameters

- `id` - (обязательно) *string | number* - идентификатор задачи
- `new_task` - (обязательно) *Task* - новый (обновлённый) объект задачи

### Example

~~~jsx
gantt.attachEvent("onBeforeTaskUpdate", function(id,new_task){
    // любая ваша логика здесь
});
~~~

### Details

При использовании события **onBeforeTaskUpdate** не всегда возможно получить объект задачи до того, как задача будет полностью обновлена. Событие срабатывает после обновления объекта задачи, но до применения всех изменений.
Чтобы получить объект задачи до применения изменений, нужно использовать обработчики событий, которые непосредственно связаны с изменениями задачи:

- [onLightboxSave](api/event/onlightboxsave.md)
- [onBeforeTaskDrag](api/event/onbeforetaskdrag.md)
- [Inline Editors Extension](guides/inline-editors-ext.md#events)
- [onBeforeTaskAutoSchedule](api/event/onbeforetaskautoschedule.md)
- [onRowDragStart](api/event/onrowdragstart.md)

Если изменения выполняются через API, вы можете получить объект задачи до того, как будет выполнен код, который изменяет задачу. Посмотрите пример, где вы можете изменить задачу различными способами (например, изменить даты задачи):

:::note
sample: [Обновление задачи](https://snippet.dhtmlx.com/9xy8wr2a)
::: 

После сравнения вы увидите, что события, которые срабатывают непосредственно перед изменением задачи, возвращают старый объект задачи, в то время как событие **onBeforeTaskUpdate** возвращает новый объект задачи.

### Related API
- [updateTask](api/method/updatetask.md)
- [onAfterTaskUpdate](api/event/onaftertaskupdate.md)
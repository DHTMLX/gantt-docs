---
sidebar_label: onBeforeTaskUpdate
title: onBeforeTaskUpdate event
description: "срабатывает непосредственно перед обновлением задачи пользователем"
---

# onBeforeTaskUpdate

### Description

@short: Срабатывает непосредственно перед обновлением задачи пользователем

@signature: onBeforeTaskUpdate: (id: string | number, new_task: Task) =\> void;

### Parameters

- `id` - (required) *string | number* - идентификатор задачи
- `new_task` - (required) *Task* - обновлённый объект задачи

### Example

~~~jsx
gantt.attachEvent("onBeforeTaskUpdate", function(id,new_task){
    // здесь можно добавить пользовательскую логику
});
~~~

### Details

Событие **onBeforeTaskUpdate** срабатывает после того, как объект задачи был обновлён, но до того, как все изменения полностью применятся, поэтому не всегда возможно получить объект задачи в его состоянии до обновления.

Чтобы получить объект задачи до применения изменений, рекомендуется использовать обработчики событий, которые специально связаны с модификациями задачи:

- [onLightboxSave](api/event/onlightboxsave.md)
- [onBeforeTaskDrag](api/event/onbeforetaskdrag.md)
- [Inline Editors Extension](guides/inline-editors-ext.md#events)
- [onBeforeTaskAutoSchedule](api/event/onbeforetaskautoschedule.md)
- [onRowDragStart](api/event/onrowdragstart.md)

Если изменения выполняются через API, вы можете получить доступ к объекту задачи до запуска кода модификации. В следующем примере показаны разные способы обновления задачи, например, изменение её дат:

:::note
Sample: [Обновление задачи](https://snippet.dhtmlx.com/9xy8wr2a) 
:::

Сравнивая эти события, вы увидите, что события, срабатывающие непосредственно перед изменением задачи, предоставляют старый объект задачи, тогда как **onBeforeTaskUpdate** предоставляет обновлённый объект задачи.

### Related API
- [updateTask](api/method/updatetask.md)
- [onAfterTaskUpdate](api/event/onaftertaskupdate.md)


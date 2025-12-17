---
sidebar_label: placeholder_task
title: placeholder_task config
description: "добавляет пустую строку в конце списка задач, чтобы упростить редактирование задач с клавиатуры"
---

# placeholder_task

### Description

@short: Добавляет пустую строку в конце списка задач, чтобы упростить редактирование задач с клавиатуры

@signature: placeholder_task: any

### Example

~~~jsx
gantt.config.placeholder_task = true;

// или
gantt.config.placeholder_task = {
   // переводит фокус на placeholder задачу после добавления новой задачи
   focusOnCreate: true
};
~~~

**Default value:** false

### Related samples
- [Inline editing - keyboard navigation mode](https://docs.dhtmlx.com/gantt/samples/07_grid/12_inline_edit_key_nav.html)

### Details

- В конце списка задач автоматически добавляется пустая placeholder задача.
- Когда placeholder редактируется через UI и вызывается **gantt.updateTask()**, в конец списка добавляется новая задача.
- Вы можете определить placeholder, проверив его свойство type:

~~~js
if(task.type == gantt.config.types.placeholder){
   // выполнить нужные действия
}
~~~


- Gantt вызывает события [onTaskCreated](api/event/ontaskcreated.md) и [onAfterTaskAdd](api/event/onaftertaskadd.md) при добавлении placeholder.
- [gantt.dataProcessor](guides/server-side.md) сгенерирует событие **onBeforeUpdate** для placeholder, но не отправит запросы на backend.

### Related Guides
- [Редактирование 'на месте' в гриде](guides/inline-editing.md#inlineeditingmodes)


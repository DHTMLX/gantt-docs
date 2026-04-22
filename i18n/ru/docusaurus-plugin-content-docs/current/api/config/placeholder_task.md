---
sidebar_label: placeholder_task
title: конфигурация placeholder_task
description: "добавляет пустую строку в конец списка задач, чтобы упростить редактирование задач с помощью клавиатуры"
---

# placeholder_task

### Description

@short: Добавляет пустую строку в конец списка задач, чтобы упростить редактирование задач с помощью клавиатуры

@signature: placeholder_task: any

### Example

~~~jsx
gantt.config.placeholder_task = true;

// or
gantt.config.placeholder_task = {
   // перемещает фокус на задачу-заглушку после добавления новой задачи
   focusOnCreate: true
};
~~~

**Значение по умолчанию:** false

### Related samples
- [Редактирование в Grid - режим навигации клавиатурой](https://docs.dhtmlx.com/gantt/samples/07_grid/12_inline_edit_key_nav.html)

### Details

- Задача-заглушка будет автоматически добавляться в конец списка задач.
- Как только она будет изменена через пользовательский интерфейс и получит вызов **gantt.updateTask()**, в конец списка будет добавлена новая задача.
- Задача-заглушка определяется по значению типа:

~~~js
if(task.type == gantt.config.types.placeholder){
   // сделать что-то
}
~~~

- Gantt будет инициировать события [onTaskCreated] и [onAfterTaskAdd] при вставке задачи-заглушки.
- [gantt.dataProcessor](guides/server-side.md) будет вызывать событие **onBeforeUpdate** для задачи-заглушки, но не будет выполнять запросы к бэкенду.

### Related Guides
- [Редактирование в Grid](guides/inline-editing.md#inline-editing-modes)
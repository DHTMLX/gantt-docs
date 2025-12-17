---
sidebar_label: addTask
title: addTask method
description: "добавляет новую задачу"
---

# addTask

### Description

@short: Добавляет новую задачу

@signature: addTask: (task: NewTask, parent?: string | number, index?: number) =\> string | number

### Parameters

- `task` - (required) *NewTask* - объект задачи
- `parent` - (optional) *string | number* -            опционально, id родительской задачи
- `index` - (optional) *number* - опционально, позиция, на которую будет вставлена задача (0 или больше)

### Returns
- ` id` - (string, number) - id задачи

### Example

~~~jsx
const taskId = gantt.addTask({
    id: 10,
    text: "Task #5",
    start_date: "02-09-2025",
    duration: 28
}, "project_2", 1);
~~~

### Details

Если вы укажете параметр *index* со значением 0 или больше, задача будет вставлена именно в эту позицию внутри ветки. 
Если параметр опущен, задача будет добавлена в конец ветки.

Этот метод вызывает события [onBeforeTaskAdd](api/event/onbeforetaskadd.md) и [onAfterTaskAdd](api/event/onaftertaskadd.md).

Учтите, если вы хотите избежать сохранения задачи - например, если пользователь отменяет действие в lightbox - рассмотрите возможность использования метода [createTask](api/method/createtask.md), который вызывает событие [onTaskCreated](api/event/ontaskcreated.md).


## Предотвращение добавления задач на определённые уровни
Простой способ запретить пользователям добавлять подзадачи под определёнными задачами - скрыть кнопку 'Add' с помощью CSS.

1. Для начала назначьте CSS класс каждой строке задачи, используя шаблон [grid_row_class](api/template/grid_row_class.md):
~~~js
gantt.templates.grid_row_class = (start, end, task) => {
    if (task.$level > 1) {
        return "nested_task";
    }
    return "";
};
~~~
2. >Затем скройте кнопку 'Add' для этих строк:

~~~css
.nested_task .gantt_add{
    display: none !important;
}
~~~


:::note
Sample: [Predefined Project Structure](https://docs.dhtmlx.com/gantt/samples/08_api/11_project_structure.html)
:::

### Related API
- [createTask](api/method/createtask.md)
- [addLink](api/method/addlink.md)
- [onAfterTaskAdd](api/event/onaftertaskadd.md)
- [onBeforeTaskAdd](api/event/onbeforetaskadd.md)

### Related Guides
- [Базовые операции с задачами](guides/crud-task.md)


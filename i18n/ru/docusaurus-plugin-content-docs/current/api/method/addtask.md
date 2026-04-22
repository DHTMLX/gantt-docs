---
sidebar_label: addTask
title: addTask method
description: "adds a new task"
---

# addTask

### Description

@short: Добавляет новую задачу

@signature: addTask: (task: NewTask, parent?: string | number, index?: number) => string | number

### Parameters

- `task` - (required) *NewTask* - объект задачи
- `parent` - (optional) *string | number* - идентификатор родителя
- `task` - (optional) *number* - позиция, в которую будет добавлена задача (0 и далее)

### Returns
- ` id` - (string, number) - идентификатор задачи

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

Если вы укажете параметр *index* со значением 0 и выше, задача будет добавлена в указанную позицию в ветке.  
В противном случае задача будет добавлена в конец ветки задач.

Метод вызывает события [onBeforeTaskAdd](api/event/onbeforetaskadd.md) и [onAfterTaskAdd](api/event/onaftertaskadd.md).

Примечание: если вы не хотите сохранять задачу в случае, например, когда пользователь нажимает кнопку "Cancel" в lightbox,  
используйте метод [createTask](api/method/createtask.md) и событие [onTaskCreated](api/event/ontaskcreated.md), которое генерирует этот метод.

## Предотвращение добавления задач на определённых уровнях
Очень простой способ помешать пользователям добавлять подзадачи к конкретным задачам — скрыть кнопку "Add" с помощью CSS.


Сначала назначьте CSS-класс для каждой строки задачи, используя шаблон [grid_row_class](api/template/grid_row_class.md):
~~~js
gantt.templates.grid_row_class = (start, end, task) => {
    if (task.$level > 1) {
        return "nested_task";
    }
    return "";
};
~~~ 

Затем скройте кнопку 'Add' для таких строк:

~~~css
.nested_task .gantt_add{
    display: none !important;
}
~~~ 

:::note
пример [Предопределенная структура проекта](https://docs.dhtmlx.com/gantt/samples/08_api/11_project_structure.html)
:::

### Related API
- [createTask](api/method/createtask.md)
- [addLink](api/method/addlink.md)
- [onAfterTaskAdd](api/event/onaftertaskadd.md)
- [onBeforeTaskAdd](api/event/onbeforetaskadd.md)

### Related Guides
- [Basic Operations with Tasks](guides/crud-task.md)
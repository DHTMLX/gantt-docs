---
sidebar_label: refreshTask
title: refreshTask method
description: "обновляет задачу и связанные с ней ссылки"
---

# refreshTask

### Description

@short: Обновляет задачу и связанные с ней ссылки

@signature: refreshTask: (id: string | number, refresh_links?: boolean) =\> void

### Parameters

- `id` - (required) *string | number* -            идентификатор задачи
- `refresh_links` - (optional) *boolean* - необязательный параметр, определяет, должны ли быть обновлены связанные с задачей ссылки, по умолчанию <em>true</em>

### Example

~~~jsx
gantt.addTask({
    id:10,
    text:"Task #5",
    start_date:"02-09-2013",
    duration:28
}, "project_2");

var task = gantt.getTask(10);

task.text = "Task #10"; /*!*/
gantt.refreshTask(10);       /*!*/
~~~

### Details

Этот метод используется для перерисовки задачи после изменения её свойств. В отличие от [updateTask](api/method/updatetask.md), он не вызывает [DataProcessor](guides/server-side.md), поэтому обновления не будут отправлены на сервер.

### Related API
- [refreshLink](api/method/refreshlink.md)
- [refreshData](api/method/refreshdata.md)
- [updateTask](api/method/updatetask.md)
- [updateLink](api/method/updatelink.md)

### Related Guides
- [Базовые операции с задачами](guides/crud-task.md)


---
title: "Незапланированные задачи"
sidebar_label: "Незапланированные задачи"
---

# Незапланированные задачи

Есть возможность добавлять задачи без дат в Gantt-график.

![unscheduled_tasks](/img/unscheduled_tasks.png)

Это можно реализовать, установив свойство **unscheduled** со значением *true* в описании задачи:

~~~js
{"id":1, "text":"Project #1", "type":"project", "progress": 0.6, "open": true},
{"id":2, "text":"Task #1", "unscheduled":false, "start_date":"02-04-2019", "parent":"1"},
{"id":3, "text":"Task #2", "unscheduled":true,"start_date":"","duration":"","parent":"1"}
~~~

Таким образом, задача с идентификатором "3" будет добавлена в Gantt-график без даты начала и будет отображаться как пустая строка.

Чтобы отображать незапланированные задачи, используйте параметр конфигурации [show_unscheduled](api/config/show_unscheduled.md), установленный в *false*:

~~~js
gantt.config.show_unscheduled = false;
~~~

Примечание: что Gantt присваивает даты по умолчанию незапланированным задачам. Это означает, что свойства **start_date/end_date** таких объектов задач не будут пустыми:

~~~js
var task = gantt.getTask(3);
console.log(task.unscheduled);
// true

console.log(task.start_date);
// Tue Jun 25 2019 18:42:50
~~~

[Показать незапланированные задачи](https://docs.dhtmlx.com/gantt/samples/01_initialization/19_tasks_without_dates.html)
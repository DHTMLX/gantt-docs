---
title: "Незапланированные задачи"
sidebar_label: "Незапланированные задачи"
---

# Незапланированные задачи

В Gantt можно добавить задачи без указанных дат.

![unscheduled_tasks](/img/unscheduled_tasks.png)

Это достигается путем установки свойства **unscheduled** в *true* в описании задачи:

~~~js
{"id":1, "text":"Project #1", "type":"project", "progress": 0.6, "open": true},
{"id":2, "text":"Task #1", "unscheduled":false, "start_date":"02-04-2019", "parent":"1"},
{"id":3, "text":"Task #2", "unscheduled":true,"start_date":"","duration":"","parent":"1"}
~~~

В результате задача с id "3" появится в Gantt без даты начала и будет показана как пустая строка.

Чтобы включить отображение незапланированных задач, измените параметр конфигурации [show_unscheduled](api/config/show_unscheduled.md) на *false*:

~~~js
gantt.config.show_unscheduled = false;
~~~

Имейте в виду, что Gantt будет назначать незапланированным задачам даты по умолчанию. Это значит, что свойства **start_date/end_date** для этих задач не будут оставаться пустыми:

~~~js
var task = gantt.getTask(3);
console.log(task.unscheduled);
// true

console.log(task.start_date);
// Tue Jun 25 2019 18:42:50
~~~


[Show Unscheduled Tasks](https://docs.dhtmlx.com/gantt/samples/01_initialization/19_tasks_without_dates.html)


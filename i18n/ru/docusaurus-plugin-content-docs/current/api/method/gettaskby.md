---
sidebar_label: getTaskBy
title: метод getTaskBy
description: "находит задачу по заданным критериям"
---

# getTaskBy

### Description

@short: Находит задачу по заданным критериям

@signature: getTaskBy: (propertyName: string | GanttCallback, propertyValue?: string | number | boolean | any[], types?: any) =\> Array\<Task\>

### Parameters

- `propertyName` - (required) *string | function* - имя свойства, по которому следует сопоставлять, или функция фильтра
- `propertyValue` - (optional) *string | number | boolean | array* - значение свойства
- `types` - (optional) *object* - объект, содержащий типы возвращаемых задач

### Returns
- ` tasks` - (Array &lt;Task&gt;) - массив объектов Task

### Example

~~~jsx
// simple search
const userTasks = gantt.getTaskBy("user_id", [5]);

// (task: object) => boolean
let userTasks = gantt.getTaskBy(function(task){
   return task.user_id == 5 || !task.user_id;
});

userTasks = gantt.getTaskBy(task => task.user_id == 5);
~~~

### Related samples
- [Шаблоны диаграммы ресурсов](https://docs.dhtmlx.com/gantt/samples/11_resources/05_resource_usage_templates.html)

### Details

- Метод можно использовать для отбора задач по значению свойства, например, чтобы найти задачи конкретного пользователя, найти выполненные задачи и т. д.
- `gantt.getTaskBy(propertyName, propertyValue)` использует нестрогое сравнение ("double equals", ==)
- Результат `gantt.getTaskBy(propertyName, propertyValue)` может быть закэширован gantt, что делает этот перегруженный вариант быстрее, чем `gantt.getTaskBy((task: object) => boolean)`

By default **gantt.getTaskBy()** returns only task and milestone items that match the criteria, while project items are omitted.

Чтобы выбрать записи всех типов, используйте следующее значение третьего параметра:

~~~js
gantt.getTaskBy("progress", 1, { task: true, project: true, milestone: true });
~~~

Чтобы вернуть элементы только конкретного типа, укажите значение типа в третьем параметре:

~~~js
gantt.getTaskBy("progress", 1, { project: true})
~~~

### Связанные API
- [getSubtaskDuration](api/method/getsubtaskduration.md)
- [getSubtaskDates](api/method/getsubtaskdates.md)

### Change log
- параметр **types** был добавлен в версии v8.0
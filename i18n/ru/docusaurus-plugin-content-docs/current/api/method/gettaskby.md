---
sidebar_label: getTaskBy
title: getTaskBy method
description: "осуществляет поиск задачи на основе заданных критериев"
---

# getTaskBy

### Description

@short: Осуществляет поиск задачи на основе заданных критериев

@signature: getTaskBy: (propertyName: string | GanttCallback, propertyValue?: string | number | boolean | any[], types?: any) =\> Array\<Task\>

### Parameters

- `propertyName` - (required) *string | function* -            свойство для поиска или функция фильтрации
- `propertyValue` - (optional) *string | number | boolean | array* -        значение для совпадения по свойству
- `types` - (optional) *object* - объект, указывающий, какие типы задач включать в результаты

### Returns
- ` tasks` - (Array &lt;Task&gt;) - массив объектов задач, соответствующих критериям

### Example

~~~jsx
// базовый поиск
const userTasks = gantt.getTaskBy("user_id", [5]);

// использование функции фильтрации
let userTasks = gantt.getTaskBy(function(task){
   return task.user_id == 5 || !task.user_id;
});

userTasks = gantt.getTaskBy(task => task.user_id == 5);
~~~

### Related samples
- [Templates of the Resource diagram](https://docs.dhtmlx.com/gantt/samples/11_resources/05_resource_usage_templates.html)

### Details

- Этот метод позволяет выбрать задачи на основе значения свойства, например, найти задачи, назначенные определённому пользователю, или задачи, которые завершены.
- При вызове `gantt.getTaskBy(propertyName, propertyValue)` используется нестрогое сравнение ("двойное равно", ==).
- Результаты вызова `gantt.getTaskBy(propertyName, propertyValue)` могут кэшироваться gantt, что делает этот вариант потенциально более быстрым по сравнению с использованием функции фильтрации `gantt.getTaskBy((task: object) => boolean)`.

По умолчанию **gantt.getTaskBy()** возвращает только задачи и вехи, соответствующие критериям, исключая элементы проектов.

Чтобы включить все типы записей, используйте третий параметр:

~~~js
gantt.getTaskBy("progress", 1, { task: true, project: true, milestone: true });
~~~

Чтобы получить только определённый тип элемента, укажите его в третьем параметре:

~~~js
gantt.getTaskBy("progress", 1, { project: true})
~~~

### Related API
- [getSubtaskDuration](api/method/getsubtaskduration.md)
- [getSubtaskDates](api/method/getsubtaskdates.md)

### Change log
- параметр **types** был добавлен в версии v8.0


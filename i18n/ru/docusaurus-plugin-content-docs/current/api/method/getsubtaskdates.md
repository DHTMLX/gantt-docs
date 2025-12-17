---
sidebar_label: getSubtaskDates
title: getSubtaskDates method
description: "вычисляет объединённые даты начала/окончания задач, вложенных в проект или другую задачу"
---

# getSubtaskDates

### Description

@short: Вычисляет объединённые даты начала/окончания задач, вложенных в проект или другую задачу

@signature: getSubtaskDates: (task_id?: string | number) =\> any

### Parameters

- `task_id` - (optional) *string | number* -        ID задачи, будет использован [root_id](api/config/root_id.md), если не указан

### Returns
- ` dates` - (object) - объект, содержащий свойства <b>start_date</b> и <b>end_date</b>

### Example

~~~jsx
// длительность всего проекта
let dates = gantt.getSubtaskDates();
const dateToStr = gantt.templates.task_date;
    
console.log(`${dateToStr(dates.start_date)} - ${dateToStr(dates.end_date)}`);

// длительность подпроекта
dates = gantt.getSubtaskDates(1);
    
console.log(`${dateToStr(dates.start_date)} - ${dateToStr(dates.end_date)}`);
~~~

### Details

Этот метод возвращает объект, который показывает дату начала самой ранней подзадачи и дату окончания самой поздней подзадачи.

Возвращаемый объект выглядит следующим образом:

~~~js
{
  start_date: Date|null,
  end_date: Date|null
}
~~~

Если в диаграмме Ганта присутствуют запланированные задачи, оба свойства будут содержать значения дат. Если диаграмма пуста или содержит только незапланированные задачи, оба свойства будут равны `null`.

### Related API
- [getSubtaskDuration](api/method/getsubtaskduration.md)
- [getTaskBy](api/method/gettaskby.md)


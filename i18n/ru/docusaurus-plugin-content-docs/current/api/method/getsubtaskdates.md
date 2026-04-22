---
sidebar_label: getSubtaskDates
title: Метод getSubtaskDates
description: "вычисляет объединенные даты начала и окончания задач, вложенных в проект или другую задачу"
---

# getSubtaskDates

### Description

@short: Вычисляет объединенные даты начала и окончания задач, вложенных в проект или другую задачу

@signature: getSubtaskDates: (task_id?: string | number) =\> any

### Parameters

- `task_id` - (optional) *string | number* - идентификатор задачи; если он не указан, будет использоваться [root_id](api/config/root_id.md)

### Returns
- `dates` - (object) - объект, содержащий свойства <b>start_date</b> и <b>end_date</b>

### Example

~~~jsx
// duration of the whole project
let dates = gantt.getSubtaskDates();
const dateToStr = gantt.templates.task_date;
    
console.log(`${dateToStr(dates.start_date)} - ${dateToStr(dates.end_date)}`);

// duration of the subproject
dates = gantt.getSubtaskDates(1);
    
console.log(`${dateToStr(dates.start_date)} - ${dateToStr(dates.end_date)}`);
~~~

### Details

Метод возвращает объект, содержащий дату начала самой ранней подзадачи и дату окончания самой поздней подзадачи.

Объект возврата имеет следующий формат:

~~~js
{
  start_date: Date|null,
  end_date: Date|null
}
~~~

Если у диаграммы Ганта есть запланированные задачи, обе свойства будут иметь значения даты. Если диаграмма Ганта пустая или содержит только незапланированные задачи, обе свойства будут иметь значение `null`.

### Related API
- [getSubtaskDuration](api/method/getsubtaskduration.md)
- [getTaskBy](api/method/gettaskby.md)
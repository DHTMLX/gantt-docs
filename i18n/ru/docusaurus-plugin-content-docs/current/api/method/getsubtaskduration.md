---
sidebar_label: getSubtaskDuration
title: метод getSubtaskDuration
description: "вычисляет общую продолжительность задач, вложенных в проект или другую задачу."
---

# getSubtaskDuration

### Description

@short: Вычисляет общую продолжительность задач, вложенных в проект или другую задачу.

@signature: getSubtaskDuration: (task_id?: string | number) =\> number

### Parameters

- `task_id` - (optional) *string | number* - идентификатор задачи, [root_id](api/config/root_id.md) будет использоваться, если не указан

### Returns
- ` duration` - (number) - общая продолжительность вложенных задач

### Example

~~~jsx
const formatter = gantt.ext.formatters.durationFormatter();
//duration of the whole project
let duration = gantt.getSubtaskDuration();
    
console.log(formatter.format(duration));

//duration of the subproject
duration = gantt.getSubtaskDates(1);
    
console.log(formatter.format(duration));
~~~

### Details

Вычисляет общую продолжительность задач, вложенных в проект или другую задачу.

Задачи типа [тип проекта](api/config/types.md) не учитываются в общей продолжительности.

Возвращаемое значение вычисляется в [единицах продолжительности](api/config/duration_unit.md) из конфигурации.

### Related API
- [getSubtaskDates](api/method/getsubtaskdates.md)
- [getTaskBy](api/method/gettaskby.md)

### Related Guides
- [Расширение форматтеров](guides/formatters-ext.md#durationformatter)
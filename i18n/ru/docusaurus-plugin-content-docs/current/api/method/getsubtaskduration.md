---
sidebar_label: getSubtaskDuration
title: getSubtaskDuration method
description: "вычисляет общую длительность задач, вложенных в проект или другую задачу."
---

# getSubtaskDuration

### Description

@short: Вычисляет общую длительность задач, вложенных в проект или другую задачу.

@signature: getSubtaskDuration: (task_id?: string | number) =\> number

### Parameters

- `task_id` - (optional) *string | number* -       идентификатор задачи; если не указан, по умолчанию будет использован [root_id](api/config/root_id.md)

### Returns
- ` duration` - (number) - общая длительность вложенных задач

### Example

~~~jsx
const formatter = gantt.ext.formatters.durationFormatter();
//длительность всего проекта
let duration = gantt.getSubtaskDuration();
    
console.log(formatter.format(duration));

//длительность субпроекта
duration = gantt.getSubtaskDates(1);
    
console.log(formatter.format(duration));
~~~

### Details

Этот метод вычисляет общую длительность всех задач, вложенных внутри проекта или другой задачи.

Обратите внимание, что задачи типа [project](api/config/types.md) исключаются из этого итога.

Возвращаемое значение указано в [единицах длительности](api/config/duration_unit.md), определённых в конфигурации.

### Related API
- [getSubtaskDates](api/method/getsubtaskdates.md)
- [getTaskBy](api/method/gettaskby.md)

### Related Guides
- [Расширение Formatters](guides/formatters-ext.md#durationformatter)


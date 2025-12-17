---
sidebar_label: calendar_property
title: calendar_property config
description: "устанавливает имя свойства, используемого для связывания календаря с задачей или группой задач"
---

# calendar_property

### Description

@short: Устанавливает имя свойства, используемого для связывания календаря с задачей или группой задач

@signature: calendar_property: string

### Example

~~~jsx
gantt.config.calendar_property = "property_name";
~~~

### Details

введено в версии 4.2

По умолчанию эта опция установлена в значение "calendar_id".

~~~js
{
    "id":2, 
    "calendar_id":"custom", 
    "text":"Task #1", 
    "start_date":"02-04-2013", 
    "duration":"8", 
    "parent":"1", 
    "progress":0.5, 
    "open": true
}
~~~

### Related API
- [work_time](api/config/work_time.md)
- [setWorkTime](api/method/setworktime.md)
- [isWorkTime](api/method/isworktime.md)

### Related Guides
- [Расчёт рабочего времени](guides/working-time.md#unsettingtheworkingtime)


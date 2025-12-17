---
sidebar_label: createCalendar
title: createCalendar method
description: "создаёт функциональный календарь"
---

# createCalendar

### Description

@short: Создаёт функциональный календарь

@signature: createCalendar: (parentCalendar?: Calendar) =\> Calendar

### Parameters

- `parentCalendar` - (optional) *Calendar* - (необязательно) существующий календарь, на основе которого будет создан новый

### Returns
- ` calendar` - (Calendar) - объект Calendar

### Example

~~~jsx
// создание календаря с полным рабочим временем (7 рабочих дней в неделю, 24 часа в сутки)
var calendar1 = gantt.createCalendar();

// создание нового календаря путём копирования существующего
var calendar2 = gantt.createCalendar(parentCalendar);
~~~

### Details

добавлено в версии 4.2

После создания календарь необходимо добавить в Gantt с помощью метода [addCalendar](api/method/addcalendar.md):

~~~js
gantt.addCalendar(calendar1);
~~~

### Related API
- [addCalendar](api/method/addcalendar.md)
- [deleteCalendar](api/method/deletecalendar.md)
- [calendar](api/other/calendar.md)

### Related Guides
- [Расчёт рабочего времени](guides/working-time.md#multipleworktimecalendars)


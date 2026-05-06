---
sidebar_label: getCalendar
title: Метод getCalendar
description: "получает календарь рабочего времени по идентификатору"
---

# getCalendar

### Description

@short: Получает календарь рабочего времени по идентификатору

@signature: getCalendar: (calendarId?: string | number) =\> Calendar

### Parameters

-  `calendarId` -	(string | number) -	необязательный идентификатор глобального календаря или "global"

### Returns
- ` config` - (Calendar) - объект календаря

### Example

~~~jsx
var calendar = gantt.getCalendar(calendarId);
~~~

### Details

Возвращаемый объект для приведенного выше примера — [объект календаря](api/other/calendar.md).

Время работы по умолчанию следующее:

- Рабочие дни — с понедельника по пятницу.
- Рабочие часы — с 08:00 до 17:00.

### Related API
- [getCalendars](api/method/getcalendars.md)
- [getTaskCalendar](api/method/gettaskcalendar.md)

### Related Guides
- [Расчет времени работы](guides/working-time.md)

### Change log
- добавлено в версии 4.2
---
sidebar_label: getCalendar
title: getCalendar method
description: "получает рабочий календарь по его id"
---

# getCalendar

### Description

@short: Получает рабочий календарь по его id

@signature: getCalendar: (calendarId?: string | number) =\> Calendar

### Parameters

- `calendarId` - (optional) *string | number* -        необязательно, id глобального календаря или "global"

### Returns
- ` config` - (Calendar) - объект календаря

### Example

~~~jsx
var calendar = gantt.getCalendar(calendarId);
~~~

### Details

Объект, возвращаемый в примере выше, является [объектом календаря](api/other/calendar.md).

Рабочее время по умолчанию настроено следующим образом:

- Рабочие дни с понедельника по пятницу.
- Рабочие часы с 08:00 до 17:00.

### Related API
- [getCalendars](api/method/getcalendars.md)
- [getTaskCalendar](api/method/gettaskcalendar.md)

### Related Guides
- [Расчёт рабочего времени](guides/working-time.md#multipleworktimecalendars)

### Change log
- добавлено в версии 4.2


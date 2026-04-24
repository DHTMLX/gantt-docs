---
sidebar_label: roundDate
title: roundDate метод
description: "округляет указанную дату до ближайшей даты на шкале времени"
---

# roundDate

### Description

@short: Округляет указанную дату до ближайшей даты на шкале времени

@signature: roundDate: (date: Date | RoundDateConfig) => Date

### Parameters

- `date` - (required) *Date | RoundDateConfig* -     объект Date, который нужно округлить, или объект с настройками

### Returns
- ` date` - (Date) - округленный объект Date

### Example

~~~jsx
var today = gantt.roundDate(new Date());
~~~

### Details

Если указанная дата должна быть округлена к ближайшей дате, передайте объект Date в качестве параметра метода:

~~~js
var today = gantt.roundDate(new Date());
console.log(today);
~~~

Если указанная дата должна быть округлена до ближайшей даты с учётом единицы времени, передайте объект настроек в метод **roundDate()**. Объект может принимать следующие атрибуты:

- **date** - (*Date*) - объект Date, который нужно округлить;
- **unit?** - (*string*) - единица времени ("minute", "hour", "day", "week", "month", "year");
- **step?** - (*number*) - шаг временной шкалы (ось X), по умолчанию 1.


~~~js
var today = gantt.roundDate({
    date: new Date(),
    unit: "hour",
    step: 1   
});
console.log(today);
~~~


### Related API
- [roundTaskDates](api/method/roundtaskdates.md)
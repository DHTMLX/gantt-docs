---
sidebar_label: roundDate
title: roundDate method
description: "округляет заданную дату до ближайшей даты на основе временного масштаба"
---

# roundDate

### Description

@short: Округляет заданную дату до ближайшей даты на основе временного масштаба

@signature: roundDate: (date: Date | RoundDateConfig) =\> Date

### Parameters

- `date` - (required) *Date* - | RoundDateConfig     объект Date для округления или объект с параметрами конфигурации

### Returns
- ` date` - (Date) - округленный объект Date

### Example

~~~jsx
var today = gantt.roundDate(new Date());
~~~

### Details

Чтобы округлить конкретную дату до ближайшей, просто передайте объект Date в этот метод:

~~~js
var today = gantt.roundDate(new Date());
console.log(today);
~~~

Если вы хотите округлить дату согласно определенной единице времени, используйте объект с настройками в качестве параметра для метода **roundDate()**. Этот объект может содержать следующие свойства:

- **date** - (*Date*) - объект Date для округления;
- **unit?** - (*string*) - единица времени для округления ("minute", "hour", "day", "week", "month", "year");
- **step?** - (*number*) - шаг интервала временного масштаба (ось X), по умолчанию 1.


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


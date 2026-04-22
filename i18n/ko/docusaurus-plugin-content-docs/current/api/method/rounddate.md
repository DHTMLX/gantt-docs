---
sidebar_label: roundDate
title: roundDate method
description: "지정된 날짜를 시간 축의 가장 가까운 날짜로 반올림합니다"
---

# roundDate

### Description

@short: 지정된 날짜를 시간 축의 가장 가까운 날짜로 반올림합니다

@signature: roundDate: (date: Date | RoundDateConfig) => Date

### Parameters

- `date` - (required) *Date | RoundDateConfig* - 반올림할 Date 객체 또는 설정이 포함된 객체

### Returns
- ` date` - (Date) - 반올림된 Date 객체

### Example

~~~jsx
var today = gantt.roundDate(new Date());
~~~

### Details

가장 가까운 날짜로 반올림해야 하는 경우, Date 객체를 매개변수로 메서드에 전달합니다:

~~~js
var today = gantt.roundDate(new Date());
console.log(today);
~~~

시간 단위를 고려하여 가장 가까운 날짜로 반올림해야 하는 경우, 설정이 포함된 객체를 **roundDate()** 메서드에 전달합니다. 객체는 다음 속성을 가질 수 있습니다:

- **date** - (*Date*) - 반올림할 Date 객체;
- **unit?** - (*string*) - 시간 단위("minute", "hour", "day", "week", "month", "year");
- **step?** - (*number*) - 시간 축의 간격(X-Axis), 기본값은 1.

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
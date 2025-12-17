---
sidebar_label: roundDate
title: roundDate method
description: "주어진 날짜를 시간 단위에 따라 가장 가까운 날짜로 반올림합니다."
---

# roundDate

### Description

@short: 주어진 날짜를 시간 단위에 따라 가장 가까운 날짜로 반올림합니다.

@signature: roundDate: (date: Date | RoundDateConfig) =\> Date

### Parameters

- `date` - (required) *Date | RoundDateConfig* -     반올림할 Date 객체 또는 설정 옵션을 포함하는 객체

### Returns
- ` date` - (Date) - 반올림된 Date 객체

### Example

~~~jsx
var today = gantt.roundDate(new Date());
~~~

### Details

특정 날짜를 가장 가까운 날짜로 반올림하려면, Date 객체를 이 메서드에 전달하면 됩니다:

~~~js
var today = gantt.roundDate(new Date());
console.log(today);
~~~

특정 시간 단위에 따라 날짜를 반올림하려면, 설정이 포함된 객체를 **roundDate()** 메서드의 파라미터로 사용하세요. 이 객체는 다음과 같은 속성을 포함할 수 있습니다:

- **date** - (*Date*) - 반올림할 Date 객체;
- **unit?** - (*string*) - 반올림할 시간 단위 ("minute", "hour", "day", "week", "month", "year");
- **step?** - (*number*) - 시간 단위 간격 스텝(X축), 기본값은 1입니다.


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


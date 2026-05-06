---
sidebar_label: date
title: 날짜 포맷팅 메서드
description: "날짜 포맷 메서드 모음"
---

# date

### Description

@short: 날짜 포맷 메서드 모음

@signature: date: DateHelpers


### Methods

#### add(date, number, unit)
지정된 시간 간격을 날짜에 더하거나 뺍니다

**Parameters**:
- `date` - (Date) - 날짜 객체
- `number` - (number) - 더할 단위 수(양수) 또는 뺄 단위 수(음수)
- `unit` - (string) - 시간 단위: 'minute', 'hour', 'day', 'week', 'month', 'year'

**Returns**: Date - 새로운 날짜 객체

**Example**:
~~~js
// 지정된 날짜에 1년을 더합니다: 2019년 6월 29일 -> 2020년 6월 29일
var newDate = gantt.date.add(new Date(2019, 05, 29), 1, 'year');
~~~

---

#### add_quarter(date, number)
날짜에 지정된 분기 수를 더하거나 뺍니다

**Parameters**:
- `date` - (Date) - 날짜 객체
- `number` - (number) - 더할 분기 수(양수) 또는 뺄 분기 수(음수)

**Returns**: Date - 새로운 날짜 객체

**Example**:
~~~js
// 날짜에 1분기(3개월)를 더합니다: 
// 2019년 6월 29일 -> 2020년 9월 29일
var newDate = gantt.date.add_quarter(new Date(2019, 05, 29), 1);
~~~

---

#### convert_to_utc(date)
로컬 시간을 UTC로 변환합니다

**Parameters**:
- `date` - (Date) - 변환할 날짜 객체

**Returns**: Date - UTC 날짜 객체

**Example**:
~~~js
// 2019년 6월 29일 14:00(로컬 시간) -> 2019년 6월 29일 12:00(UTC)
var time = gantt.date.convert_to_utc(new Date(2019, 05, 29, 14, 00));
~~~

---

#### copy(date)
Date 객체를 복사합니다

**Parameters**:
- `date` - (Date) - 복사할 날짜 객체

**Returns**: Date - 복사된 날짜 객체

**Example**:
~~~js
var copy = gantt.date.copy(new Date(2019, 05, 29)); // -> 2019년 6월 29일
~~~

---

#### date_part(date)
제공된 날짜의 시간 부분을 00:00:00으로 재설정합니다

**Parameters**:
- `date` - (Date) - 포맷할 날짜 객체

**Returns**: Date - 시간 부분이 00:00:00으로 재설정된 날짜

**Example**:
~~~js
// 2019년 6월 29일 14:30:10 -> 2019년 6월 29일 00:00:00
var date = gantt.date.date_part(new Date(2019, 05, 29, 14, 30, 10));
~~~

---

#### date_to_str(format, utc)
지정된 형식의 문자열로 Date 객체를 변환하는 함수를 반환합니다

**Parameters**:
- `format` - (string) - 날짜 형식 문자열(참조 guides/date-format.md)
- `utc` - (boolean, optional) - UTC로 변환할지 여부

**Returns**: Function - 포맷팅 함수

**Example**:
~~~js
var formatFunc = gantt.date.date_to_str("%d/%m/%Y");
var date = formatFunc(new Date(2019, 05, 29)); // -> "29/06/2019"
~~~

---

#### day_start(date)
제공된 날짜의 시간 부분을 00:00:00으로 재설정합니다( date_part의 별칭)

**Parameters**:
- `date` - (Date) - 포맷할 날짜 객체

**Returns**: Date - 시간 부분이 00:00:00으로 재설정된 날짜

**Example**:
~~~js
// 2019년 6월 29일 14:30:10 -> 2019년 6월 29일 00:00:00
var date = gantt.date.day_start(new Date(2019, 05, 29, 14, 30, 10));
~~~

---

#### getISOWeek(date)
ISO-8601 주 번호를 반환합니다(주가 월요일에 시작)

**Parameters**:
- `date` - (Date) - 날짜 객체

**Returns**: number - 주 번호

**Example**:
~~~js
var week = gantt.date.getISOWeek(new Date(2019, 05, 29)); // ->26
~~~

---

#### getUTCISOWeek(date)
UTC로 변환한 후의 주 번호를 반환합니다

**Parameters**:
- `date` - (Date) - 날짜 객체

**Returns**: number - 주 번호

**Example**:
~~~js
var week = gantt.date.getUTCISOWeek(new Date(2019, 05, 29)); // ->26
~~~

---

#### getWeek(date)
주 번호를 반환합니다(주 시작은 gantt.config.start_on_monday에 따라 달라짐)

**Parameters**:
- `date` - (Date) - 날짜 객체

**Returns**: number - 주 번호

**Example**:
~~~js
// 주는 일요일부터 시작합니다
gantt.config.start_on_monday = false;

var isoWeek = gantt.date.getISOWeek(new Date(2019, 2, 25)); // ->12
var week = gantt.date.getWeek(new Date(2019, 2, 25)); // ->13
~~~

---

#### month_start(date)
해당 월의 첫 날짜를 시간 00:00로 재설정하여 반환합니다

**Parameters**:
- `date` - (Date) - 날짜 객체

**Returns**: Date - 월의 첫 날

**Example**:
~~~js
// 2019년 6월 29일 14:30 -> 2019년 6월 1일 00:00
var firstDay = gantt.date.month_start(new Date(2019, 05, 29, 14, 30));
~~~

---

#### parseDate(date, format)

날짜 문자열을 Date 객체로 변환합니다. 이 메서드는 [gantt.load()](api/method/load.md)와 [gantt.parse()](api/method/parse.md)가 작업 및 링크 날짜 속성을 파싱할 때 호출됩니다.

**Parameters**:
- `date` - (string) - 파싱할 날짜 문자열
- `format` - (string | function, optional) - 날짜 형식 문자열(참조 [Date Format Specification](guides/date-format.md)) 또는 사용자 정의 파서 함수 `(dateStr) => Date`

**Returns**: Date - 파싱된 날짜 객체

**Parsing logic** (since v9.1.3):

1. **ISO 8601 검사** - 문자열이 ISO 8601 패턴과 일치하면(예: `"2026-01-06"`, `"2026-01-06T10:30:00Z"`), 형식은 직접적으로 파싱되며 `format`은 참조되지 않습니다. 사용자가 명시적으로 `gantt.templates.parse_date`를 재정의한 경우 ISO 자동 탐지는 건너뛰고 사용자의 함수가 모든 파싱을 처리합니다.
2. "**`format` argument**" - 문자열로 제공되면 `gantt.date.str_to_date(format)`를 통해 파서 함수로 변환되고, 함수로 제공되면 그대로 호출됩니다.
3. "**Fallback**" - `format`이 제공되지 않으면 [parse_date](api/template/parse_date.md) 템플릿이 사용됩니다.

**Examples**:
~~~js
// 명시적 포맷 문자열로
var date = gantt.date.parseDate("29/06/2019", "%d/%m/%Y");
// -> 2019년 6월 29일 00:00:00

// ISO 문자열 - 자동으로 파싱되며 포맷은 무시됩니다
var date2 = gantt.date.parseDate("2026-01-06T10:30:00Z");
// -> 2026년 1월 6일 10:30:00 UTC

// 커스텀 파서 함수를 사용
var date3 = gantt.date.parseDate("Jan 6, 2026", function(str) {
    return new Date(str);
});
~~~

---

#### str_to_date(format, utc)
문자열을 Date 객체로 변환하는 함수를 반환합니다

**Parameters**:
- `format` - (string) - 날짜 형식 문자열(참조 guides/date-format.md)
- `utc` - (boolean, optional) - UTC로 변환할지 여부

**Returns**: Function - 파싱 함수

**Example**:
~~~js
var formatFunc = gantt.date.str_to_date("%d/%m/%Y");
var date = formatFunc("29/06/2019"); // -> 2019년 6월 29일 00:00:00
~~~

---

#### time_part(date)
자정 이후의 시간(초)을 반환합니다

**Parameters**:
- `date` - (Date) - 포맷할 날짜 객체

**Returns**: number - 자정 이후의 초

**Example**:
~~~js
var time = gantt.date.time_part(new Date(2019, 05, 29, 14, 30, 10));
~~~

---

#### to_fixed(num)
숫자 앞에 0을 채웁니다(10미만일 때)

**Parameters**:
- `num` - (number) - 포맷할 숫자

**Returns**: string - 포맷된 문자열

**Example**:
~~~js
var num1 = gantt.date.to_fixed(2); // ->"02"
var num2 = gantt.date.to_fixed(10); // ->10
~~~

---

#### minute_start(date)
초를 00으로 재설정합니다

**Parameters**:
- `date` - (Date) - 날짜 객체

**Returns**: Date - 포맷된 날짜

**Example**:
~~~js
// 2019년 6월 29일 14:30:10 -> 2019년 6월 29일 14:30:00
var date = gantt.date.minute_start(new Date(2019, 05, 29, 14, 30, 10));
~~~

---

#### hour_start(date)
분과 초를 00으로 재설정합니다

**Parameters**:
- `date` - (Date) - 날짜 객체

**Returns**: Date - 포맷된 날짜

**Example**:
~~~js
// 2019년 6월 29일 14:30:10 -> 2019년 6월 29일 14:00:00
var date = gantt.date.hour_start(new Date(2019, 05, 29, 14, 30, 10));
~~~

---

#### week_start(date)
주 시작을 00:00:00으로 재설정하여 주의 첫날을 반환합니다

**Parameters**:
- `date` - (Date) - 날짜 객체

**Returns**: Date - 주의 첫날

**Example**:
~~~js
// 2019년 6월 29일 14:30 -> 2019년 6월 24일 00:00
var weekStart = gantt.date.week_start(new Date(2019, 05, 29, 14, 30));
~~~

---

#### quarter_start(date)
분기의 첫 달을 00:00:00으로 재설정하여 반환합니다

**Parameters**:
- `date` - (Date) - 날짜 객체

**Returns**: Date - 분기의 첫 달

**Example**:
~~~js
// 2019년 6월 29일 14:30:10 -> 2019년 4월 1일 00:00:00
var date = gantt.date.quarter_start(new Date(2019, 05, 29, 14, 30, 10));
~~~

---

#### year_start(date)
연도의 첫 날을 00:00:00으로 재설정하여 반환합니다

**Parameters**:
- `date` - (Date) - 날짜 객체

**Returns**: Date - 연도의 첫 날

**Example**:
~~~js
// 2019년 6월 29일 14:30 -> 2019년 1월 1일 00:00
var yearStart = gantt.date.year_start(new Date(2019, 05, 29, 14, 30));
~~~
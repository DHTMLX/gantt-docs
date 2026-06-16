---
sidebar_label: date
title: 날짜 포맷 메서드
description: "날짜 포맷 메서드 모음"
---

# date

### Description

@short: 날짜 포맷 메서드 모음

@signature: date: DateHelpers

### Methods

#### `add(date, number, unit)`
지정된 시간 간격을 날짜에 더하거나 뺍니다

**Parameters**:
- `date` - (Date) - 날짜 객체
- `number` - (number) - 더할 단위 수(양수면 더하고 음수면 뺍니다)
- `unit` - (string) - 시간 단위: `minute`, `hour`, `day`, `week`, `month`, `year`

**Returns**: Date - 새로운 날짜 객체

**Example**:
~~~js
// 지정된 날짜에 1년을 더합니다: 2027년 6월 29일 -> 2028년 6월 29일
const newDate = gantt.date.add(new Date(2027, 5, 29), 1, 'year');
~~~

---

#### `add_quarter(date, number)`
지정된 분기 수를 날짜에 더하거나 뺍니다

**Parameters**:
- `date` - (Date) - 날짜 객체
- `number` - (number) - 더할 분기 수(양수면 더하고 음수면 뺍니다)

**Returns**: Date - 새로운 날짜 객체

**Example**:
~~~js
// 지정된 날짜에 1분기(3개월)를 더합니다: 
// 2027년 6월 29일 -> 2027년 9월 29일
const newDate = gantt.date.add_quarter(new Date(2027, 5, 29), 1);
~~~

---

#### `convert_to_utc(date)`
로컬 시간을 UTC로 변환합니다

**Parameters**:
- `date` - (Date) - 변환할 날짜 객체

**Returns**: Date - UTC 날짜 객체

**Example**:
~~~js
// 2027년 6월 29일 14:00(로컬 시간) -> 2027년 6월 29일 12:00(UTC)
const utcTime = gantt.date.convert_to_utc(new Date(2027, 5, 29, 14, 0));
~~~

---

#### `copy(date)`
Date 객체의 사본을 만듭니다

**Parameters**:
- `date` - (Date) - 복사할 날짜 객체

**Returns**: Date - 복사된 날짜 객체

**Example**:
~~~js
const copiedDate = gantt.date.copy(new Date(2027, 5, 29)); // -> 29 June, 2027
~~~

---

#### `date_part(date)`
시간 부분을 00:00:00으로 재설정한 날짜의 사본을 반환합니다

**Parameters**:
- `date` - (Date) - 포맷할 날짜 객체

**Returns**: Date - 시간 부분이 00:00:00으로 재설정된 날짜

**Example**:
~~~js
// 2027년 6월 29일 14:30:10 -> 2027년 6월 29일 00:00:00
const dateWithoutTime = gantt.date.date_part(new Date(2027, 5, 29, 14, 30, 10));
~~~

---

#### `date_to_str(format, utc)`
지정된 형식의 문자열로 Date 객체를 변환하는 함수를 반환합니다

**Parameters**:
- `format` - (string) - 날짜 형식(참조: [Date Format Specification](guides/date-format.md))
- `utc` - (boolean, optional) - UTC로 변환할지 여부

**Returns**: Function - 포맷팅 함수

**Example**:
~~~js
const formatDate = gantt.date.date_to_str("%d/%m/%Y");
const formattedDate = formatDate(new Date(2027, 5, 29)); // -> "29/06/2027"
~~~

---

#### `day_start(date)`
`date_part()`의 별칭인 날짜의 사본을 시간 부분을 00:00:00으로 만듭니다

**Parameters**:
- `date` - (Date) - 포맷할 날짜 객체

**Returns**: Date - 시간 부분이 00:00:00으로 재설정된 날짜

**Example**:
~~~js
// 2027년 6월 29일 14:30:10 -> 2027년 6월 29일 00:00:00
const dayStart = gantt.date.day_start(new Date(2027, 5, 29, 14, 30, 10));
~~~

---

#### `getISOWeek(date)`
날짜의 ISO-8601 주 차수를 반환합니다(주 시작은 월요일)

**Parameters**:
- `date` - (Date) - 날짜 객체

**Returns**: number - 주 차수

**Example**:
~~~js
const isoWeek = gantt.date.getISOWeek(new Date(2027, 5, 29)); // ->26
~~~

---

#### `getUTCISOWeek(date)`
UTC로 변환한 후의 주 차수를 반환합니다

**Parameters**:
- `date` - (Date) - 날짜 객체

**Returns**: number - 주 차수

**Example**:
~~~js
const utcIsoWeek = gantt.date.getUTCISOWeek(new Date(2027, 5, 29)); // ->26
~~~

---

#### `getWeek(date)`
날짜의 주 차수를 반환합니다(주 시작은 `gantt.config.start_on_monday`에 따라 다름)

**Parameters**:
- `date` - (Date) - 날짜 객체

**Returns**: number - 주 차수

**Example**:
~~~js
// 주 시작이 일요일인 경우
gantt.config.start_on_monday = false;

const isoWeek = gantt.date.getISOWeek(new Date(2027, 2, 25)); // ->12
const week = gantt.date.getWeek(new Date(2027, 2, 25)); // ->13
~~~

---

#### `month_start(date)`
해당 월의 첫 날을 반환하며 시간은 00:00으로 재설정합니다

**Parameters**:
- `date` - (Date) - 날짜 객체

**Returns**: Date - 월의 첫 날

**Example**:
~~~js
// 2027년 6월 29일 14:30 -> 2027년 6월 1일 00:00
const firstDayOfMonth = gantt.date.month_start(new Date(2027, 5, 29, 14, 30));
~~~

---

#### `parseDate(date, format)`

날짜 문자열을 Date 객체로 변환합니다. 이 메서드는 [`load()`](api/method/load.md) 및 [`parse()`](api/method/parse.md)에서 태스크 및 링크 날짜 속성을 파싱하기 위해 호출됩니다.

**Parameters**:
- `date` - (string) - 파싱할 날짜 문자열
- `format` - (string | function, optional) - 날짜 형식 문자열([Date Format Specification](guides/date-format.md)) 또는 사용자 정의 파서 함수 `(dateStr) => Date`

**Returns**: Date - 파싱된 날짜 객체

**Parsing logic** (since v9.1.3):

1. **ISO 8601 체크** - 문자열이 ISO 8601 패턴과 매칭되면(예: `"2027-01-06"`, `"2027-01-06T10:30:00Z"`), 형식은 직접 파싱되고 `format`은 참조되지 않습니다. 사용자가 `parse_date` 템플릿을 명시적으로 재정의한 경우 ISO 자동 감지는 건너뛰고 사용자의 함수가 모든 파싱을 처리합니다.
2. **`format` 인수** - 문자열로 제공되면 `str_to_date()`를 통해 파서 함수로 변환되고, 함수로 제공되면 직접 호출됩니다.
3. **대체 처리** - 포맷이 제공되지 않으면 `[parse_date](api/template/parse_date.md)` 템플릿이 사용됩니다.

**Examples**:
~~~js
// 명시적 포맷 문자열 사용
const parsedDate = gantt.date.parseDate("29/06/2027", "%d/%m/%Y");
// -> 2027년 6월 29일 00:00:00

// ISO 문자열 - 자동으로 파싱되며 포맷은 무시됩니다
const parsedIsoDate = gantt.date.parseDate("2027-01-06T10:30:00Z");
// -> 2027년 1월 6일 10:30:00 UTC

// 사용자 정의 파서 함수 사용
const parsedCustomDate = gantt.date.parseDate("Jan 6, 2027", (str) => {
    return new Date(str);
});
~~~

---

#### `str_to_date(format, utc)`
문자열을 Date 객체로 변환하는 함수를 반환합니다

**Parameters**:
- `format` - (string) - 날짜 형식([Date Format Specification](guides/date-format.md))
- `utc` - (boolean, optional) - UTC로 변환할지 여부

**Returns**: Function - 파싱 함수

**Example**:
~~~js
const parseDate = gantt.date.str_to_date("%d/%m/%Y");
const parsedDate = parseDate("29/06/2027"); // -> 2027년 6월 29일 00:00:00
~~~

---

#### `time_part(date)`
자정 이후 경과 시간(초)을 반환합니다

**Parameters**:
- `date` - (Date) - 날짜 객체

**Returns**: number - 자정 이후 경과 초

**Example**:
~~~js
const secondsSinceMidnight = gantt.date.time_part(new Date(2027, 5, 29, 14, 30, 10));
~~~

---

#### `to_fixed(num)`
10 미만의 숫자에 앞자리 0을 추가합니다

**Parameters**:
- `num` - (number) - 포맷할 숫자

**Returns**: string - 포맷된 문자열

**Example**:
~~~js
const paddedNumber = gantt.date.to_fixed(2); // ->"02"
const unchangedNumber = gantt.date.to_fixed(10); // ->10
~~~

---

#### `minute_start(date)`
초와 밀리초를 00으로 재설정한 날짜의 사본을 반환합니다

**Parameters**:
- `date` - (Date) - 날짜 객체

**Returns**: Date - 포맷된 날짜

**Example**:
~~~js
// 2027년 6월 29일 14:30:10 -> 2027년 6월 29일 14:30:00
const minuteStart = gantt.date.minute_start(new Date(2027, 5, 29, 14, 30, 10));
~~~

---

#### `hour_start(date)`
분 및 초를 00으로 재설정한 날짜의 사본을 반환합니다

**Parameters**:
- `date` - (Date) - 날짜 객체

**Returns**: Date - 포맷된 날짜

**Example**:
~~~js
// 2027년 6월 29일 14:30:10 -> 2027년 6월 29일 14:00:00
const hourStart = gantt.date.hour_start(new Date(2027, 5, 29, 14, 30, 10));
~~~

---

#### `week_start(date)`
주 시작을 00:00:00으로 재설정한 주의 첫 날을 반환합니다

**Parameters**:
- `date` - (Date) - 날짜 객체

**Returns**: Date - 주의 첫 날

**Example**:
~~~js
// 2027년 6월 29일 14:30 -> 2027년 6월 28일 00:00
const weekStart = gantt.date.week_start(new Date(2027, 5, 29, 14, 30));
~~~

---

#### `quarter_start(date)`
분기의 첫 달을 00:00:00으로 재설정한 날짜의 사본을 반환합니다

**Parameters**:
- `date` - (Date) - 날짜 객체

**Returns**: Date - 분기의 첫 날

**Example**:
~~~js
// 2027년 6월 29일 14:30:10 -> 2027년 4월 1일 00:00:00
const quarterStart = gantt.date.quarter_start(new Date(2027, 5, 29, 14, 30, 10));
~~~

---

#### `year_start(date)`
년의 첫 날을 00:00:00으로 재설정한 날짜의 사본을 반환합니다

**Parameters**:
- `date` - (Date) - 날짜 객체

**Returns**: Date - 연도의 첫 날

**Example**:
~~~js
// 2027년 6월 29일 14:30 -> 2027년 1월 1일 00:00
const yearStart = gantt.date.year_start(new Date(2027, 5, 29, 14, 30));
~~~
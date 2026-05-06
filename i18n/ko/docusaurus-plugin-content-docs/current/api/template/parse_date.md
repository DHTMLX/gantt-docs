--- 
sidebar_label: parse_date
title: parse_date 템플릿
description: "날짜 문자열을 Date 객체로 변환"
---

# parse_date

### Description

@short: 날짜 문자열을 Date 객체로 변환합니다

@signature: parse_date: (date: string) => Date;

### Parameters

- `date` - (required) *string* - 구문 분석해야 하는 문자열

### Returns
- `date` - (Date) - Date 객체

### Example

~~~jsx
var cfg = gantt.config;
var strToDate = gantt.date.str_to_date(cfg.date_format, cfg.server_utc);

gantt.templates.parse_date = function(date){
    return strToDate(date);
};
~~~

### Details

이 함수는 작업의 날짜 속성을 문자열 형식으로 제공받은 경우, 이를 구문 분석하기 위해 **gantt.load()** 또는 **gantt.parse()** 호출에서 사용할 수 있습니다. 

기본 메서드로 해석할 수 없는 사용자 정의 날짜 포맷을 사용하는 경우 이 함수를 재정의할 수 있습니다. [Date Format Specification](guides/date-format.md)을 확인하십시오.

[Read more about date objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date).

## ISO 형식의 날짜 로딩

버전 9.1.3부터 Gantt는 ISO 8601 날짜 문자열을 자동으로 감지하고 구문 분석합니다. ISO 날짜의 경우 수동으로 `parse_date` 재정의가 필요하지 않습니다. 다만 이 템플릿을 재정의하는 경우 우선 순위는 귀하의 함수가 가지며 - ISO 자동 감지는 건너뛰고 귀하의 함수가 모든 날짜 문자열을 처리합니다.

:::tip Gantt v9.1.2 및 이전
9.1.3 이전 버전에서 ISO 날짜는 자동으로 감지되지 않았습니다. 더 오래된 버전을 사용하는 경우 ISO 문자열을 처리하기 위해 이 템플릿을 재정의해야 합니다
:::
~~~js
gantt.templates.parse_date = function(date) {
    return new Date(date);
};
gantt.templates.format_date = function(date) {
    return date.toISOString();
};
~~~

버전 9.1.3 이상에서는 ISO 날짜에 대한 이러한 재정의가 필요하지 않습니다.
:::

자세한 내용은 [Loading dates in ISO format](guides/loading.md#loading-dates-in-iso-format)을 참조하십시오.

### Related API
- [parse](api/method/parse.md)
- [load](api/method/load.md)

### Related Guides
- [Data Loading](guides/loading.md)
- [Date Format Specification](guides/date-format.md)
- [Server-Side Integration](guides/server-side.md)
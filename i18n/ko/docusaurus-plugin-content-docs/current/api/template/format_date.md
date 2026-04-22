---
sidebar_label: format_date
title: format_date 템플릿
description: "날짜 객체를 날짜 문자열로 변환합니다. 서버로 데이터를 다시 보내는 데 사용됩니다"
---

# format_date

### Description

@short: 날짜 객체를 날짜 문자열로 변환합니다. 서버로 데이터를 다시 보내는 데 사용됩니다

@signature: format_date: (date: Date) =\> string;

### Parameters

- `date` - (required) *Date* - 형식화가 필요한 날짜

### Returns
- ` text` - (string) - 날짜의 텍스트 표현

### Example

~~~jsx
var dateToStr = gantt.date.date_to_str("%Y-%m-%d %H:%i");
gantt.templates.format_date = function(date){
    return dateToStr(date);
};
~~~

### Details

자세한 내용은 [날짜 형식 지정](guides/date-format.md)를 참고하세요.

ISO 8601 날짜가 입력에서 감지되면, ISO 문자열로 자동으로 직렬화됩니다 - 이 템플릿을 명시적으로 재정의하지 않는 한. 커스텀 `format_date` 함수를 정의하면 우선 순위를 가지며 ISO를 포함한 모든 날짜에 적용됩니다.

:::tip Gantt v9.1.2 및 이전 버전
버전 9.1.3 이전에서는 ISO 날짜가 자동으로 감지되지 않았습니다. 더 오래된 버전을 사용 중인 경우 ISO 문자열을 처리하도록 템플릿을 재정의해야 합니다:

~~~js
gantt.templates.parse_date = function(date) {
    return new Date(date);
};
gantt.templates.format_date = function(date) {
    return date.toISOString();
};
~~~

버전 9.1.3 이상에서는 ISO 날짜에 대해 이러한 재정의가 필요하지 않습니다.
:::

자세한 내용은 [Loading dates in ISO format](guides/loading.md#loading-dates-in-iso-format)을 참조하십시오.

## Changing the date format dynamically

날짜 형식([date format](api/config/date_format.md))을 동적으로 변경해야 하는 경우, 아래와 같이 [parse_date](api/template/parse_date.md) 템플릿을 수정해야 합니다:

~~~js
var cfg = gantt.config;
var strToDate = gantt.date.str_to_date(cfg.date_format, cfg.server_utc);

gantt.templates.parse_date = function(date){
    return strToDate(date);
};
~~~

### Related Guides
- [Data Loading](guides/loading.md)
- [Operations with Dates](guides/date-operations.md)
- [Server-Side Integration](guides/server-side.md)
- [Date Format Specification](guides/date-format.md)
---
sidebar_label: format_date
title: format_date template
description: "날짜 객체를 날짜 문자열로 변환합니다. 이는 서버로 데이터를 전송할 때 유용합니다."
---

# format_date

### Description

@short: 날짜 객체를 날짜 문자열로 변환합니다. 이는 서버로 데이터를 전송할 때 유용합니다.

@signature: format_date: (date: Date) =\> string;

### Parameters

- `date` - (required) *Date* - 포맷팅이 필요한 날짜 객체

### Returns
- ` text` - (string) - 날짜를 문자열로 표현한 값

### Example

~~~jsx
var dateToStr = gantt.date.date_to_str("%Y-%m-%d %H:%i");
gantt.templates.format_date = function(date){
    return dateToStr(date);
};
~~~

### Details

자세한 내용은 [날짜 형식 지정](guides/date-format.md)를 참고하세요.

## ISO 형식 날짜 로딩

Gantt는 ISO 날짜 형식을 지원합니다. 이를 사용하려면, 날짜 파싱과 포맷팅을 담당하는 함수를 재정의하면 됩니다:

~~~js
gantt.templates.parse_date = function(date) { 
    return new Date(date);
};
gantt.templates.format_date = function(date) { 
    return date.toISOString();
};
~~~

## 날짜 형식을 동적으로 변경하기

실시간으로 [날짜 형식](api/config/date_format.md)을 변경하려면, [parse_date](api/template/parse_date.md) 템플릿도 다음과 같이 업데이트해야 합니다:

~~~js
var cfg = gantt.config;
var strToDate = gantt.date.str_to_date(cfg.date_format, cfg.server_utc);

gantt.templates.parse_date = function(date){
    return strToDate(date);
};
~~~

### Related Guides
- [데이터 로딩](guides/loading.md)
- [날짜 작업](guides/date-operations.md)
- [Server-Side Integration](guides/server-side.md)
- [날짜 형식 지정](guides/date-format.md)


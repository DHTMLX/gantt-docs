---
sidebar_label: parse_date
title: parse_date template
description: "날짜 문자열을 Date 객체로 변환합니다"
---

# parse_date

### Description

@short: 날짜 문자열을 Date 객체로 변환합니다

@signature: parse_date: (date: string) =\> Date;

### Parameters

- `date` - (required) *string* - 파싱할 문자열

### Returns
- ` date` - (Date) - 날짜 객체

### Example

~~~jsx
var cfg = gantt.config;
var strToDate = gantt.date.str_to_date(cfg.date_format, cfg.server_utc);

gantt.templates.parse_date = function(date){
    return strToDate (date);
};
~~~

### Details

이 함수는 **gantt.load()** 또는 **gantt.parse()** 실행 시, 태스크의 *start_date/end_date* 필드가 문자열로 들어올 때 이를 변환하기 위해 호출됩니다. 
기본 파서가 처리하지 못하는 커스텀 포맷을 사용하는 경우 이 함수를 오버라이드할 수 있습니다. 자세한 내용은 [날짜 형식 지정](guides/date-format.md)를 참고하세요.

[날짜 객체에 대해 더 알아보기](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date).

## ISO 포맷 날짜 로딩

Gantt는 ISO 날짜 포맷을 지원합니다. 이를 사용하려면, 아래와 같이 날짜 파싱 및 포맷팅 함수를 오버라이드하면 됩니다:

~~~js
gantt.templates.parse_date = function(date) { 
    return new Date(date);
};
gantt.templates.format_date = function(date) { 
    return date.toISOString();
};
~~~

### Related API
- [parse](api/method/parse.md)
- [load](api/method/load.md)

### Related Guides
- [데이터 로딩](guides/loading.md)
- [날짜 형식 지정](guides/date-format.md)
- [Server-Side Integration](guides/server-side.md)


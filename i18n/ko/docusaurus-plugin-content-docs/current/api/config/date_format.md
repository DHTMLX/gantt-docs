---
sidebar_label: date_format
title: date_format config
description: "데이터 세트에서 날짜를 해석하고 서버로 날짜를 전송할 때 사용하는 날짜 형식을 지정합니다."
---

# date_format

### Description

@short: 데이터 세트에서 날짜를 해석하고 서버로 날짜를 전송할 때 사용하는 날짜 형식을 지정합니다.

@signature: date_format: string

### Example

~~~jsx
gantt.config.date_format = "%Y-%m-%d %H:%i";
...
gantt.init("gantt_here");
gantt.load("/data/tasks");
~~~

**Default value:** "%d-%m-%Y %H:%i"

### Details

이 구성 옵션은 [parse_date](api/template/parse_date.md) 및 [format_date](api/template/format_date.md) 템플릿 함수를 생성하는 데 사용됩니다. 
사용자 정의 형식을 사용하려면 이 구성 값을 조정하거나 **parse_date** 및 **format_date** 템플릿을 직접 오버라이드할 수 있습니다.

## ISO 형식 날짜 로딩

간트는 ISO 날짜 형식을 지원합니다. 이를 활성화하려면 날짜를 파싱하고 직렬화하는 함수들을 오버라이드해야 합니다:

~~~js
gantt.templates.parse_date = function(date) { 
    return new Date(date);
};
gantt.templates.format_date = function(date) { 
    return date.toISOString();
};
~~~

## 날짜 형식을 동적으로 변경하기

날짜 형식을 동적으로 업데이트하려면 아래와 같이 [parse_date](api/template/parse_date.md) 템플릿을 수정하세요:

~~~js
var cfg = gantt.config;
var strToDate = gantt.date.str_to_date(cfg.date_format, cfg.server_utc);

gantt.templates.parse_date = function(date){
    return strToDate (date);
};
~~~

### Related API
- [parse_date](api/template/parse_date.md)
- [format_date](api/template/format_date.md)

### Related Guides
- [날짜 형식 지정](guides/date-format.md)


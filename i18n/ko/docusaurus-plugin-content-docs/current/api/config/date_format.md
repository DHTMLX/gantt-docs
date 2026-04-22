---
sidebar_label: date_format
title: date_format 설정
description: "데이터 세트에서 데이터를 파싱하는 데 사용되는 날짜 형식을 설정하고 서버로 날짜를 다시 보내는 데 사용하는 형식을 정의합니다"
---

# date_format

### Description

@short: 데이터 세트에서 데이터를 파싱하고 서버로 날짜를 다시 보낼 때 사용하는 날짜 형식을 설정합니다

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

이 설정 값은 [`parse_date`](api/template/parse_date.md) 및 [`format_date`](api/template/format_date.md) 템플릿 함수를 생성하는 데 사용됩니다.
사용자 정의 포맷을 사용하려면 이 설정을 변경하거나 `parse_date` 및 `format_date` 템플릿을 직접 재정의하면 됩니다.

## Loading dates in ISO format

버전 9.1.3부터 Gantt는 ISO 8601 날짜 문자열을 자동으로 감지하고 파싱합니다. ISO 문자열에는 `date_format` 설정이 필요하지 않습니다 - 문자열을 직접 인식하고 파싱됩니다.

입력에서 ISO 날짜가 감지되면 [DataProcessor](api/method/dataprocessor.md)로 전달될 때 자동으로 ISO 문자열로 다시 직렬화됩니다. 날짜만 있는 문자열(예: `"2026-01-06"`)은 원래 형식을 보존하며 날짜-전용 문자열로 다시 직렬화됩니다.

`date_format` 설정은 여전히 ISO가 아닌 날짜 문자열에 적용됩니다.

:::tip Gantt v9.1.2 및 이전
9.1.3 이전 버전에서는 ISO 날짜가 자동으로 감지되지 않았습니다. 오래된 버전을 사용 중인 경우 ISO 문자열을 처리하도록 `parse_date` 및 `format_date` 템플릿을 재정의해야 합니다:

~~~js
gantt.templates.parse_date = (date) => new Date(date);
gantt.templates.format_date = (date) => date.toISOString();
~~~

:::

자세한 내용은 [Loading dates in ISO format](guides/loading.md#loading-dates-in-iso-format)을 참조하세요.

## Changing the date format dynamically

날짜 형식을 동적으로 변경해야 하는 경우 아래와 같이 [`parse_date`](api/template/parse_date.md) 템플릿을 수정하는 것이 필요합니다:

~~~js
const config = gantt.config;
const parseDate = gantt.date.str_to_date(config.date_format, config.server_utc);

gantt.templates.parse_date = (date) => parseDate(date);
~~~

### Related API
- [parse_date](api/template/parse_date.md)
- [format_date](api/template/format_date.md)

### Related Guides
- [Date Format Specification](guides/date-format.md)
---
sidebar_label: xml_date
title: xml_date config
description: "데이터셋에서 데이터를 파싱하고 서버로 데이터를 전송할 때 사용되는 날짜 형식을 지정합니다."
---

# xml_date

### Description

@short: 데이터셋에서 데이터를 파싱하고 서버로 데이터를 전송할 때 사용되는 날짜 형식을 지정합니다.

### Example

~~~jsx
gantt.config.xml_date="%Y-%m-%d %H:%i";
...
gantt.init("gantt_here");
gantt.load("../data/tasks.json");
~~~

**Default value:** "%d-%m-%Y %H:%i"

### Details

:::note
 **xml_date** 속성은 더 이상 권장되지 않습니다. 대신 [date_format](api/config/date_format.md)를 사용하세요: 
:::

~~~js
gantt.config.date_format = "%Y-%m-%d %H:%i";
...
gantt.init("gantt_here");
gantt.load("../data/tasks.json");
~~~

### Related API
- [xml_date](api/template/xml_date.md)
- [xml_format](api/template/xml_format.md)

### Related Guides
- [날짜 형식 지정](guides/date-format.md)

### Change log
- v6.2부터 deprecated, v7.0부터 제거됨


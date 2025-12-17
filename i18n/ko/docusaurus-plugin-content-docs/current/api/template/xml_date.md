---
sidebar_label: xml_date
title: xml_date template
description: "이 템플릿은 XML 파일에서 가져온 문자열을 지정된 형식에 따라 날짜 객체로 변환합니다."
---

# xml_date

### Description

@short: 이 템플릿은 XML 파일에서 가져온 문자열을 지정된 형식에 따라 날짜 객체로 변환합니다.

### Parameters

- `date` - (required) *Date* - 포맷이 필요한 날짜입니다.

### Returns
- ` text` - (string) - Gantt 차트에 표시될 HTML 텍스트입니다.

### Example

~~~jsx
gantt.templates.xml_date = function(date){
    return gantt.date.date_to_str(gantt.config.xml_date)(date);
};
~~~

### Details

:::note
 이 템플릿은 더 이상 권장되지 않습니다. 대신 [parse_date](api/template/parse_date.md)를 사용하세요: 
:::

~~~js
const cfg = gantt.config;
const strToDate = gantt.date.str_to_date(cfg.date_format, cfg.server_utc);
 
gantt.templates.parse_date = function(date){
    return strToDate(date);
};
~~~

이 템플릿은 [xml_date](api/config/xml_date.md) 설정에서 자동으로 생성되며 [Gantt 초기화](api/method/init.md) 후에 커스터마이징할 수 있습니다.

서버 날짜 형식이 [Gantt date helper](api/other/date.md)에서 지원되지 않는 경우, 커스텀 템플릿 함수를 생성할 수 있습니다.

예를 들어, **start_date**에 UNIX 시간을 사용하는 경우: 


~~~js title="snippet /data"
{
    "data":[
    {
        "id":1,
        "start_date":1503608400,
        "duration":10,
        "text":"Task #1",
        "parent":0,
    },
    {
        "id":2,
        "start_date":1503694800,
        "duration":4,
        "text":"Task #2",
        "parent":0,
    }],

    "links":[
    ]
}
~~~

Gantt 설정은 다음과 같이 구성해야 합니다:

~~~js
gantt.attachEvent("onTemplatesReady", function(){
    gantt.templates.xml_date = function(dateString){
        return new Date(dateString * 1000);
    }
});

gantt.init("gantt_here");
gantt.load("/data");
~~~

### Related API
- [xml_date](api/config/xml_date.md)
- [xml_format](api/template/xml_format.md)
- [date](api/other/date.md)

### Related Guides
- [날짜 변환을 위한 템플릿](guides/conversion-templates.md)

### Change log
- v6.2부터 deprecated 되었으며 v7.0에서 제거되었습니다.


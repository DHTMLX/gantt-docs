---
sidebar_label: xml_date
title: xml_date 템플릿
description: "XML 파일의 문자열이 이 템플릿에 따라 날짜 객체로 변환됩니다"
---

# xml_date
:::warning
템플릿은 더 이상 사용되지 않습니다.
:::
### Description

@short: XML 파일의 문자열이 이 템플릿에 따라 날짜 객체로 변환됩니다

### Parameters

- `date` - (required) *Date* - 포맷이 필요한 날짜

### Returns
- ` text` - (string) - gantt에서 렌더링될 HTML 텍스트

### Example

~~~jsx
gantt.templates.xml_date = function(date){
    return gantt.date.date_to_str(gantt.config.xml_date)(date);
};
~~~ 

### Details

:::note
템플릿이 더 이상 사용되지 않습니다. 대신 [parse_date](api/template/parse_date.md)를 사용하세요:
:::

~~~js
const cfg = gantt.config;
const strToDate = gantt.date.str_to_date(cfg.date_format, cfg.server_utc);
 
gantt.templates.parse_date = function(date){
    return strToDate (date);
};
~~~

이 템플릿은 [xml_date](api/config/xml_date.md) 설정에서 자동으로 생성되며, [gantt 초기화](api/method/init.md) 이후에 재정의할 수 있습니다.

서버 날짜 형식이 [gantt date helper](api/other/date.md)에 의해 지원되지 않는 경우에도 사용자 정의 템플릿 함수를 사용할 수 있습니다.

예를 들어 **start_date**에 UNIX 타임을 사용하는 경우:

snippet /data :
~~~js
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

다음과 같이 Gantt 구성을 설정해야 합니다:

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
- v6.2에서 더 이상 사용되지 않으며, v7.0에서 제거되었습니다
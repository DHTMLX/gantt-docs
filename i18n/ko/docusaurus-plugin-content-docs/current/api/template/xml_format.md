---
sidebar_label: xml_format
title: xml_format template
description: "날짜 객체를 이 템플릿에 따라 문자열로 변환합니다. 이 문자열은 서버에 데이터를 전송할 때 사용됩니다."
---

# xml_format

### Description

@short: 날짜 객체를 이 템플릿에 따라 문자열로 변환합니다. 이 문자열은 서버에 데이터를 전송할 때 사용됩니다.

### Parameters

- `date` - (required) *Date* - 포맷팅이 필요한 날짜 객체입니다.

### Returns
- ` text` - (string) - Gantt 차트에 표시될 HTML 텍스트입니다.

### Example

~~~jsx
gantt.templates.xml_format = function(date){
    return gantt.date.date_to_str(gantt.config.xml_date)(date);
};
~~~

### Details

:::note
 이 템플릿은 더 이상 권장되지 않습니다. 대신 [format_date](api/template/format_date.md)를 사용하세요: 
:::

~~~js
var dateToStr = gantt.date.date_to_str("%Y-%m-%d %H:%i");
gantt.templates.format_date = function(date){
    return dateToStr(date);
};
~~~

이 템플릿은 [xml_date](api/config/xml_date.md) 구성에서 자동으로 생성되며 [Gantt 초기화](api/method/init.md) 이후에 재정의할 수 있습니다.

서버에서 [Gantt 날짜 헬퍼](api/other/date.md)에서 지원하지 않는 날짜 형식을 요구하는 경우, 사용자 정의 템플릿 함수를 생성할 수 있습니다.

예를 들어, 서버가 **start_date**를 UNIX 타임스탬프로 기대하고 요청 파라미터가 다음과 같아야 한다면:

- **start_date**:1503608400
- **duration**:4
- **text**:Task #2.2
- **parent**:3
- **end_date**:1503694800

Gantt 구성은 다음과 같이 설정할 수 있습니다:

~~~js
gantt.attachEvent("onTemplatesReady", function(){
    gantt.templates.xml_format = function(date){
        return (date.valueOf() / 1000) + "";
    }
});

gantt.init("gantt_here");
gantt.load("/data");

var dp = new gantt.dataProcessor("/data");
dp.init(gantt);
dp.setTransactionMode("REST");
~~~

### Related API
- [xml_date](api/config/xml_date.md)
- [date](api/other/date.md)
- [xml_date](api/template/xml_date.md)

### Related Guides
- [날짜 변환을 위한 템플릿](guides/conversion-templates.md)
- [Server-Side Integration](guides/server-side.md)

### Change log
- v6.2부터 deprecated 되었으며, v7.0에서 제거되었습니다.


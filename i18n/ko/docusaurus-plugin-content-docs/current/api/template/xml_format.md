---
sidebar_label: xml_format
title: xml_format 템플릿
description: "이 템플릿에 따라 날짜 객체가 문자열로 변환되며, 서버로 데이터를 전송하는 데 사용됩니다"
---

# xml_format
:::warning
이 템플릿은 더 이상 사용되지 않습니다.
:::
### Description

@short: 이 템플릿에 따라 날짜 객체가 문자열로 변환되며, 서버로 데이터를 전송하는 데 사용됩니다

### Parameters

- `date` - (필수) *Date* - 포맷이 필요한 날짜

### Returns
- `text` - (string) - gantt에서 렌더링될 HTML 텍스트

### Example

~~~jsx
gantt.templates.xml_format = function(date){
    return gantt.date.date_to_str(gantt.config.xml_date)(date);
};
~~~

### Details

:::note
참고: 이 템플릿은 더 이상 사용되지 않습니다. 대신 [format_date](api/template/format_date.md)를 사용하세요:
:::

~~~js
var dateToStr = gantt.date.date_to_str("%Y-%m-%d %H:%i");
gantt.templates.format_date = function(date){
    return dateToStr (date);
};
~~~

이 템플릿은 [xml_date](api/config/xml_date.md) 구성에서 자동으로 생성되며, gantt 초기화 후에 재정의할 수 있습니다.

서버 측에서 [gantt date helper](api/other/date.md)가 지원하지 않는 형식을 기대하는 경우 커스텀 템플릿 함수를 사용할 수 있습니다.

예를 들어 서버 측에서 **start_date**를 UNIX 타임스탬프로 기대하고, 요청 매개변수가 아래와 같이 보이길 원한다고 가정해 봅시다:

- **start_date**:1503608400
- **duration**:4
- **text**:Task #2.2
- **parent**:3
- **end_date**:1503694800


다음과 같이 Gantt 구성을 설정해야 합니다:

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
- [날짜 변환 템플릿](guides/conversion-templates.md)
- [서버 사이드 통합](guides/server-side.md)

### Change log
- v6.2부터 더 이상 사용되지 않으며, v7.0에서 제거되었습니다
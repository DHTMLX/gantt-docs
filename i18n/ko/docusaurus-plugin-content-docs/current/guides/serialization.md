---
title: "XML 및 JSON으로 데이터 직렬화"
sidebar_label: "XML 및 JSON으로 데이터 직렬화"
---

# XML 및 JSON으로 데이터 직렬화

## JSON 형식

간트 차트의 데이터를 JSON 객체로 직렬화하려면 [serialize](api/method/serialize.md) 메서드를 아래와 같이 사용합니다:

~~~js
const json = gantt.serialize();
~~~

결과적으로 위 코드의 **json** 변수는 다음과 같이 보일 것입니다:

~~~js
{
    "data": [{ "id": "1", "text": "Project #1", "start_date": "01-04-2026 00:00", ...}, ...], 
    "links":[{ "id": "1", "source": "1", "target": "2", "type": "1" }, ...]
}
~~~

## XML 형식

간트 차트의 데이터를 XML 문자열로 직렬화하려면 [serialize](api/method/serialize.md) 메서드를 아래와 같이 사용합니다:

~~~js
const xml = gantt.serialize("xml");
~~~

결과적으로 위 코드의 **xml** 변수는 다음과 같이 보일 것입니다:

~~~html
<data>
    <task id='11' parent=''   start_date='01-04-2026 00:00' duration='11' 
     open='true' progress='0.6' end_date='12-04-2026 00:00'>
        <![CDATA[Project #1]]>
    </task>
    <task id='12' parent='11' start_date='03-04-2026 00:00' duration='5' 
     open='true' progress='1' end_date='08-04-2026 00:00'>
        <![CDATA[Task #1]]>
    </task>
</data>
~~~

:::note
구 버전(dhtmlxGantt \<2.0)의 XML 형식으로의 직렬화는 사용할 수 없습니다
:::
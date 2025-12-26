---
title: "데이터를 XML 및 JSON으로 직렬화하기"
sidebar_label: "데이터를 XML 및 JSON으로 직렬화하기"
---

# 데이터를 XML 및 JSON으로 직렬화하기  

## JSON 형식  

간트 차트의 데이터를 JSON 객체로 변환하려면 [serialize](api/method/serialize.md) 메서드를 다음과 같이 사용할 수 있습니다:

~~~js
var json = gantt.serialize();
~~~

위 예제의 **json** 변수에는 아래와 유사한 데이터가 포함됩니다:

~~~js
{
 "data": [{"id":"1", "text":"Project #1", "start_date":"01-04-2013 00:00", ...}, ...], 
 "links":[{"id":"1", "source":"1", "target":"2", "type": "1"}, ...]
}
~~~

## XML 형식  

간트 차트의 데이터를 XML 문자열로 변환하려면 [serialize](api/method/serialize.md) 메서드를 다음과 같이 사용합니다:

~~~js
var xml = gantt.serialize("xml");
~~~

위 예제의 **xml** 변수에는 아래와 비슷한 데이터가 저장됩니다:

~~~html
<data>
    <task id='11' parent=''   start_date='01-04-2013 00:00' duration='11' 
     open='true' progress='0.6' end_date='12-04-2013 00:00'>
        <![CDATA[Project #1]]>
    </task>
    <task id='12' parent='11' start_date='03-04-2013 00:00' duration='5' 
     open='true' progress='1' end_date='08-04-2013 00:00'>
        <![CDATA[Task #1]]>
    </task>
</data>
~~~

:::note
이전(dhtmlxGantt \<2.0) XML 형식으로의 직렬화는 지원되지 않습니다
:::


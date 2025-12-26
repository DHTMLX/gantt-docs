---
title: "将数据序列化为 XML 和 JSON"
sidebar_label: "将数据序列化为 XML 和 JSON"
---

# 将数据序列化为 XML 和 JSON

## JSON 格式

要将甘特图中的数据转换为 JSON 对象，可以像下面这样使用 [serialize](api/method/serialize.md) 方法:

~~~js
var json = gantt.serialize();
~~~

上例中的 **json** 变量将包含类似如下的数据:

~~~js
{
 "data": [{"id":"1", "text":"Project #1", "start_date":"01-04-2013 00:00", ...}, ...], 
 "links":[{"id":"1", "source":"1", "target":"2", "type": "1"}, ...]
}
~~~

## XML 格式

要将甘特图中的数据转换为 XML 字符串，可以如下使用 [serialize](api/method/serialize.md) 方法:

~~~js
var xml = gantt.serialize("xml");
~~~

上例中的 **xml** 变量将包含类似如下的数据:

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
不支持序列化为旧版（dhtmlxGantt \<2.0）XML 格式
:::


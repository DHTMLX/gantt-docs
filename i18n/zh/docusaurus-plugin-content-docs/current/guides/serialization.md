---
title: "将数据序列化为 XML 与 JSON"
sidebar_label: "将数据序列化为 XML 与 JSON"
---

# 将数据序列化为 XML 与 JSON

## JSON 格式

要将甘特图中的数据序列化为 JSON 对象，请使用 [serialize](api/method/serialize.md) 方法，如下所示：

~~~js
const json = gantt.serialize();
~~~

因此，上述代码中的 **json** 变量大致如下：

~~~js
{
    "data": [{ "id": "1", "text": "Project #1", "start_date": "01-04-2026 00:00", ...}, ...], 
    "links":[{ "id": "1", "source": "1", "target": "2", "type": "1" }, ...]
}
~~~



## XML 格式

要将甘特图中的数据序列化为 XML 字符串，请使用 [serialize](api/method/serialize.md) 方法，如下所示：

~~~js
const xml = gantt.serialize("xml");
~~~

因此，上述代码中的 **xml** 变量大致如下：

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
旧版本（dhtmlxGantt \<2.0）XML 格式的序列化不可用
:::
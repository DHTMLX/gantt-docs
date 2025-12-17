---
title: "Serializing Data into XML and JSON"
sidebar_label: "Serializing Data into XML and JSON"
---

Serializing Data into XML and JSON 
===============================================

JSON format
--------------------------------------------------

To serialize data from a Gantt chart into a JSON object, use the [serialize](api/method/serialize.md) method as in:

~~~js
const json = gantt.serialize();
~~~

As a result, the **json** variable from the code above will look something like this:

~~~js
{
    "data": [{ "id": "1", "text": "Project #1", "start_date": "01-04-2026 00:00", ...}, ...], 
    "links":[{ "id": "1", "source": "1", "target": "2", "type": "1" }, ...]
}
~~~

XML format
----------------------------------

To serialize data from a Gantt chart into an XML string, use the [serialize](api/method/serialize.md) method as in:

~~~js
const xml = gantt.serialize("xml");
~~~

As a result, the **xml** variable from the code above will look something like this:

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
Serialization to old (dhtmlxGantt \<2.0) XML format is not available
:::


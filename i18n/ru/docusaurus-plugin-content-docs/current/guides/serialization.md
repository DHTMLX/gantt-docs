---
title: "Сериализация данных в XML и JSON"
sidebar_label: "Сериализация данных в XML и JSON"
---

Сериализация данных в XML и JSON
===============================================

Формат JSON
--------------------------------------------------

Для преобразования данных из диаграммы Gantt в объект JSON можно использовать метод [serialize](api/method/serialize.md) следующим образом:

~~~js
var json = gantt.serialize();
~~~

Переменная **json** в приведённом выше примере будет содержать данные, похожие на следующие:

~~~js
{
 "data": [{"id":"1", "text":"Project #1", "start_date":"01-04-2013 00:00", ...}, ...], 
 "links":[{"id":"1", "source":"1", "target":"2", "type": "1"}, ...]
}
~~~

Формат XML
----------------------------------

Для преобразования данных из диаграммы Gantt в строку XML используется метод [serialize](api/method/serialize.md) следующим образом:

~~~js
var xml = gantt.serialize("xml");
~~~

Переменная **xml** из приведённого выше примера будет содержать данные, подобные этим:

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
Сериализация в старый XML-формат (dhtmlxGantt \<2.0) недоступна
:::


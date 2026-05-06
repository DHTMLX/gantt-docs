---
title: "Сериализация данных в XML и JSON"
sidebar_label: "Сериализация данных в XML и JSON"
---

# Сериализация данных в XML и JSON

## Формат JSON

Чтобы сериализовать данные из Gantt-графика в объект JSON, используйте метод [serialize](api/method/serialize.md) как показано:

~~~js
const json = gantt.serialize();
~~~

В результате переменная **json** из приведенного выше кода будет выглядеть примерно так:

~~~js
{
    "data": [{ "id": "1", "text": "Project #1", "start_date": "01-04-2026 00:00", ...}, ...], 
    "links":[{ "id": "1", "source": "1", "target": "2", "type": "1" }, ...]
}
~~~

## Формат XML

Чтобы сериализовать данные из Gantt-графика в XML-строку, используйте метод [serialize](api/method/serialize.md) как показано:

~~~js
const xml = gantt.serialize("xml");
~~~

В результате переменная **xml** из приведенного выше кода будет выглядеть примерно так:

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
Сериализация в старый (dhtmlxGantt \<2.0) XML-формат недоступна
:::
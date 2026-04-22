---
sidebar_label: xml_format
title: xml_format шаблон
description: "Объект даты преобразуется в строку в соответствии с этим шаблоном. Используется для отправки данных обратно на сервер"
---

# xml_format
:::warning
Этот шаблон устарел.
:::

### Description

@short: Объект даты преобразуется в строку в соответствии с этим шаблоном. Используется для отправки данных обратно на сервер

### Parameters

- `date` - (required) *Date* - дата, которая требует форматирования

### Returns
- ` text` - (string) - html-текст, который будет отображаться в диаграмме Ганта

### Example

~~~jsx
gantt.templates.xml_format = function(date){
    return gantt.date.date_to_str(gantt.config.xml_date)(date);
};
~~~

### Details

:::note
Примечание. Шаблон устарел. Используйте [format_date](api/template/format_date.md) вместо него:
:::

~~~js
var dateToStr = gantt.date.date_to_str("%Y-%m-%d %H:%i");
gantt.templates.format_date = function(date){
    return dateToStr (date);
};
~~~

Этот шаблон автоматически генерируется из конфигурации [xml_date](api/config/xml_date.md) и может быть переопределён после [инициализации gantt](api/method/init.md).

Можно использовать собственную функцию шаблона, если серверная сторона ожидает формат, который не поддерживается [gantt date helper](api/other/date.md).

Например, предположим, что сервер ожидает **start_date** в виде UNIX timestamp, и параметры запроса должны выглядеть следующим образом:

- **start_date**:1503608400
- **duration**:4
- **text**:Task #2.2
- **parent**:3
- **end_date**:1503694800


Следует настроить конфигурацию Gantt следующим образом:

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
- [Шаблоны преобразования дат](guides/conversion-templates.md)
- [Интеграция на стороне сервера](guides/server-side.md)

### Change log
- устарел с версии v6.2, удалён с версии v7.0
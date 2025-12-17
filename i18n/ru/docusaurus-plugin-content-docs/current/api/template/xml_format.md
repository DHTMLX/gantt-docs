---
sidebar_label: xml_format
title: xml_format template
description: "Преобразует объект даты в строку по заданному шаблону. Используется для отправки данных обратно на сервер."
---

# xml_format

### Description

@short: Преобразует объект даты в строку по заданному шаблону. Используется для отправки данных обратно на сервер.

### Parameters

- `date` - (required) *Date* - Дата, которую необходимо отформатировать.

### Returns
- ` text` - (string) - HTML-текст, который будет отображён в диаграмме Ганта.

### Example

~~~jsx
gantt.templates.xml_format = function(date){
    return gantt.date.date_to_str(gantt.config.xml_date)(date);
};
~~~

### Details

:::note
 Этот шаблон устарел. Пожалуйста, используйте [format_date](api/template/format_date.md) вместо него: 
:::

~~~js
var dateToStr = gantt.date.date_to_str("%Y-%m-%d %H:%i");
gantt.templates.format_date = function(date){
    return dateToStr(date);
};
~~~

Этот шаблон автоматически генерируется из конфигурации [xml_date](api/config/xml_date.md) и может быть переопределён после [инициализации Gantt](api/method/init.md).

Можно создать пользовательскую функцию шаблона, если сервер требует формат даты, не поддерживаемый [помощником по дате Gantt](api/other/date.md).

Например, если сервер ожидает **start_date** в виде UNIX timestamp, а параметры запроса должны быть:

- **start_date**:1503608400
- **duration**:4
- **text**:Task #2.2
- **parent**:3
- **end_date**:1503694800

Конфигурация Gantt может быть настроена так:

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
- [Шаблоны для преобразования дат](guides/conversion-templates.md)
- [Интеграция с серверной стороной](guides/server-side.md)

### Change log
- Устарел с версии v6.2, удалён начиная с v7.0


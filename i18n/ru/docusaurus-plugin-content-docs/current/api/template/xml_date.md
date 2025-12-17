---
sidebar_label: xml_date
title: xml_date template
description: "Этот шаблон преобразует строку из XML-файла в объект даты на основе заданного формата."
---

# xml_date

### Description

@short: Этот шаблон преобразует строку из XML-файла в объект даты на основе заданного формата.

### Parameters

- `date` - (required) *Date* - Дата, которую необходимо отформатировать.

### Returns
- ` text` - (string) - HTML-текст, который будет отображаться на диаграмме Ганта.

### Example

~~~jsx
gantt.templates.xml_date = function(date){
    return gantt.date.date_to_str(gantt.config.xml_date)(date);
};
~~~

### Details

:::note
 Этот шаблон устарел. Пожалуйста, используйте [parse_date](api/template/parse_date.md) вместо него: 
:::

~~~js
const cfg = gantt.config;
const strToDate = gantt.date.str_to_date(cfg.date_format, cfg.server_utc);
 
gantt.templates.parse_date = function(date){
    return strToDate(date);
};
~~~

Этот шаблон генерируется автоматически из конфигурации [xml_date](api/config/xml_date.md) и может быть настроен после [инициализации Gantt](api/method/init.md).

Вы можете создать собственную функцию шаблона, если формат даты сервера не поддерживается [Gantt date helper](api/other/date.md).

Например, при использовании UNIX-времени для **start_date**: 

~~~js
{
    "data":[
    {
        "id":1,
        "start_date":1503608400,
        "duration":10,
        "text":"Task #1",
        "parent":0,
    },
    {
        "id":2,
        "start_date":1503694800,
        "duration":4,
        "text":"Task #2",
        "parent":0,
    }],

    "links":[
    ]
}
~~~

Конфигурация Gantt должна быть настроена следующим образом:

~~~js
gantt.attachEvent("onTemplatesReady", function(){
    gantt.templates.xml_date = function(dateString){
        return new Date(dateString * 1000);
    }
});

gantt.init("gantt_here");
gantt.load("/data");
~~~

### Related API
- [xml_date](api/config/xml_date.md)
- [xml_format](api/template/xml_format.md)
- [date](api/other/date.md)

### Related Guides
- [Шаблоны для преобразования дат](guides/conversion-templates.md)

### Change log
- Устарел с версии v6.2, удалён в версии v7.0


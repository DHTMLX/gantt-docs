---
sidebar_label: xml_date
title: Шаблон xml_date
description: "Строка из XML-файла приводится к объекту даты в соответствии с этим шаблоном"
---

# xml_date
:::warning
The template is deprecated.
:::
### Description

@short: Строка из XML-файла приводится к объекту даты в соответствии с этим шаблоном

### Parameters

- `date` - (required) *Date* - дата, которую нужно отформатировать

### Returns
- ` text` - (string) - html-текст, который будет отрисован в диаграмме Ганта

### Example

~~~jsx
gantt.templates.xml_date = function(date){
    return gantt.date.date_to_str(gantt.config.xml_date)(date);
};
~~~

### Details

:::note
Шаблон устарел. Используйте [parse_date](api/template/parse_date.md) вместо этого:
:::

~~~js
const cfg = gantt.config;
const strToDate = gantt.date.str_to_date(cfg.date_format, cfg.server_utc);
 
gantt.templates.parse_date = function(date){
    return strToDate (date);
};
~~~

Этот шаблон автоматически генерируется из конфигурации [xml_date](api/config/xml_date.md) и может быть переопределен после [инициализации gantt](api/method/init.md).

Можно использовать настраиваемую функцию шаблона, если формат дат сервера не поддерживается [gantt date helper](api/other/date.md).

Например, использование UNIX-времени для **start_date**: 

фрагмент /data :
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

Установите конфигурацию Gantt следующим образом:

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
- [Шаблоны конвертации дат](guides/conversion-templates.md)

### Change log
- устарел с версии v6.2, удален с версии v7.0
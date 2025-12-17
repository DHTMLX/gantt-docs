---
sidebar_label: xml_date
title: xml_date template
description: "此模板用于将 XML 文件中的字符串根据指定格式转换为日期对象。"
---

# xml_date

### Description

@short: 此模板用于将 XML 文件中的字符串根据指定格式转换为日期对象。

### Parameters

- `date` - (required) *Date* - 需要格式化的日期。

### Returns
- ` text` - (string) - 将在甘特图中显示的 HTML 文本。

### Example

~~~jsx
gantt.templates.xml_date = function(date){
    return gantt.date.date_to_str(gantt.config.xml_date)(date);
};
~~~

### Details

:::note
 此模板已废弃。请改用 [parse_date](api/template/parse_date.md): 
:::

~~~js
const cfg = gantt.config;
const strToDate = gantt.date.str_to_date(cfg.date_format, cfg.server_utc);
 
gantt.templates.parse_date = function(date){
    return strToDate(date);
};
~~~

此模板是从 [xml_date](api/config/xml_date.md) 配置自动生成的，可以在 [Gantt 初始化](api/method/init.md) 后进行自定义。

如果服务器日期格式不被 [Gantt 日期助手](api/other/date.md) 支持，您可以创建自定义模板函数。

例如，当使用 UNIX 时间作为 **start_date** 时:

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

甘特图配置应如下设置:

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
- [日期转换模板](guides/conversion-templates.md)

### Change log
- 自 v6.2 起废弃，v7.0 中移除


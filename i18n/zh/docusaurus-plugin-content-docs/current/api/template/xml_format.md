---
sidebar_label: xml_format
title: xml_format template
description: "将日期对象转换为符合此模板的字符串。此方法用于将数据发送回服务器。"
---

# xml_format

### Description

@short: 将日期对象转换为符合此模板的字符串。此方法用于将数据发送回服务器。

### Parameters

- `date` - (required) *Date* - 需要格式化的日期。

### Returns
- ` text` - (string) - 将在甘特图中显示的HTML文本。

### Example

~~~jsx
gantt.templates.xml_format = function(date){
    return gantt.date.date_to_str(gantt.config.xml_date)(date);
};
~~~

### Details

:::note
 此模板已被弃用。请改用 [format_date](api/template/format_date.md): 
:::

~~~js
var dateToStr = gantt.date.date_to_str("%Y-%m-%d %H:%i");
gantt.templates.format_date = function(date){
    return dateToStr(date);
};
~~~

此模板是从 [xml_date](api/config/xml_date.md) 配置自动生成的，并且可以在[Gantt初始化](api/method/init.md)后重新定义。

如果服务器需要的日期格式不被[Gantt日期助手](api/other/date.md)支持，可以创建自定义模板函数。

例如，如果服务器期望 **start_date** 以 UNIX 时间戳格式传递，请求参数应为:

- **start_date**:1503608400
- **duration**:4
- **text**:Task #2.2
- **parent**:3
- **end_date**:1503694800

则甘特配置可设置如下:

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
- [日期转换模板](guides/conversion-templates.md)
- [服务器端集成](guides/server-side.md)

### Change log
- 自v6.2起弃用，自v7.0起移除


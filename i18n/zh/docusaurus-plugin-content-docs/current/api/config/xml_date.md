---
sidebar_label: xml_date
title: xml_date config
description: "指定用于从数据集解析数据和向服务器发送数据的日期格式"
---

# xml_date

### Description

@short: 指定用于从数据集解析数据和向服务器发送数据的日期格式

### Example

~~~jsx
gantt.config.xml_date="%Y-%m-%d %H:%i";
...
gantt.init("gantt_here");
gantt.load("../data/tasks.json");
~~~

**Default value:** "%d-%m-%Y %H:%i"

### Details

:::note
 **xml_date** 属性已废弃。请改用 [date_format](api/config/date_format.md): 
:::

~~~js
gantt.config.date_format = "%Y-%m-%d %H:%i";
...
gantt.init("gantt_here");
gantt.load("../data/tasks.json");
~~~

### Related API
- [xml_date](api/template/xml_date.md)
- [xml_format](api/template/xml_format.md)

### Related Guides
- [日期格式规范](guides/date-format.md)

### Change log
- 自 v6.2 起废弃，自 v7.0 起移除


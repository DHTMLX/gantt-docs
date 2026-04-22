---
sidebar_label: xml_date
title: xml_date config
description: "定义用于从数据集解析数据以及向服务器发送数据的日期格式"
---

# xml_date

:::warning
该属性已被弃用。
:::

### Description

@short: 定义用于从数据集解析数据以及向服务器发送数据的日期格式

### Example

~~~jsx
gantt.config.xml_date="%Y-%m-%d %H:%i";
...
gantt.init("gantt_here");
gantt.load("../data/tasks.json");
~~~

**默认值：** "%d-%m-%Y %H:%i"

### Details

:::note
属性 **xml_date** 已弃用。请改用 [date_format](api/config/date_format.md) 代替：
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
- 自 v6.2 版本起已弃用，自 v7.0 版本起已移除
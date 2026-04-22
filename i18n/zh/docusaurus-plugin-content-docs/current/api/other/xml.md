---
sidebar_label: xml
title: xml config
description: "指定 XML 序列化和解析"
---

# xml

### Description

@short: 指定 XML 序列化和解析

@signature: xml: any

### Example

~~~jsx
const obj = gantt.xml; // -> { parse(text,loader){...}, serialize(){... }}
~~~

### Details

The XML object contains 2 members:

- **parse()** 方法 - 定义 dhtmlxGantt 将如何解析 XML 格式的数据。
- **serialize()** 方法 - 定义 dhtmlxGantt 将数据序列化为 XML 格式的方式。
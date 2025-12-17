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

XML 对象包含两个主要方法:

- **parse()** 方法 - 负责 dhtmlxGantt 如何读取和解析 XML 格式的数据。
- **serialize()** 方法 - 负责 dhtmlxGantt 如何将数据转换回 XML 格式。

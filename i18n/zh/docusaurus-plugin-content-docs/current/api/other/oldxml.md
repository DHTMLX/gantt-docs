---
sidebar_label: oldxml
title: oldxml config
description: "处理 dhtmlxGantt 1.0 中 XML 格式的序列化和解析"
---

# oldxml

### Description

@short: 处理 dhtmlxGantt 1.0 中 XML 格式的序列化和解析

@signature: oldxml: any

### Example

~~~jsx
var obj = gantt.oldxml; // -> { parse(text,loader){...}, serialize(){... }}
~~~

### Details

XML 对象包含两个关键方法:

- **parse()** - 管理 dhtmlxGantt 如何从 XML 格式读取数据。
- **serialize()** - 管理 dhtmlxGantt 如何将数据转换回 XML 格式。

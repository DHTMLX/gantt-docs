---
sidebar_label: oldxml
title: oldxml 配置
description: "指定 dhtmlxGantt 1.0 的 XML 格式的序列化与解析"
---

# oldxml

### Description

@short: 指定 dhtmlxGantt 1.0 的 XML 格式的序列化与解析

@signature: oldxml: any

### Example

~~~jsx
const obj = gantt.oldxml; // -> { parse(text,loader){...}, serialize(){... }}
~~~

### Details

XML 对象包含 2 个成员：

- **parse()** 方法  - 定义 dhtmlxGantt 将如何在 XML 格式中解析数据。
- **serialize()** 方法 - 定义 dhtmlxGantt 将如何把数据序列化为 XML 格式。
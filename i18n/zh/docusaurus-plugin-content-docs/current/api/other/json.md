---
sidebar_label: json
title: json 配置
description: "指定 JSON 序列化与解析"
---

# json

### Description
@short: 指定 JSON 序列化与解析

@signature: json: any

### Example

~~~jsx
const obj = gantt.json; // -> { parse(data){... }}
~~~

### Details

JSON 对象只有一个成员——**parse()** 方法，它定义了 dhtmlxGantt 将如何在 JSON 格式中解析数据。
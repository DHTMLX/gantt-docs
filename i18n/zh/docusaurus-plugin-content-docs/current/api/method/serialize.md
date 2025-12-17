---
sidebar_label: serialize
title: serialize method
description: "将数据转换为 JSON 或 XML 格式"
---

# serialize

### Description

@short: 将数据转换为 JSON 或 XML 格式

@signature: serialize: (type?: string) =\> any

### Parameters

- `type` - (optional) *string* - 指定序列化的格式。<br> 可选值:'json'（<i>默认</i>），'xml'。

### Returns
- ` data` - (object) - 返回一个 gantt 数据对象

### Example

~~~jsx
gantt.serialize('xml');
~~~

### Related API
- [parse](api/method/parse.md)

### Related Guides
- [将数据序列化为 XML 和 JSON](guides/serialization.md)
- [支持的数据格式](guides/supported-data-formats.md)


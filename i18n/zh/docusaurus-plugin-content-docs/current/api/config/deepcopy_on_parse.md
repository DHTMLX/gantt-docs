---
sidebar_label: deepcopy_on_parse
title: deepcopy_on_parse config
description: "定义 gantt 在将数据对象传入到 gantt.parse() 方法时，是否执行深拷贝"
---

# deepcopy_on_parse

### Description

@short: 定义 gantt 是否在将数据对象传入到 gantt.parse() 方法时执行深拷贝

@signature: deepcopy_on_parse: boolean

### Example

~~~jsx
gantt.config.deepcopy_on_parse = true;
~~~

**Default value:** false

### Details

- 如果将该属性设置为 *true*，gantt 将尝试对传入 [gantt.parse](api/method/parse.md) 方法的数据对象执行深拷贝。因此，内部的 gantt 数据对象将与源数据对象断开连接，对 gantt 所作的修改将不再影响原始数据对象。
- 如果将该属性设置为 *false*（默认值），gantt 将重用在 [gantt.parse](api/method/parse.md) 方法中提供的数据对象（这是一个浅拷贝）。这些对象将保持连接，对 gantt 所作的修改将应用到原始数据对象。

### Change log
- 在 v7.1 中新增
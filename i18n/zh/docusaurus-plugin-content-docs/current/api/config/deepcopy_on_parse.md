---
sidebar_label: deepcopy_on_parse
title: deepcopy_on_parse config
description: "控制 gantt 是否对传入 gantt.parse() 方法的数据对象进行深拷贝"
---

# deepcopy_on_parse

### Description

@short: 控制 gantt 是否对传入 gantt.parse() 方法的数据对象进行深拷贝

@signature: deepcopy_on_parse: boolean

### Example

~~~jsx
gantt.config.deepcopy_on_parse = true;
~~~

**Default value:** false

### Details

- 当设置为 *true* 时，gantt 会对传入 [gantt.parse](api/method/parse.md) 方法的数据对象进行深拷贝。这意味着内部的 gantt 数据对象与原始对象是分离的，因此 gantt 内部的任何更改都不会影响源数据。
- 当设置为 *false*（默认值）时，gantt 使用传入 [gantt.parse](api/method/parse.md) 方法的相同数据对象（浅拷贝）。在这种情况下，这些对象保持关联，gantt 内部的更改会同步更新到原始数据。

### Change log
- 在 v7.1 版本中添加


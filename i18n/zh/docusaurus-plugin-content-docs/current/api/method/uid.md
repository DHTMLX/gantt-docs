---
sidebar_label: uid
title: uid method
description: "返回一个唯一的id"
---

# uid

### Description

@short: 返回一个唯一的id

@signature: uid: () =\> number

### Returns
- ` id` - (number) - 一个唯一的id

### Example

~~~jsx
var id = gantt.uid();
~~~

### Details

生成的id在当前页面会话中是唯一的。 
它适合用于页面内的逻辑，但不应被用作数据库标识符。

### Change log
- 在版本4.0中添加

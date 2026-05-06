---
sidebar_label: uid
title: uid method
description: "返回一个唯一的 id"
---

# uid

### Description

@short: 返回一个唯一的 id

@signature: uid: () => number

### Returns
- ` id` - (number) - 一个唯一的 id

### Example

~~~jsx
var id = gantt.uid();
~~~

### Details

生成的 id 在同一页面内是唯一的，但不是全局。  
因此你可以在页面内的逻辑中使用该方法。但它不足以作为数据库的 ID。

### Change log
- 在版本 4.0 中新增
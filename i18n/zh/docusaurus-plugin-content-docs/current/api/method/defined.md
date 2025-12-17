---
sidebar_label: defined
title: defined method
description: "当给定参数为 undefined 时返回 false，否则返回 true"
---

# defined

### Description

@short: 当给定参数为 undefined 时返回 false，否则返回 true

@signature: defined: (param: any) =\> boolean

### Parameters

- `param` - (required) *any* - 要检查的对象属性

### Returns
- ` state` - (boolean) - 如果参数为 undefined 则返回 false，参数有值时返回 true

### Example

~~~jsx
// 检查任务对象上是否存在 "custom_property" 属性
if(gantt.defined(task.custom_property)){
  // ..
};
~~~

### Change log
- added in version 4.0

---
sidebar_label: defined
title: defined 方法
description: "在提供的参数未定义时返回 false，否则返回 true"
---

# defined

### Description

@short: 当提供的参数未定义时返回 false，否则返回 true

@signature: defined: (param: any) => boolean

### Parameters

- `param` - (必填) *任意类型* - 应该检查的对象的一个属性

### Returns
- ` state` - (boolean) - 当提供的参数未定义时返回 false，否则返回 true

### Example

~~~jsx
// 检查任务对象上是否存在 "custom_property" 属性
if(gantt.defined(task.custom_property)){
  // ..
};
~~~

### Change log
- 在版本 4.0 中新增
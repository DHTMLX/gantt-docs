---
sidebar_label: bind
title: bind method
description: "创建一个新函数，该函数被调用时，其 <i>this</i> 关键字将被设置为指定的值"
---

# bind

### Description

@short: 创建一个新函数，该函数被调用时，其 <i>this</i> 关键字将被设置为指定的值

@signature: bind: (method: GanttCallback, thisArg: any) =\> GanttCallback

### Parameters

- `method` - (required) *function* - 要绑定的函数
- `thisArg` - (required) *object* - 绑定函数调用时用作 <i>this</i> 上下文的值

### Returns
- ` bound_function` - (function) - 一个新函数，调用时会使用给定的 <i>this</i> 值来执行原始函数

### Example

~~~jsx
gantt.bind(method, thisArg);
~~~

### Details

此方法作为 IE8 兼容的替代方案，用于替代
[Function.prototype.bind()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind) 
函数。

### Change log
- 版本 4.0 中添加

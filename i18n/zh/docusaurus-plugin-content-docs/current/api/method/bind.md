---
sidebar_label: bind
title: bind 方法
description: "创建一个新函数，当调用时，其 <i>this</i> 关键字将被提供的值所设置"
---

# bind

### Description

@short: 在被调用时，将其 <i>this</i> 关键字设置为提供的值，从而返回一个新的函数

@signature: bind: (method: GanttCallback, thisArg: any) =\> GanttCallback

### Parameters

- `method` - (必填) *function* - 目标函数
- `thisArg` - (必填) *object* - 将作为绑定函数调用时传递给目标函数的 <i>this</i> 参数的值

### Returns
- ` bound_function` - (function) - 一个新函数，调用时会使用给定的 <i>this</i> 值来执行原始函数

### Example

~~~jsx
gantt.bind(method, thisArg);
~~~

### Details

该方法用作 IE8 兼容的替代实现 [Function.prototype.bind()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind) 函数。

### Change log
- 版本 4.0 中添加

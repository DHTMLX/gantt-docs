---
sidebar_label: Promise
title: Promise method
description: "Promise 对象的构造函数"
---

# Promise

### Description

@short: Promise 对象的构造函数

@signature: Promise: new (executor: (resolve: (value?: any) =\> void, reject: (reason?: any) =\> void) =\> void) =\> Promise\<unknown\>

### Parameters

- `executor` - (required) *function* - 用于设置 promise 的回调函数

### Returns
- ` promise` - (object) - 返回生成的 promise 对象

### Example

~~~jsx
new gantt.Promise(function(resolve, reject) {
    setTimeout(function(){
        resolve();
    }, 5000);
}).then(function(){
    alert("Resolved")
});
~~~

### Details

这是来自 [Bluebird](http://bluebirdjs.com/docs/why-bluebird.html) 的 Promise 对象构造函数，已包含在 Gantt 库中。

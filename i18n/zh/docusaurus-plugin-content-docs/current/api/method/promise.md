---
sidebar_label: Promise
title: Promise 方法
description: "Promise 对象构造函数"
---

# Promise

### Description

@short: Promise 对象构造函数

@signature: Promise: new (executor: (resolve: (value?: any) =\> void, reject: (reason?: any) =\> void) =\> void) =\> Promise\<unknown\>

### Parameters

- `executor` - (required) *function* - 一个用于初始化 Promise 的回调函数

### Returns
- ` promise` - (object) - 这个 Promise 对象

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

[Bluebird](http://bluebirdjs.com/docs/why-bluebird.html) Promise 对象构造函数，与 Gantt 库一起打包。
---
sidebar_label: ajax
title: ajax config
description: "gantt ajax 模块"
---

# ajax

### Description

@short: Gantt ajax 模块

@signature: ajax: any

### Example

~~~jsx
// 假设响应如下所示
{status: "ok", data: "value", data2: "value2"}


var xhr = gantt.ajax;

// HTTP GET
xhr.get("server.php").then(function(response) {
    var res = JSON.parse(response.responseText); 
    if (res && res.status == "ok") {
        // 响应正常
    }
});

// HTTP POST
xhr.post({
    url:"server.php", 
    data: {
       paramName: "paramValue"
    }
}).then(function(response){
    var res = JSON.parse(response.responseText); 
    if (res && res.status == "ok") {
        // 响应正常
    }
});
~~~

### Details

## API 参考

所有方法都接受两种参数传递方式之一:

1) RequestConfig - 一个包含请求配置选项的对象，结构如下:

~~~js
{
  url: string,
  method: "PUT|GET|POST|DELETE",
  data: string | object,
  async: true|false,
  callback: function,
  headers: object
}
~~~

参数说明:

- url - 服务器 URL
- method - 可选，HTTP 请求方法，默认为 "GET"
- data - 可选，POST 或 PUT 请求中发送的数据，可以是字符串或对象
- async - 可选，是否异步请求，默认为 true
- callback - 可选，响应接收后调用的函数
- headers - 可选，包含请求头键值对的对象

或者:

2) 三个参数（**query()** 方法除外，query 只接受一个 *RequestConfig* 对象）:

- url - 服务器 URL
- data - 可选，POST 请求发送的数据
- callback - 可选，响应接收后调用的函数

下面列出了 ajax 模块 API 中可用的方法:

#### 回调选项

所有方法都支持回调函数和 [promises](#promises) 方式来处理响应。

ajax promise 会返回一个完成的 XmlHttpRequest 对象:

~~~js
gantt.ajax.post({ 
    url:"some.php",
    data: {
       paramName: "paramValue"
    }
}).then(function(response){
    alert(response.responseText);
});
~~~

出于兼容性考虑，回调函数接收的结果格式稍有不同:

~~~js
gantt.ajax.post({ 
    url:"some.php",
    data: {
       paramName: "paramValue"
    },
    callback: function(result){
       var response = result.xmlDoc;
       
       alert(response.responseText);
    }
});
~~~


#### query

通用请求发送方法。可在参数中指定任意 HTTP 方法。

~~~js
gantt.ajax.query({ 
    url:"some.php",
    method:"POST",
    data: {
       paramName: "paramValue"
    }
}).then(function(response){
    alert(response.responseText);
});

~~~

#### get

发送 GET 请求。

~~~js
gantt.ajax.get("some.php", function(){
    // 这里写你的代码
});
// 或者
gantt.ajax.get({
    url: "https://…",
    callback: function() {…},
    headers: { "Content-Type": "application/json" }
});
~~~

#### put

发送 PUT 请求。

~~~js
gantt.ajax.put("server.php", "keep_alive=1&version=std", function(){
    // 这里写你的代码
});
// 或者
gantt.ajax.put({
   url: "https://…",
   callback: function() {…},
   headers: { "Content-Type": "application/json" },
   data: {}
});
~~~

#### del

发送 DELETE 请求。

~~~js
gantt.ajax.del("server.php", function(){
    // 这里写你的代码
});
// 或者
gantt.ajax.del({
   url: "https://…",
   callback: function() {…},
   headers: { "Content-Type": "application/json" }
});
~~~

#### post

发送 POST 请求。

~~~js
gantt.ajax.post("server.php", "keep_alive=1&version=std", function(){
    // 这里写你的代码
});
// 或者
gantt.ajax.post({
      url: "https://…",
      callback: function() {…},
      headers: { "Content-Type": "application/json" },
      data: {}
});
~~~

## 使用 POST/PUT 方法发送数据

post 和 put 方法中，data 参数可以传入一个对象而非字符串。当传入对象时，ajax 模块会自动处理序列化。简单对象会被序列化为表单数据格式（&param=value），而嵌套结构则使用 JSON.stringify() 序列化。

例如，下面的对象:

~~~js
{
    id: 1,
    text: "My Task",
    users: [1,2,3]
}
~~~

会被转换成字符串 `id=1&text=My%20Task&users=%5B1%2C2%2C3%5D`。

### Promises {#promises}

dhtmlxGantt 支持 promises（包括 IE8+）。内部使用 [Bluebird](https://github.com/petkaantonov/bluebird) promise 库。创建 promise 使用如下构造函数:

~~~js
var promise = new gantt.Promise(function(resolve, reject) {...});
~~~

Promise 对象定义在 Gantt 内部，而非全局。

AJAX 模块返回 promise，因此可以使用 promise 语法替代回调。例如，代替:

~~~js
gantt.ajax.post(url, params, callback);
~~~

可以写成:

~~~js
gantt.ajax.post(url, params).then(function(){…});
~~~

回调和 promise 可以同时使用。

下面示例演示同时发送多个请求，完成后重新加载数据:

~~~js 
gantt.Promise.all([
      gantt.ajax.post({url: "api/task", data: task1}),
      gantt.ajax.post({url: "api/task", data: task2}),
      gantt.ajax.post({url: "api/task", data: task3})
]).then(function(){
   gantt.clearAll();
   gantt.load("/api");
});
~~~

### Change log
- 版本 4.0 新增

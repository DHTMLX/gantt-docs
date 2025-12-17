---
sidebar_label: ajax
title: ajax config
description: "gantt ajax module"
---

# ajax

### Description

@short: Gantt ajax module

@signature: ajax: any

### Example

~~~jsx
// assuming that the response is the following
{status: "ok", data: "value", data2: "value2"}


var xhr = gantt.ajax;

// HTTP GET
xhr.get("server.php").then(function(response) {
    var res = JSON.parse(response.responseText); 
    if (res && res.status == "ok") {
        // response is ok
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
        // response is ok
    }
});
~~~

### API Reference

All methods can take as parameters either:

1) RequestConfig - an object with request config options, which looks as follows:

~~~js
{
  url: string,
  method: "PUT|GET|POST|DELETE",
  data: string | object,
  async: true|false
  callback: function,
  headers: object
}
~~~

where:

- url - the URL to the server side
- method - optional, the method used for sending request, "GET" by default
- data - optional, the data sent to the server side by the POST-request. The POST and PUT methods accept both a string and an object with data
- async - optional, the mode of sending data to a server, true by default
- callback - optional, a function to call after the response is loaded
- headers - optional, a set of headers, defined as "key":"value" pairs that should be sent with a request

or:

2) Three parameters (except for the **query()** method which can take only the *RequestConfig* object): 

- url - the URL to the server side
- data - optional, the data sent to the server side by the POST-request
- callback - optional, a function to call after the response is loaded

The list of the ajax module API is given below:

#### Callback options

All methods allow both callbacks or [promises](#promises) for response handling.

An ajax promise returns a completed XmlHttpRequest:

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

For historical reasons, the callback option receives value in a slightly different format:

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

the common method of sending requests. Allows sending any type of request (you need just to specify the desired request in the parameters)

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

sends a GET request

~~~js
gantt.ajax.get("some.php", function(){
    // your code here
});
// or
gantt.ajax.get({
    url: "https://…",
    callback: function() {…},
    headers: { "Content-Type": "application/json" }
});
~~~

#### put

sends a PUT request

~~~js
gantt.ajax.put("server.php", "keep_alive=1&version=std", function(){
    // your code here
});
// or
gantt.ajax.put({
   url: "https://…",
   callback: function() {…},
   headers: { "Content-Type": "application/json" }
   data: {}
});
~~~

#### del

sends a DELETE request 

~~~js
gantt.ajax.del("server.php", function(){
    // your code here
});
// or
gantt.ajax.del({
   url: "https://…",
   callback: function() {…},
   headers: { "Content-Type": "application/json" }
});
~~~

#### post

sends a POST request

~~~js
gantt.ajax.post("server.php", "keep_alive=1&version=std", function(){
    // your code here
});
// or
gantt.ajax.post({
      url: "https://…",
      callback: function() {…},
      headers: { "Content-Type": "application/json" }
      data: {}
});
~~~

### Sending data with POST/PUT methods 

You can pass an object with data instead of string into the **post** and **put** methods. In case an object is passes, the ajax module serializes it by itself. 
A simple object will be serialized as form data (&param=value), nested structures will be serialized with the help of JSON.stringify().

For example, the following object:

~~~js
{
    id: 1,
    text: "My Task",
    users: [1,2,3]
}
~~~

will be converted into a string that looks like `id=1&text=My%20Task&users=%5B1%2C2%2C3%5D`.

### Promises

dhtmlxGantt supports usage of promises (including IE8+). For work with promises Gantt uses the [Bluebird](https://github.com/petkaantonov/bluebird) promise library. 
To create a promise, you need to use the following constructor:

~~~js
var promise = new gantt.Promise(function(resolve, reject) {...});
~~~

Promise is declared inside Gantt, not globally for the application.

The AJAX module returns a promise, which allows using the promise interface instead of the callback. Thus instead of using

~~~js
gantt.ajax.post(url, params, callback);
~~~

For example, when sending a POST request, you can use the following record:

~~~js
gantt.ajax.post(url, params).then(function(){…});
~~~

It is possible to use callbacks and promises at the same time. 

The example below shows how you can send several requests to the server at once, and reload data after that: 
 
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
- added in version 4.0

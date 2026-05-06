---
sidebar_label: ajax
title: ajax config
description: "gantt ajax 모듈"
---

# AJAX

### Description

@short: Gantt Ajax 모듈

@signature: ajax: any

### Example

~~~jsx
// 아래와 같은 응답이 있다고 가정
{status: "ok", data: "value", data2: "value2"}


var xhr = gantt.ajax;

// HTTP GET
xhr.get("server.php").then(function(response) {
    var res = JSON.parse(response.responseText); 
    if (res && res.status == "ok") {
        // 응답이 정상입니다
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
        // 응답이 정상입니다
    }
});
~~~

### API Reference

모든 메서드는 매개변수로 아래 두 가지 형태 중 하나를 받을 수 있습니다:

1) RequestConfig - 요청 구성 옵션이 포함된 객체로, 아래와 같은 형태를 가집니다:

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

다음과 같이 정의됩니다:

- url - 서버 쪽의 URL
- method - 선택적, 전송에 사용되는 메서드이며 기본값은 "GET"
- data - 선택적, POST 요청으로 서버에 전송되는 데이터. POST 및 PUT 메서드는 문자열과 데이터가 포함된 객체를 모두 허용합니다
- async - 선택적, 서버로 데이터를 전송하는 모드이며 기본값은 true
- callback - 선택적, 응답이 로드된 후 호출될 함수
- headers - 선택적, 요청과 함께 전송될 "키":"값" 쌍으로 정의된 헤더의 집합

또는:

2) 세 매개변수(오직 *RequestConfig* 객체만 받을 수 있는 **query()** 메서드를 제외하고):

- url - 서버 쪽의 URL
- data - 선택적, POST 요청으로 서버에 전송되는 데이터
- callback - 선택적, 응답이 로드된 후 호출될 함수

다음은 ajax 모듈 API의 목록입니다:

#### Callback 옵션

모든 메서드는 응답 처리를 위해 콜백 또는 [promises](#promises) 둘 다 허용합니다.

ajax 프라미스는 완료된 XmlHttpRequest를 반환합니다:

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

역사적 이유로, callback 옵션은 값을 약간 다른 포맷으로 받습니다:

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

요청을 보내는 공통 메서드입니다. 매개변수에 원하는 요청을 지정하면 모든 유형의 요청을 보낼 수 있습니다:

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

GET 요청을 보냅니다

~~~js
gantt.ajax.get("some.php", function(){
    // 여기에 코드 작성
});
// 또는
gantt.ajax.get({
    url: "https://…",
    callback: function() {…},
    headers: { "Content-Type": "application/json" }
});
~~~

#### put

PUT 요청을 보냅니다

~~~js
gantt.ajax.put("server.php", "keep_alive=1&version=std", function(){
    // 여기에 코드 작성
});
// 또는
gantt.ajax.put({
   url: "https://…",
   callback: function() {…},
   headers: { "Content-Type": "application/json" }
   data: {}
});
~~~

#### del

DELETE 요청을 보냅니다 

~~~js
gantt.ajax.del("server.php", function(){
    // 여기에 코드 작성
});
// 또는
gantt.ajax.del({
   url: "https://…",
   callback: function() {…},
   headers: { "Content-Type": "application/json" }
});
~~~

#### post

POST 요청을 보냅니다

~~~js
gantt.ajax.post("server.php", "keep_alive=1&version=std", function(){
    // 여기에 코드 작성
});
// 또는
gantt.ajax.post({
      url: "https://…",
      callback: function() {…},
      headers: { "Content-Type": "application/json" }
      data: {}
});
~~~

### Sending data with POST/PUT methods 

데이터를 문자열 대신 객체로 전송할 수 있습니다. 객체가 전달되면 ajax 모듈이 자동으로 직렬화합니다. 
간단한 객체는 form data (&param=value)로 직렬화되며, 중첩 구조는 JSON.stringify()를 사용하여 직렬화됩니다.

다음 객체의 예:

~~~js
{
    id: 1,
    text: "My Task",
    users: [1,2,3]
}
~~~

다음 문자열로 변환됩니다: `id=1&text=My%20Task&users=%5B1%2C2%2C3%5D`.

### Promises

dhtmlxGantt는 프라미스 사용을 지원합니다(IE8+ 포함). 프라미스 작업을 위해 Gantt는 Bluebird 프라미스 라이브러리를 사용합니다. 
프라미스를 생성하려면 다음 생성자를 사용해야 합니다:

~~~js
var promise = new gantt.Promise(function(resolve, reject) {...});
~~~

프라미스는 애플리케이션 전체에서 전역으로 선언되지 않고 Gantt 내부에서 선언됩니다.

AJAX 모듈은 프라미스를 반환하며, 이를 통해 콜백 대신 프라미스 인터페이스를 사용할 수 있습니다. 따라서 다음과 같이 사용하던 대신

~~~js
gantt.ajax.post(url, params, callback);
~~~

POST 요청을 보낼 때 다음과 같은 기록(record)을 사용할 수 있습니다:

~~~js
gantt.ajax.post(url, params).then(function(){…});
~~~

콜백과 프라미스는 동시에 사용할 수 있습니다.

아래 예제는 서버에 여러 개의 요청을 한 번에 보내고 이후 데이터를 새로고침하는 방법을 보여줍니다: 
 
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
- 버전 4.0에서 추가됨
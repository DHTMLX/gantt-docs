---
sidebar_label: ajax
title: ajax config
description: "gantt ajax 모듈"
---

# ajax

### Description

@short: Gantt ajax 모듈

@signature: ajax: any

### Example

~~~jsx
// 응답이 다음과 같이 생겼다고 가정
{status: "ok", data: "value", data2: "value2"}


var xhr = gantt.ajax;

// HTTP GET
xhr.get("server.php").then(function(response) {
    var res = JSON.parse(response.responseText); 
    if (res && res.status == "ok") {
        // 응답이 정상임
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
        // 응답이 정상임
    }
});
~~~

### Details

## API 참조

모든 메서드는 두 가지 방식 중 하나로 매개변수를 받습니다:

1) RequestConfig - 요청 구성을 위한 옵션 객체로, 다음과 같은 구조입니다:

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

각 항목의 의미는:

- url - 서버 URL
- method - 선택 사항, 사용할 HTTP 메서드, 기본값은 "GET"
- data - 선택 사항, POST 또는 PUT 요청 시 전송할 데이터; 문자열 또는 객체 가능
- async - 선택 사항, 비동기 요청 여부, 기본값은 true
- callback - 선택 사항, 응답 수신 후 호출할 함수
- headers - 선택 사항, 요청에 포함할 헤더를 키-값 쌍으로 가진 객체

또는:

2) 세 개의 매개변수 (단, **query()** 메서드는 *RequestConfig* 객체만 받음):

- url - 서버 URL
- data - 선택 사항, POST 요청 시 전송할 데이터
- callback - 선택 사항, 응답 수신 후 호출할 함수

아래는 ajax 모듈 API에서 사용 가능한 메서드 목록입니다:

## 콜백 옵션

모든 메서드는 콜백과 [프로미스](#promises)를 모두 지원하여 응답을 처리할 수 있습니다.

ajax 프로미스는 완료된 XmlHttpRequest 객체로 해결됩니다:

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

레거시 호환을 위해 콜백에서는 결과를 약간 다른 형식으로 받습니다:

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


## query

요청을 보내는 일반 메서드입니다. 파라미터에서 어떤 HTTP 메서드든 지정할 수 있습니다.

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

## get

GET 요청을 보냅니다.

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

## put

PUT 요청을 보냅니다.

~~~js
gantt.ajax.put("server.php", "keep_alive=1&version=std", function(){
    // 여기에 코드 작성
});
// 또는
gantt.ajax.put({
   url: "https://…",
   callback: function() {…},
   headers: { "Content-Type": "application/json" },
   data: {}
});
~~~

## del

DELETE 요청을 보냅니다.

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

## post

POST 요청을 보냅니다.

~~~js
gantt.ajax.post("server.php", "keep_alive=1&version=std", function(){
    // 여기에 코드 작성
});
// 또는
gantt.ajax.post({
      url: "https://…",
      callback: function() {…},
      headers: { "Content-Type": "application/json" },
      data: {}
});
~~~

## POST/PUT 메서드로 데이터 전송하기

문자열 대신 객체를 **post** 및 **put** 메서드의 data로 전달할 수 있습니다. 객체가 전달되면 ajax 모듈이 자동으로 직렬화를 처리합니다. 단순 객체는 폼 데이터(&param=value) 형태로 직렬화되고, 중첩 구조는 JSON.stringify()를 사용해 직렬화됩니다.

예를 들어, 아래 객체는:

~~~js
{
    id: 1,
    text: "My Task",
    users: [1,2,3]
}
~~~

`id=1&text=My%20Task&users=%5B1%2C2%2C3%5D` 와 같은 문자열로 변환됩니다.

### 프로미스 {#promises}

dhtmlxGantt는 IE8 이상을 포함한 프로미스를 지원합니다. 내부적으로 [Bluebird](https://github.com/petkaantonov/bluebird) 프로미스 라이브러리를 사용합니다. 프로미스를 생성하려면 다음 생성자를 사용하세요:

~~~js
var promise = new gantt.Promise(function(resolve, reject) {...});
~~~

Promise 객체는 Gantt 내부에 정의되어 있으며 전역 객체가 아닙니다.

AJAX 모듈은 프로미스를 반환하므로 콜백 대신 프로미스 문법을 사용할 수 있습니다. 예를 들어, 다음과 같이:

~~~js
gantt.ajax.post(url, params, callback);
~~~

다음과 같이 쓸 수 있습니다:

~~~js
gantt.ajax.post(url, params).then(function(){…});
~~~

콜백과 프로미스를 함께 사용하는 것도 가능합니다.

아래 예시는 여러 요청을 동시에 보내고 완료 후 데이터를 다시 불러오는 방법을 보여줍니다:

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
- 버전 4.0에 추가됨

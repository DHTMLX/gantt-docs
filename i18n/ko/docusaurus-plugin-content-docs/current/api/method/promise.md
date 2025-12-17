---
sidebar_label: Promise
title: Promise method
description: "Promise 객체를 생성하는 생성자"
---

# Promise

### Description

@short: Promise 객체를 생성하는 생성자

@signature: Promise: new (executor: (resolve: (value?: any) =\> void, reject: (reason?: any) =\> void) =\> void) =\> Promise\<unknown\>

### Parameters

- `executor` - (required) *function* - 프로미스를 설정하기 위한 콜백 함수

### Returns
- ` promise` - (object) - 생성된 프로미스 객체

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

이 객체는 Gantt 라이브러리에 포함된 [Bluebird](http://bluebirdjs.com/docs/why-bluebird.html)의 Promise 객체 생성자입니다.

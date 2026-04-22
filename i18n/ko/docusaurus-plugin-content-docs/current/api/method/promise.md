---
sidebar_label: Promise
title: Promise 메서드
description: "Promise 객체 생성자"
---

# 프로미스

### Description

@short: 프라미스 객체 생성자

@signature: Promise: new (executor: (resolve: (value?: any) =\> void, reject: (reason?: any) =\> void) =\> void) =\> Promise\<unknown\>

### Parameters

- `executor` - (필수) *함수* - 프라미스 초기화를 위한 콜백

### Returns
- ` promise` - (객체) - 프라미스 객체

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

[Bluebird](http://bluebirdjs.com/docs/why-bluebird.html) 프라미스 객체 생성자, Gantt 라이브러리에 번들로 포함되어 있습니다.
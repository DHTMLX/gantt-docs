---
sidebar_label: bind
title: bind method
description: "지정된 값으로 <i>this</i> 키워드가 설정된 새 함수를 생성합니다."
---

# bind

### Description

@short: 지정된 값으로 <i>this</i> 키워드가 설정된 새 함수를 생성합니다.

@signature: bind: (method: GanttCallback, thisArg: any) =\> GanttCallback

### Parameters

- `method` - (required) *function* - 바인딩할 함수
- `thisArg` - (required) *object* - 바인딩된 함수가 호출될 때 <i>this</i> 컨텍스트로 사용될 값

### Returns
- ` bound_function` - (function) - 호출 시 지정된 <i>this</i> 값을 원래 함수에 사용하는 새 함수

### Example

~~~jsx
gantt.bind(method, thisArg);
~~~

### Details

이 메서드는
[Function.prototype.bind()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)
함수의 IE8 호환 대안으로 제공됩니다.

### Change log
- 버전 4.0에 추가됨

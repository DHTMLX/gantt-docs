---
sidebar_label: bind
title: bind method
description: "지정된 값으로 <i>this</i> 키워드가 설정된 새 함수를 생성합니다."
---

# bind

### Description

@short: 호출될 때 <i>this</i> 키워드가 제공된 값으로 설정되는 새 함수를 생성합니다.

@signature: bind: (method: GanttCallback, thisArg: any) => GanttCallback

### Parameters

- `method` - (필수) *function* - 대상 함수
- `thisArg` - (필수) *object* - 바운드 함수가 호출될 때 대상 함수에 전달될 <i>this</i> 매개변수의 값

### Returns
- ` bound_function` - (function) - 호출될 때 대상 함수로 전달될 <i>this</i> 키워드를 갖는 새로운 함수

### Example

~~~jsx
gantt.bind(method, thisArg);
~~~

### Details

이 메서드는 IE8 호환 대체로 사용되며 [Function.prototype.bind()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind) 함수의 대체로 사용됩니다.

### Change log
- 버전 4.0에 추가됨
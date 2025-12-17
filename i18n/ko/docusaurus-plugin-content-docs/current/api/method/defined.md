---
sidebar_label: defined
title: defined method
description: "주어진 인자가 undefined일 경우 false를 반환하며, 그렇지 않으면 true를 반환합니다."
---

# defined

### Description

@short: 주어진 인자가 undefined일 경우 false를 반환하며, 그렇지 않으면 true를 반환합니다.

@signature: defined: (param: any) =\> boolean

### Parameters

- `param` - (required) *any* - 확인할 객체의 프로퍼티

### Returns
- ` state` - (boolean) - 인자가 undefined이면 false, 값이 있으면 true를 반환합니다.

### Example

~~~jsx
// task 객체에 "custom_property" 프로퍼티가 존재하는지 확인합니다.
if(gantt.defined(task.custom_property)){
  // ..
};
~~~

### Change log
- 4.0 버전에 추가됨

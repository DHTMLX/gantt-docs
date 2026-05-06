---
sidebar_label: defined
title: defined 메서드
description: "제공된 인수가 undefined인 경우 false를 반환하고, 그렇지 않으면 true"
---

# defined

### Description

@short: 제공된 인수가 undefined인 경우 false를 반환하고, 그렇지 않으면 true

@signature: defined: (param: any) =\> boolean

### Parameters

- `param` - (required) *any* - 검사해야 하는 객체의 속성

### Returns
- ` state` - (boolean) - 제공된 인수가 undefined인 경우 false이며, 그렇지 않으면 true

### Example

~~~jsx
// task 객체의 "custom_property" 속성이 정의되어 있는지 확인합니다
if(gantt.defined(task.custom_property)){
  // ..
};
~~~

### Change log
- 버전 4.0에서 추가됨
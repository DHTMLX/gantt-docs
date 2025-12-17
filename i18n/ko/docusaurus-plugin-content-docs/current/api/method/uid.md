---
sidebar_label: uid
title: uid method
description: "고유한 id를 반환합니다"
---

# uid

### Description

@short: 고유한 id를 반환합니다

@signature: uid: () =\> number

### Returns
- ` id` - (number) - 고유한 id

### Example

~~~jsx
var id = gantt.uid();
~~~

### Details

생성된 id는 현재 페이지 세션 내에서 고유합니다. 
페이지 내 로직에서 사용하기에 적합하지만 데이터베이스 식별자로는 사용하지 않는 것이 좋습니다.

### Change log
- 버전 4.0에 추가됨

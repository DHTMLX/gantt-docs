---
sidebar_label: uid
title: uid 메서드
description: "고유한 ID를 반환합니다"
---

# uid

### Description

@short: 고유한 ID를 반환합니다

@signature: uid: () => number

### Returns
- ` id` - (number) - 고유한 ID

### Example

~~~jsx
var id = gantt.uid();
~~~

### Details

생성된 ID는 페이지 단위로는 고유하지만 전역적으로는 고유하지 않습니다.
그래서 페이지 내 로직에서 이 메서드를 사용할 수 있습니다. 데이터베이스(DB) ID로 사용하기에는 충분하지 않습니다.

### Change log
- 버전 4.0에 추가되었습니다.
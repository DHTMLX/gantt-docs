---
sidebar_label: copy
title: copy method
description: "주어진 객체의 깊은 복사본을 생성합니다."
---

# copy

### Description

@short: 주어진 객체의 깊은 복사본을 생성합니다.

@signature: copy: (initialObject: any) =\> any

### Parameters

- `initialObject` - (required) *object* - 복사할 객체

### Returns
- ` clonedObject` - (object) - 주어진 객체의 깊은 복사본

### Example

~~~jsx
var backupTask = gantt.copy(gantt.getTask(id));
~~~

### Change log
- 4.0 버전에 추가됨

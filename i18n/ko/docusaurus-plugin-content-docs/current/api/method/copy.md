--- 
sidebar_label: copy
title: copy method
description: "제공된 객체의 깊은 복사를 생성합니다"
---

# copy

### Description

@short: 제공된 객체의 깊은 복사를 생성합니다

@signature: copy: (initialObject: any) =\> any

### Parameters

- `initialObject` - (required) *object* - 복사되어야 하는 객체

### Returns
- ` clonedObject` - (object) - 제공된 객체의 깊은 복사본

### Example

~~~jsx
var backupTask = gantt.copy(gantt.getTask(id));
~~~ 

### Change log
- 버전 4.0에 추가
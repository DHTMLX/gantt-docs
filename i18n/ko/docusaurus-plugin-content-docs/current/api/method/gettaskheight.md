---
sidebar_label: getTaskHeight
title: getTaskHeight method
description: "returns the visible height of a task"
---

# getTaskHeight

### Description

@short: 태스크의 화면에 보이는 높이를 반환합니다

@signature: getTaskHeight: (id?: string | number) =\> number

### Parameters
- `task` - (optional) *string | number* -  태스크의 ID

### Returns
- ` height` - (number) - 지정된 태스크의 높이 또는 id 매개 변수가 지정되지 않은 경우 태스크들의 높이

### Example

~~~jsx
const height = gantt.getTaskHeight(); // 결과: 30
~~~
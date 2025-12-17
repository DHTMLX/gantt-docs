---
sidebar_label: getTaskByTime
title: getTaskByTime method
description: "지정된 기간 내에 발생하는 작업 목록을 가져옵니다."
---

# getTaskByTime

### Description

@short: 지정된 기간 내에 발생하는 작업 목록을 가져옵니다.

@signature: getTaskByTime: (from?: Date, to?: Date) =\> Array\<Task\>

### Parameters

- `from` - (optional) *Date* - 기간의 시작 날짜
- `to` - (optional) *Date* - 기간의 종료 날짜

### Returns
- ` array` - (Array &lt;Task&gt;) - 작업 객체를 포함하는 배열

### Example

~~~jsx
let tasks = gantt.getTaskByTime(new Date(2013,3,10),new Date(2013,4,10)); 
for (let i=0; i<tasks.length; i++){
       alert(tasks[i].text);
}
// 또는
tasks = gantt.getTaskByTime(); // 모든 작업을 반환합니다.
~~~

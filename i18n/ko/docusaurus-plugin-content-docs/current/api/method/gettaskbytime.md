---
sidebar_label: getTaskByTime
title: getTaskByTime 메서드
description: "지정된 기간 동안 발생하는 작업들의 컬렉션을 반환합니다"
---

# getTaskByTime

### 설명

@short: 지정된 기간 동안 발생하는 작업들의 컬렉션을 반환합니다

@signature: getTaskByTime: (from?: Date, to?: Date) =\> Array\<Task\>

### 매개변수
- `from` - (optional) *Date* -  기간의 시작 날짜
- `to`- (optional) *Date* -  기간의 끝 날짜

### 반환값
- ` array` - (Array &lt;Task&gt;) - 태스크 객체들의 배열

### 예제

~~~jsx
let tasks = gantt.getTaskByTime(new Date(2013,3,10),new Date(2013,4,10)); 
for (let i=0; i<tasks.length; i++){
       alert(tasks[i].text);
}
// 또는
tasks = gantt.getTaskByTime();//모든 작업을 반환합니다
~~~


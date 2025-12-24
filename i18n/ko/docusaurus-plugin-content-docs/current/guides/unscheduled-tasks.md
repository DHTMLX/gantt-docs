---
title: "예정되지 않은 작업"
sidebar_label: "예정되지 않은 작업"
---

# 예정되지 않은 작업


특정 날짜 없이 작업을 Gantt 차트에 추가할 수 있습니다.

![unscheduled_tasks](/img/unscheduled_tasks.png)

이 기능은 작업 설명에서 **unscheduled** 속성을 *true*로 설정하여 사용할 수 있습니다:

~~~js
{"id":1, "text":"Project #1", "type":"project", "progress": 0.6, "open": true},
{"id":2, "text":"Task #1", "unscheduled":false, "start_date":"02-04-2019", "parent":"1"},
{"id":3, "text":"Task #2", "unscheduled":true,"start_date":"","duration":"","parent":"1"}
~~~

이렇게 하면, id가 "3"인 작업은 시작 날짜 없이 Gantt 차트에 표시되며, 빈 행으로 나타납니다.

예정되지 않은 작업의 표시를 활성화하려면, 설정 파라미터 [show_unscheduled](api/config/show_unscheduled.md)를 *false*로 조정하세요:

~~~js
gantt.config.show_unscheduled = false;
~~~

Gantt 차트는 예정되지 않은 작업에 기본 날짜를 할당한다는 점을 유의하세요. 즉, 이러한 작업의 **start_date/end_date** 속성은 비어 있지 않게 됩니다:

~~~js
var task = gantt.getTask(3);
console.log(task.unscheduled);
// true

console.log(task.start_date);
// Tue Jun 25 2019 18:42:50
~~~


[Show Unscheduled Tasks](https://docs.dhtmlx.com/gantt/samples/01_initialization/19_tasks_without_dates.html)


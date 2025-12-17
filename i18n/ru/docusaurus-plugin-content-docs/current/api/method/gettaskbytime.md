---
sidebar_label: getTaskByTime
title: getTaskByTime method
description: "возвращает список задач, которые выполняются в заданном временном интервале"
---

# getTaskByTime

### Description

@short: Возвращает список задач, которые выполняются в заданном временном интервале

@signature: getTaskByTime: (from?: Date, to?: Date) =\> Array\<Task\>

### Parameters

- `from` - (optional) *Date* - начальная дата периода времени
- `to` - (optional) *Date* - конечная дата периода времени

### Returns
- ` array` - (Array &lt;Task&gt;) - массив, содержащий объекты задач

### Example

~~~jsx
let tasks = gantt.getTaskByTime(new Date(2013,3,10),new Date(2013,4,10)); 
for (let i=0; i<tasks.length; i++){
       alert(tasks[i].text);
}
// или
tasks = gantt.getTaskByTime();//возвращает все задачи
~~~

---
sidebar_label: getTaskByTime
title: метод getTaskByTime
description: "возвращает коллекцию задач, происходящих в течение указанного периода"
---

# getTaskByTime

### Description

@short: Возвращает коллекцию задач, происходящих в течение указанного периода

@signature: getTaskByTime: (from?: Date, to?: Date) =\> Array\<Task\>

### Parameters
- `from` - (optional) *Date* -  начальная дата периода
- `to`- (optional) *Date* -  конечная дата периода

### Returns
- ` array` - (Array &lt;Task&gt;) - массив объектов задач

### Example

~~~jsx
let tasks = gantt.getTaskByTime(new Date(2013,3,10),new Date(2013,4,10)); 
for (let i=0; i<tasks.length; i++){
       alert(tasks[i].text);
}
// or
tasks = gantt.getTaskByTime();//returns all tasks
~~~
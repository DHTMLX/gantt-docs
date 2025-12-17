---
sidebar_label: getTaskByTime
title: getTaskByTime method
description: "returns a collection of tasks which occur during the specified period"
---

# getTaskByTime

### Description

@short: Returns a collection of tasks which occur during the specified period

@signature: getTaskByTime: (from?: Date, to?: Date) =\> Array\<Task\>

### Parameters
- `from` - (optional) *Date* -  the start date of the period
- `to`- (optional) *Date* - the end date of the period

### Returns
- ` array` - (Array &lt;Task&gt;) - an array of tasks' objects

### Example

~~~jsx
let tasks = gantt.getTaskByTime(new Date(2013,3,10),new Date(2013,4,10)); 
for (let i=0; i<tasks.length; i++){
       alert(tasks[i].text);
}
// or
tasks = gantt.getTaskByTime();//returns all tasks
~~~

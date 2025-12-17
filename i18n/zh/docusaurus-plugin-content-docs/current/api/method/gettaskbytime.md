---
sidebar_label: getTaskByTime
title: getTaskByTime method
description: "获取在指定时间范围内发生的任务列表"
---

# getTaskByTime

### Description

@short: 获取在指定时间范围内发生的任务列表

@signature: getTaskByTime: (from?: Date, to?: Date) =\> Array\<Task\>

### Parameters

- `from` - (optional) *Date* - 时间段的开始日期
- `to` - (optional) *Date* - 时间段的结束日期

### Returns
- ` array` - (Array &lt;Task&gt;) - 包含任务对象的数组

### Example

~~~jsx
let tasks = gantt.getTaskByTime(new Date(2013,3,10),new Date(2013,4,10)); 
for (let i=0; i<tasks.length; i++){
       alert(tasks[i].text);
}
// 或者
tasks = gantt.getTaskByTime();//返回所有任务
~~~

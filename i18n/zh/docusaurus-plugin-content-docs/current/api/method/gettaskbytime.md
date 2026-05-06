---
sidebar_label: getTaskByTime
title: getTaskByTime 方法
description: "返回在指定时间段内发生的任务集合"
---

# getTaskByTime

### Description

@short: 返回在指定时间段内发生的任务集合

@signature: getTaskByTime: (from?: Date, to?: Date) =\> Array\<Task\>

### Parameters
- `from` - (optional) *Date* -  该时间段的开始日期
- `to`- (optional) *Date* -  该时间段的结束日期

### Returns
- ` array` - (Array &lt;Task&gt;) - 一个 Task 对象的数组

### Example

~~~jsx
let tasks = gantt.getTaskByTime(new Date(2013,3,10),new Date(2013,4,10)); 
for (let i=0; i<tasks.length; i++){
       alert(tasks[i].text);
}
// 或者
tasks = gantt.getTaskByTime();//返回所有任务
~~~
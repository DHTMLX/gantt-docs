---
sidebar_label: getTaskBy
title: getTaskBy method
description: "按指定条件查找任务"
---

# getTaskBy

### Description

@short: 根据指定条件查找任务

@signature: getTaskBy: (propertyName: string | GanttCallback, propertyValue?: string | number | boolean | any[], types?: any) =\> Array\<Task\>

### Parameters

- `propertyName` - (required) *string | function*      -      要匹配的属性名称，或过滤函数
- `propertyValue`	-	(optional) 	*string | number | boolean | array*	-	属性值
- `types`		-	(optional)	*object*			-	返回的任务类型对象

### Returns
- ` tasks` - (Array &lt;Task&gt;) - 任务对象数组

### Example

~~~jsx
// 基础搜索
const userTasks = gantt.getTaskBy("user_id", [5]);

// 使用过滤函数
let userTasks = gantt.getTaskBy(function(task){
   return task.user_id == 5 || !task.user_id;
});

userTasks = gantt.getTaskBy(task => task.user_id == 5);
~~~

### Related samples
- [资源图模板](https://docs.dhtmlx.com/gantt/samples/11_resources/05_resource_usage_templates.html)

### Details

- 此方法可用于按属性值选择任务，例如查找特定用户的任务、查找已完成的任务等。
- `gantt.getTaskBy(propertyName, propertyValue)` 使用宽松相等比较（"double equals", ==）
- `gantt.getTaskBy(propertyName, propertyValue)` 的结果可以被 gantt 缓存，因此该重载可能比 `gantt.getTaskBy((task: object) => boolean)` 更快

默认情况下 **gantt.getTaskBy()** 返回仅匹配条件的 task 和 milestone 项，而 project 项将被省略。

要选择所有类型的记录，请使用第三个参数的以下值：

~~~js
gantt.getTaskBy("progress", 1, { task: true, project: true, milestone: true });
~~~

要仅返回特定类型的项，请在第三个参数中指定类型值：

~~~js
gantt.getTaskBy("progress", 1, { project: true})
~~~

### Related API
- [getSubtaskDuration](api/method/getsubtaskduration.md)
- [getSubtaskDates](api/method/getsubtaskdates.md)

### Change log
- 新增了 **types** 参数，起自 v8.0
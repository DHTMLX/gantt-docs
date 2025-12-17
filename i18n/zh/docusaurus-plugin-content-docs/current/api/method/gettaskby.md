---
sidebar_label: getTaskBy
title: getTaskBy method
description: "根据给定的条件查找任务"
---

# getTaskBy

### Description

@short: 根据给定的条件查找任务

@signature: getTaskBy: (propertyName: string | GanttCallback, propertyValue?: string | number | boolean | any[], types?: any) =\> Array\<Task\>

### Parameters

- `propertyName` - (required) *string | function* -            要匹配的属性名或过滤函数
- `propertyValue` - (optional) *string | number | boolean | array* -        属性对应的匹配值
- `types` - (optional) *object* - 指定要包含在结果中的任务类型的对象

### Returns
- ` tasks` - (Array &lt;Task&gt;) - 符合条件的任务对象数组

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
- [Templates of the Resource diagram](https://docs.dhtmlx.com/gantt/samples/11_resources/05_resource_usage_templates.html)

### Details

- 此方法允许你根据属性值选择任务，例如查找分配给特定用户的任务或已完成的任务。
- 调用 `gantt.getTaskBy(propertyName, propertyValue)` 时，使用的是宽松相等比较（"双等号"，==）。
- `gantt.getTaskBy(propertyName, propertyValue)` 的结果可能会被 gantt 缓存，因此这种形式可能比使用过滤函数版本 `gantt.getTaskBy((task: object) => boolean)` 更快。

默认情况下，**gantt.getTaskBy()** 只返回匹配条件的任务和里程碑，排除项目项。

如果要包含所有类型的记录，可以使用第三个参数:

~~~js
gantt.getTaskBy("progress", 1, { task: true, project: true, milestone: true });
~~~

如果只想获取特定类型的项目，可以在第三个参数中指定:

~~~js
gantt.getTaskBy("progress", 1, { project: true})
~~~

### Related API
- [getSubtaskDuration](api/method/getsubtaskduration.md)
- [getSubtaskDates](api/method/getsubtaskdates.md)

### Change log
- **types** 参数在 v8.0 中引入


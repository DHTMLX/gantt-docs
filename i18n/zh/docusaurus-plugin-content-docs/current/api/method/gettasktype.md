---
sidebar_label: getTaskType
title: getTaskType method
description: "返回任务的类型"
---

# getTaskType

### Description

@short: 返回任务的类型

@signature: getTaskType: (task: Task) =\> string

### Parameters

- `task` - (required) *Task* - 任务对象

### Returns
- ` type` - (string) - 任务的类型

### Example

~~~jsx
var type = gantt.getTaskType(gantt.getTask(12));
~~~

### Details

- 当 **task.type** 属性被设置且不为空时，返回其值。
- 如果 **task.type** 未定义或为空，则方法返回 **gantt.config.types.task**。

由于 **task.type** 属性是可选的，在代码中检查任务类型时，需要处理该属性可能为空的情况，例如:

~~~js
// 不推荐：
if (task.type === gantt.config.types.task){
    // 针对任务项的代码
}
~~~

- 没有 **type** 属性的任务不会满足此条件，这不正确，因为这些任务默认被视为 *task* 类型。

更好的做法是包含对空值的检查:

~~~js
// 推荐：
if (!task.type || task.type === gantt.config.types.task){
    // 针对任务项的代码
}
~~~

或者，更好的是，使用 **getTaskType** 方法:

~~~js
// 更佳：
if (gantt.getTaskType(task) === gantt.config.types.task){
    // 针对任务项的代码
}
~~~

这样可以确保代码对显式设置了类型的任务以及 Gantt 内部默认分配类型的任务都能正确处理。

你还可以使用以下方法作为获取任务类型的可靠方式，并编写覆盖所有项目类型的条件，避免类型检测错误的问题:

~~~js
switch (gantt.getTaskType(task)){
    case gantt.config.task:
        break;
    case gantt.config.project:
        break;
    case gantt.config.milestone:
        break;
}
~~~

### Related Guides
- [任务类型](guides/task-types.md)

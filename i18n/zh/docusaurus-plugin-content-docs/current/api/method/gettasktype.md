---
sidebar_label: getTaskType
title: getTaskType 方法
description: "返回任务的类型"
---

# getTaskType

### Description

@short: 返回任务的类型

@signature: getTaskType: (task: Task) => string

### Parameters

- `task` - (必填) *Task* - 该任务对象

### Returns
- `type` - (string) - 该任务的类型

### Example

~~~jsx
var type = gantt.getTaskType(gantt.getTask(12));
~~~

### Details

- 如果 **task.type** 属性已定义且不为空，则将返回该属性的值。 
- 否则，将返回 **gantt.config.types.task** 的值。

由于 **task.type** 属性是可选的，在代码中检查任务类型时，需要处理该属性可能为空的情况，例如:

~~~js
// 不推荐：
if (task.type === gantt.config.types.task){
    // 针对任务项的代码
}
~~~

- 没有 **type** 属性的项将不满足此条件。这将不正确，因为此类项默认为 *task* 类型。

相反，您可以对空值添加条件：

~~~js
// 推荐：
if (!task.type || task.type === gantt.config.types.task){
    // 针对任务项的代码
}
~~~

或者使用 **getTaskType** 方法： 

~~~js
// 更佳：
if (gantt.getTaskType(task) === gantt.config.types.task){
    // 针对任务项的代码
}
~~~

该代码将对显式指定类型的所有项，以及对由 Gantt 内部逻辑分配默认类型的项都有效。

以下方法可用作获取任务类型的安全方式，以便为所有类型的项编写相同的条件，并避免因错误的类型检测而引发潜在错误：

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
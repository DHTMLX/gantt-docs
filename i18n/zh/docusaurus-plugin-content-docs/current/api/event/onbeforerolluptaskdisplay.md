---
sidebar_label: onBeforeRollupTaskDisplay
title: onBeforeRollupTaskDisplay event
description: "在汇总任务显示于其父项目之前触发"
---

# onBeforeRollupTaskDisplay

### Description

@short: 在汇总任务显示于其父项目之前触发

@signature: onBeforeRollupTaskDisplay: (taskId: number | string, task: Task, parentId: number | string) =\> boolean;

### Parameters

- `taskId` - (required) *number|string* - 汇总任务的ID
- `task` - (required) *Task* - 汇总任务对象本身
- `parentId` - (required) *number|string* - 父任务（项目）的ID

### Returns
- ` result` - (boolean) - 指示汇总任务是否将在其父项目上可见（<b>true</b>）或隐藏（<b>false</b>）

### Example

~~~jsx
gantt.attachEvent("onBeforeRollupTaskDisplay", function(taskId, task, parentId){
    // 在这里编写自定义逻辑
    return false;
});
~~~

### Related Guides
- [Milestones](guides/milestones.md)

### Change log
- 在v8.0中添加

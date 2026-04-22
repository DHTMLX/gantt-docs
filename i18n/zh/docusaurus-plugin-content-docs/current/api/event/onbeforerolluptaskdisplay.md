---
sidebar_label: onBeforeRollupTaskDisplay
title: onBeforeRollupTaskDisplay 事件
description: "在父项目中显示 rollup 任务之前触发"
---

# onBeforeRollupTaskDisplay

### Description

@short: 在父项目中显示 rollup 任务之前触发

@signature: onBeforeRollupTaskDisplay: (taskId: number | string, task: Task, parentId: number | string) =\> boolean;

### Parameters

- `taskId` - (required) *number | string* - rollup 任务 id
- `task` - (required) *Task* - rollup 任务对象
- `parentId` - (required) *number | string* - 父级（项目）任务的 id

### Returns
- ` result` - (boolean) - 定义滚动任务是否会在父项目中显示（<b>true</b>）还是不显示（<b>false</b>）

### Example

~~~jsx
gantt.attachEvent("onBeforeRollupTaskDisplay", function(taskId, task, parentId){
    // 在这里插入您的自定义逻辑 
    return false;
});
~~~

### Related Guides
- [Milestones](guides/milestones.md#rolluptasksandmilestones)

### Change log
- 新增于 v8.0
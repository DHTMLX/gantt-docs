---
sidebar_label: onBeforeRollupTaskDisplay
title: onBeforeRollupTaskDisplay event
description: "срабатывает непосредственно перед отображением rollup задачи на её родительском проекте"
---

# onBeforeRollupTaskDisplay

### Description

@short: Срабатывает непосредственно перед отображением rollup задачи на её родительском проекте

@signature: onBeforeRollupTaskDisplay: (taskId: number | string, task: Task, parentId: number | string) =\> boolean;

### Parameters

- `taskId` - (required) *number|string* - ID rollup задачи
- `task` - (required) *Task* - объект rollup задачи
- `parentId` - (required) *number|string* - ID родительской (проектной) задачи

### Returns
- ` result` - (boolean) - указывает, будет ли rollup задача видима на родительском проекте (<b>true</b>) или скрыта (<b>false</b>)

### Example

~~~jsx
gantt.attachEvent("onBeforeRollupTaskDisplay", function(taskId, task, parentId){
    // здесь можно добавить свою логику
    return false;
});
~~~

### Related Guides
- [Вехи](guides/milestones.md#rolluptasksandmilestones)

### Change log
- добавлено в версии v8.0

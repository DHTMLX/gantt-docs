---
sidebar_label: onBeforeRollupTaskDisplay
title: onBeforeRollupTaskDisplay event
description: "срабатывает перед тем, как роллап-задача будет отображена на её родительском проекте"
---

# onBeforeRollupTaskDisplay

### Description

@short: Перед отображением роллап-задачи на её родительском проекте

@signature: onBeforeRollupTaskDisplay: (taskId: number | string, task: Task, parentId: number | string) =\> boolean;

### Parameters

- `taskId` - (required) *number | string* - идентификатор роллап-задачи
- `task` - (required) *Task* - объект роллап-задачи
- `parentId` - (required) *number | string* - идентификатор родительской (проектной) задачи

### Returns
- ` result` - (boolean) - определяет, будет ли отображаться роллап-задача на её родительском проекте (<b>true</b>) или нет (<b>false</b>)

### Example

~~~jsx
gantt.attachEvent("onBeforeRollupTaskDisplay", function(taskId, task, parentId){
    // любая пользовательская логика здесь
    return false;
});
~~~

### Related Guides
- [Вехи](guides/milestones.md#rolluptasksandmilestones)

### Change log
- добавлено в версии 8.0
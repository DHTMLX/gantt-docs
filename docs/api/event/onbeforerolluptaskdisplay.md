---
sidebar_label: onBeforeRollupTaskDisplay
title: onBeforeRollupTaskDisplay event
description: "fires before the rollup task is displayed on its parent project"
---

# onBeforeRollupTaskDisplay

### Description

@short: Fires before the rollup task is displayed on its parent project

@signature: onBeforeRollupTaskDisplay: (taskId: number | string, task: Task, parentId: number | string) =\> boolean;

### Parameters

- `taskId` - (required) *number | string* - the rollup task id
- `task` - (required) *Task* - the rollup task object
- `parentId` - (required) *number | string* - the id of the parent (project) task

### Returns
- ` result` - (boolean) - defines whether the rollup task will be displayed on its parent project (<b>true</b>) or not (<b>false</b>)

### Example

~~~jsx
gantt.attachEvent("onBeforeRollupTaskDisplay", function(taskId, task, parentId){
    // any custom logic here
    return false;
});
~~~

### Related Guides
- [Milestones](guides/milestones.md#rolluptasksandmilestones)

### Change log
- added in v8.0

---
sidebar_label: getTaskType
title: getTaskType method
description: "returns the type of a task"
---

# getTaskType

### Description

@short: Returns the type of a task

@signature: getTaskType: (task: Task) =\> string

### Parameters

- `task` - (required) *Task* - the task object

### Returns
- ` type` - (string) - the type of the task

### Example

~~~jsx
var type = gantt.getTaskType(gantt.getTask(12));
~~~

### Details

- If **task.type** property is defined and not empty, the value of this property will be returned. 
- Otherwise, the value of **gantt.config.types.task** will be returned instead.

Since the **task.type** property is optional, you have to take into account that it may be empty when you check the type of the task in code, e.g.

~~~js
// BAD:
if (task.type === gantt.config.types.task){
    // code specific for task items
}
~~~

- Items that don't have the **type** property won't meet this condition. This would be incorrect, because such items have the *task* type by default.

Instead, you can either add a condition for empty values:

~~~js
// GOOD:
if (!task.type || task.type === gantt.config.types.task){
    // code specific for task items
}
~~~

Or use the **getTaskType** method: 

~~~js
// EVEN BETTER:
if (gantt.getTaskType(task) === gantt.config.types.task){
    // code specific for task items
}
~~~

The code will work for all items that have a type specified explicitly, as well as for items that have a default type assigned by the Gantt internal logic.

The following method can be used as a safe way for getting task types, in order to write the same conditions for all types of items, and avoid potential bugs with incorrect type detection:

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
- [Task Types](guides/task-types.md)

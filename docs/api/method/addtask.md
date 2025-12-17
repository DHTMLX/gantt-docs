---
sidebar_label: addTask
title: addTask method
description: "adds a new task"
---

# addTask

### Description

@short: Adds a new task

@signature: addTask: (task: NewTask, parent?: string | number, index?: number) =\> string | number

### Parameters

- `task` - (required) *NewTask* - the task object
- `parent` - (optional) *string | number* - the parent's id
- `task` - (optional) *number* - the position the task will be added into (0 or greater)

### Returns
- ` id` - (string, number) - the task's id

### Example

~~~jsx
const taskId = gantt.addTask({
    id: 10,
    text: "Task #5",
    start_date: "02-09-2025",
    duration: 28
}, "project_2", 1);
~~~

### Details

If you set the *index* parameter with the value from 0 and greater, a task will be added to the specified position in the branch. 
Otherwise, the task will be added to the end of the tasks' branch.

The method invokes the [onBeforeTaskAdd](api/event/onbeforetaskadd.md) and [onAfterTaskAdd](api/event/onaftertaskadd.md) events.

Note, if you don't want to save task in case, for example, the user clicks the "Cancel" button in the lightbox, 
use the [createTask](api/method/createtask.md) method and the [onTaskCreated](api/event/ontaskcreated.md) event that this method invokes.


## Preventing from adding tasks to certain levels
A quite easy way to prevent users from adding sub-tasks to specific tasks is to hide the 'Add' button through CSS.


First, assign a CSS class for each task row using the [grid_row_class](api/template/grid_row_class.md) template:
~~~js
gantt.templates.grid_row_class = (start, end, task) => {
    if (task.$level > 1) {
        return "nested_task";
    }
    return "";
};
~~~

Then, hide the 'Add' button for such rows:

~~~css
.nested_task .gantt_add{
    display: none !important;
}
~~~

:::note
sample [Predefined Project Structure](https://docs.dhtmlx.com/gantt/samples/08_api/11_project_structure.html)
:::

### Related API
- [createTask](api/method/createtask.md)
- [addLink](api/method/addlink.md)
- [onAfterTaskAdd](api/event/onaftertaskadd.md)
- [onBeforeTaskAdd](api/event/onbeforetaskadd.md)

### Related Guides
- [Basic Operations with Tasks](guides/crud-task.md)


---
sidebar_label: createTask
title: createTask method
description: "adds a new task and opens the lightbox to confirm"
---

# createTask

### Description

@short: Adds a new task and opens the lightbox to confirm

@signature: createTask: (task?: NewTask, parent?: string | number, index?: number) =\> string | number

### Parameters

- `task`    -	 (optional) *NewTask*	- optional, the task object
- `parent`	-	(optional) *string | number*	- optional, the parent's id
- `index`	-	(optional) *number*	-	optional, the position the task will be added into (0 or greater)

### Returns
- ` id` - (string, number) - the task's id

### Example

~~~jsx
var taskId = gantt.createTask({
    id:10,
    text:"Task #5",
    start_date:"02-09-2013",
    duration:28
}, "project_2", 2);
~~~

### Details

If you set the *index* parameter with the value from 0 and greater, a task will be added to the specified position in the branch. 
Otherwise, the task will be added to the end of the tasks' branch.

The method invokes the [onTaskCreated](api/event/ontaskcreated.md) event. Note, the event fires before the new task is added to the dataset that allows you 
to cancel saving of this task at all,for example, if the user clicks 'Cancel' button in the lightbox.


The final order of events that fire when you create a task with the createTask() method:

1. [onTaskCreated](api/event/ontaskcreated.md)
2. [onBeforeLightbox](api/event/onbeforelightbox.md)
3. [onLightbox](api/event/onlightbox.md)
4. [onAfterLightbox](api/event/onafterlightbox.md)
5. [onAfterTaskAdd](api/event/onaftertaskadd.md)
6. [onBeforeTaskAdd](api/event/onbeforetaskadd.md)

### Related API
- [onTaskCreated](api/event/ontaskcreated.md)
- [addTask](api/method/addtask.md)

### Related Guides
- [Basic Operations with Tasks](guides/crud-task.md)


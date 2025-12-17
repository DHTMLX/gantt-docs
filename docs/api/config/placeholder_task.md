---
sidebar_label: placeholder_task
title: placeholder_task config
description: "adds an empty row into the end of the list of tasks to simplify tasks editing via keyboard"
---

# placeholder_task

### Description

@short: Adds an empty row into the end of the list of tasks to simplify tasks editing via keyboard

@signature: placeholder_task: any

### Example

~~~jsx
gantt.config.placeholder_task = true;

// or
gantt.config.placeholder_task = {
   // moves focus to the placeholder task after adding a new task
   focusOnCreate: true
};
~~~

**Default value:** false

### Related samples
- [Inline editing - keyboard navigation mode](https://docs.dhtmlx.com/gantt/samples/07_grid/12_inline_edit_key_nav.html)

### Details

- A placeholder task will be automatically added to the end of the task list.
- Once it's modified from the UI and received the **gantt.updateTask()** call, a new task will be added to the end of the list.
- A placeholder can be detected by its type value:

~~~js
if(task.type == gantt.config.types.placeholder){
   // do something
}
~~~


- Gantt will fire the [onTaskCreated](api/event/ontaskcreated.md) and [onAfterTaskAdd](api/event/onaftertaskadd.md) events when placeholder is inserted.
- [gantt.dataProcessor](guides/server-side.md) will fire the **onBeforeUpdate** event for the placeholder item, but won't produce any backend requests.

### Related Guides
- [Inline Editing in Grid](guides/inline-editing.md#inline-editing-modes)


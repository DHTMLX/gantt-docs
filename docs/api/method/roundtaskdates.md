---
sidebar_label: roundTaskDates
title: roundTaskDates method
description: "rounds the start and end task's dates to the nearest dates in the time scale"
---

# roundTaskDates

### Description

@short: Rounds the start and end task's dates to the nearest dates in the time scale

@signature: roundTaskDates: (task: Task) =\> void

### Parameters

- `task` - (required) *Task* - the task object

### Example

~~~jsx
//dragging childs together with the parent
gantt.attachEvent("onTaskDrag", function(id, mode, task, original){
    var modes = gantt.config.drag_mode;
    if(mode == modes.move){
        var diff = task.start_date - original.start_date;

        gantt.eachTask(function(child){
            child.start_date = new Date(+child.start_date + diff);
            child.end_date = new Date(+child.end_date + diff);
            gantt.refreshTask(child.id, true);
        },id );
    }
    return true;
});

//rounds the positions of child items to the scale
gantt.attachEvent("onAfterTaskDrag", function(id, mode, e){
     var modes = gantt.config.drag_mode;
     if(mode == modes.move ){
         gantt.eachTask(function(child){
            gantt.roundTaskDates(child);  /*!*/
            gantt.refreshTask(child.id, true);
         },id );
     }
});
~~~

### Details

- The method takes into consideration the working time specified.
- The method may change the duration of the task.
- If the method is called from the onbeforedragend the dates will be rounded considering the type of the drag-&-drop operation (e.g. 
the "move" operation will change the task's dates without affecting the duration, the 'resize' operation will change the task's duration and one of the task's dates: start or end depending on the resize direction)

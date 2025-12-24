---
title: "Basic Operations with Tasks"
sidebar_label: "Basic Operations with Tasks"
---

# Basic Operations with Tasks


In this chapter you'll learn how to do basic operations with tasks: to create or delete a task, to dynamically update a task's property. 


## Adding a new task


To add a new task to the Gantt chart, use the [addTask](api/method/addtask.md) method:

~~~js
var taskId = gantt.addTask({
    id:10,
    text:"Project #1",
    start_date:"02-09-2020",
    duration:28
});
~~~

### Preventing from adding tasks to certain levels

A quite easy way to prevent users from adding sub-tasks to a task of a certain level (or based on some other condition) is to hide the 'Add' button through CSS.

You can assign a CSS class for each task row using the [grid_row_class](api/template/grid_row_class.md) template:

~~~js
gantt.templates.grid_row_class = function( start, end, task ){
    if ( task.$level > 1 ){
        return "nested_task"
    }
    return "";
};
~~~

and hide the 'Add' button for such rows:

~~~css
.nested_task .gantt_add{
    display: none !important;
}
~~~

[Predefined Project Structure](https://docs.dhtmlx.com/gantt/samples/08_api/11_project_structure.html)


## Updating a task's property


To dynamically update a property of a task object, use the [updateTask](api/method/updatetask.md) method:

~~~js
var task = gantt.getTask(10);//->{id:10,text:"Task #10",start_date:"02-09-2020",...}
 
task.text = "Task #10_1";/*!*/ 
gantt.updateTask(10); /*!*/
~~~

If Data Processor is enabled, the [updateTask()](api/method/updatetask.md) method will cause the changes to be sent to the server. 

After the task is updated, the [onAfterTaskUpdate](api/event/onaftertaskupdate.md) event fires. It can cause other changes, for example, when the auto scheduling is enabled, Gantt will auto-schedule the task and all its successors. 

If you need just to re-render the changes, call the [refreshTask()](api/method/refreshtask.md) method instead of [updateTask()](api/method/updatetask.md).

~~~js
var task = gantt.getTask(10);//->{id:10,text:"Task #10",start_date:"02-09-2020",...}
 
task.text = "Task #10_1"; 
gantt.refreshTask(10);
~~~

## Redrawing tasks


To re-draw all tasks in the Gantt chart, use the [refreshData](api/method/refreshdata.md) method:

~~~js
var task = gantt.getTask(10);//->{id:10,text:"Task #10",start_date:"02-09-2020",...}
var task2 = gantt.getTask(11);//->{id:11,text:"Task #11",start_date:"05-09-2020",...}
 
task.text = "Task #10_1"; /*!*/ 
task2.text = "Task #11_1";/*!*/ 
gantt.refreshData(); /*!*/ 
~~~

## Deleting tasks


To delete a task, use the [deleteTask](api/method/deletetask.md) method:

~~~js
gantt.deleteTask(taskId);
~~~

## Cascade deleting of nested tasks


There is a [cascade_delete](api/config/cascade_delete.md) config that regulates the process of deleting tasks from Gantt. By default, it is set to *true*,
which means that when you delete a task, Gantt sends a request to a server for each nested task and link of the deleted task.

If you don't need to send multiple requests to the server, you can simply disable the [cascade_delete](api/config/cascade_delete.md) config:

~~~js
gantt.config.cascade_delete = false;
~~~

In that case Gantt will send only one request to the server - for deleting just the parent task, while its nested tasks and links will be deleted by the server. 

The [cascade_delete](api/config/cascade_delete.md) option affects the way of implemeting a backend. Read more in the 
[related section of the Server-side Integration article](guides/server-side.md#cascade-deletion).

## Removing all tasks from the Gantt chart


To clear the Gantt chart from tasks, call the [clearAll](api/method/clearall.md) method:

~~~js
gantt.clearAll();
~~~


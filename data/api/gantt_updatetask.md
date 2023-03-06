updateTask
=============
@short:updates the specified task
	

@params:
- id	string|number	the task id
* newState      Task      optional, the new values of the task

@example: 
var taskId = gantt.addTask({
	id:10,
    text:"Task #10",
    start_date:"02-04-2013",
    duration:8,
    parent:1
});

gantt.getTask(taskId).text = "Task #13"; //changes task's data
gantt.updateTask(taskId); //renders the updated task


@related:
	desktop/server_side.md#updatingdataontheserver
@relatedapi:
	api/gantt_updatelink.md
@template:	api_method
@descr:

{{note The method invokes the api/gantt_onaftertaskupdate_event.md event.}}

You can also replace the existing task with new values via setting a new task object as the second parameter of the **updateTask** method: 

~~~js
var task = {
    id: 2, text: 'New task text', 
    start_date: new Date(2025,03,02), 
    end_date: new Date(2025,03,04), 
    $source: [1], 
    $target: [2]
}
gantt.updateTask(2,task);
~~~

{{editor https://snippet.dhtmlx.com/5/a88813dbd		Updating task}}
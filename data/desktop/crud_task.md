Adding/Updating/Deleting Tasks
========================================
In this chapter you'll learn how to do basic operations with tasks: to create or delete a task, 
to dynamically update a task's property. 


Adding a new task
----------------------------
To add a new task to the Gantt chart, use the api/gantt_addtask.md method:

~~~js
var taskId = gantt.addTask({
    id:10,
    text:"Project #1",
    start_date:"02-09-2013",
    duration:28
});
~~~

###Preventing from adding tasks to certain levels
A quite easy way to prevent users from adding sub-tasks to a task of a certain level (or based on some other condition) is to hide the 'Add'  button through CSS.

You can assign a CSS class for each task row using the api/gantt_grid_row_class_template.md template:

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
{{sample
	08_api/11_project_structure.html
}}

Adding unscheduled tasks
-------------------------

There's a possibility to add tasks without dates into the Gantt chart. It can be implemented by setting the *unscheduled* parameter with the value *true* in the task's description:

~~~js
{"id":11, "text":"Project #1", type:gantt.config.types.project, "progress": 0.6, 
	"open": true},
   {"id":14, "text":"Task #1", unscheduled:false, "start_date":"02-04-2013", 
   		"duration":"6", "parent":"11"},
   {"id":17, "text":"Task #2", unscheduled:true,  "start_date":"", 			 
   		"duration":"", "parent":"11"}
~~~

Thus, the task with the id "17" will be added to the gantt without the start date and displayed as an empty row.

In order to display unscheduled tasks, use the config parameter api/gantt_show_unscheduled_config.md set to *true*:

~~~js
gantt.config.show_unscheduled = true;
~~~

{{sample
01_initialization/19_tasks_without_dates.html
}}

Updating a task's property
------------------------------
To dynamically update a property of a task object, use the api/gantt_updatetask.md method:

~~~js
var task = gantt.getTask(10);//->{id:10,text:"Task #10",start_date:"02-09-2013",...}
 
task.text = "Task #10_1";/*!*/ 
gantt.updateTask(10); /*!*/
gantt.refreshData(); /*!*/
~~~

Redrawing tasks
----------------------
To re-draw all tasks in the Gantt chart, use the  the api/gantt_refreshdata.md method:

~~~js
var task  =gantt.getTask(10);//->{id:10,text:"Task #10",start_date:"02-09-2013",...}
var task2 =gantt.getTask(11);//->{id:11,text:"Task #11",start_date:"05-09-2013",...}
 
task.text = "Task #10_1"; /*!*/ 
task2.text= "Task #11_1";/*!*/ 
gantt.refreshData(); /*!*/ 
~~~

Deleting a task
-------------------------------
To delete a task, use the api/gantt_deletetask.md method:

~~~js
gantt.deleteTask(taskId);
~~~

Removing all tasks from the Gantt chart
-------------------------------------------
To clear the Gantt chart from tasks, call the api/gantt_clearall.md method:


~~~js
gantt.clearAll();
~~~
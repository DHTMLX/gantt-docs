Multi-Task Selection 
===========================================
Starting from version 3.2, the library provides the **ext/dhtmlxgantt_multiselect.js** extension that allows you to select multiple tasks at once.

<div style="text-align:center;"><img src="desktop/multiselection.png"/></div>



Activating multi-task selection
--------------------------------------
To activate multi-task selection for tasks, include the multiselect extension file on the page:

~~~js
<!DOCTYPE html>
<html>
<head>
   <script src="codebase/dhtmlxgantt.js"></script>   
   <link href="codebase/dhtmlxgantt.css" rel="stylesheet">   
   <script src="codebase/ext/dhtmlxgantt_multiselect.js"></script>  /*!*/
</head>
<body>
    //your code will be here
</body>
</html>
~~~
{{sample
02_extensions/09_multiselection.html
}}

Once the extension is activated, multi-task selection will be automatically enabled.

<br>
To disable extension, use the api/gantt_multiselect_config.md option:
{{snippet 
Disabling multi-task selection
}}
~~~js
gantt.config.multiselect = false; 
~~~


One-time update for multiple tasks
--------------------------------
To update multiple tasks/links at once, use the api/gantt_batchupdate.md method:

~~~js
gantt.batchUpdate(function () {
    var tasks = gantt.getTasksByTime();
    for(var i = 0; i < tasks.length; i++){
        var task = tasks(i);
        task.start_date = gantt.date.add(task.start_date, 1, "day");
        task.end_date = gantt.calculateEndDate(task.start_date, task.duration);
        gantt.updateTask(task.id);
    }
});
~~~
The method allows you to update multiple tasks/links at once with a single re-rendering instead of making multiple updates with multiple re-renderings.

{{sample
02_extensions/09_multiselection.html
}}

Iterator
------------------------
To iterate over all selected tasks in the Gantt chart, use the api/gantt_eachselectedtask.md method:

~~~js
gantt.batchUpdate(function () {
    gantt.eachSelectedTask(function(task_id){
        if(gantt.isTaskExists(task_id))
            gantt.deleteTask(task_id);
    });
});
~~~

{{sample
02_extensions/09_multiselection.html
}}

Simultaneous indentation/outdentation
-------------------------------------
Multi-task selection allows you to apply different operations to multiple tasks at once. For example, you can add an indentation/outdentation thereby  transforming tasks to sub-tasks and vice versa.

{{sample
02_extensions/09_multiselection.html
}}


Checking if a task is selected
-------------------------------------
To check if a task is currenly selected, use the api/gantt_isselectedtask.md method:

~~~js
gantt.templates.task_class = gantt.templates.grid_row_class = gantt.templates.task_row_class = function (start, end, task) {
    if (gantt.isSelectedTask(task.id))
        return "gantt_selected";
};
~~~
{{sample
02_extensions/09_multiselection.html
}}

To toggle between selected and unselected states, use the api/gantt_toggletaskselection.md method:

~~~js
gantt.toggleTaskSelection("t_1"); //"t_1" is the task's id
gantt.render();
~~~

Getting all selected tasks
-----------------------------------
To get all tasks that are currently selected, use the  api/gantt_getselectedtasks.md method:

~~~js
gantt.getSelectedTasks();
~~~

To get the last selected task, use the  api/gantt_getlastselectedtask.md method:

~~~js
gantt.getLastSelectedTask();
~~~

Limiting multi-task selection within one level
-----------------------------------------------
To deny selecting tasks from different levels, use the api/gantt_multiselect_one_level_config.md option:

~~~js
gantt.config.multiselect_one_level = true; 
gantt.init('gantt_here');
~~~

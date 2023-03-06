correctTaskWorkTime
=============

@short:recalculates the task duration in the work time
	

@params:
- task	Task	the task's object


@example:
gantt.attachEvent("onTaskDrag", function(id, mode, task, original){
    gantt.correctTaskWorkTime(task);
});
            
@template:	api_method
@descr:
The method requires the following configuration options to be specified:

~~~js
gantt.config.work_time = true;
gantt.config.correct_work_time = true;
~~~

@related:
desktop/working_time.md


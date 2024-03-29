batchUpdate
=============
@short:updates multiple tasks/links at once

@params:
- callback  function    the callback function
* noRedraw  boolean     optional, specifies if Gantt should repaint the chart after the callback function; <i>true</i> - not to repaint and <i>false</i> (by default) - to repaint

@example:
gantt.batchUpdate(function () {
    var tasks = gantt.getTaskByTime();
    for(var i = 0; i < tasks.length; i++){
        var task = tasks[i];
        task.start_date = gantt.date.add(task.start_date, 1, "day");
        task.end_date = gantt.calculateEndDate(task.start_date, task.duration);
        gantt.updateTask(task.id);
    }
});


@template:	api_method
@relatedsample:02_extensions/09_multiselection.html
@descr:
You can use this method to update multiple tasks/links at once with a single re-rendering  instead of making multiple updates with multiple re-renderings.


@relatedapi:
	api/gantt_eachselectedtask.md
    api/gantt_getlastselectedtask.md
    api/gantt_getselectedtasks.md
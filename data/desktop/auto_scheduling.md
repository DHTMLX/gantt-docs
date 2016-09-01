Auto Scheduling
===================

Starting from version 3.3, the library provides the **ext/dhtmlxgantt_auto_scheduling.js** extension that gives
Gantt the ability to schedule tasks automatically depending on relations between them.

<img src="desktop/auto_scheduling.png">

For example, imagine that you have two tasks connected by a dependency link and the second task starts when the first one ends, and
you need to change the schedule of the first task by moving it to a new date.

Auto scheduling makes the start date of the second task update according to the end date of the first task each time when it changes.
This feature allows you to generate and maintain project schedule by specifying relations between tasks with no need to set dates of each task manually.

To use the auto scheduling functionality, you should include the **dhtmlxgantt_auto_scheduling.js** extension on the page:

~~~html
<script src="../codebase/ext/dhtmlxgantt_auto_scheduling.js"></script>
~~~

And set the **auto_scheduling** property to true:

~~~js
gantt.config.auto_scheduling = true;
~~~

What is more, when auto scheduling is enabled, individual tasks still can be scheduled manually. They are independent of relations between tasks.
To disable auto scheduling for a particular task and make it manually scheduled, set the **auto_scheduling** property of the task object to *false*:

~~~js
var task = gantt.getTask(id);
task.auto_scheduling = false;
~~~


{{sample
	02_extensions/12_auto_scheduling.html
}}

##API overview

The list of available methods and properties:

- api/gantt_auto_scheduling_config.md
- api/gantt_auto_scheduling_strict_config.md
- api/gantt_auto_scheduling_initial_config.md
- api/gantt_autoschedule.md
- api/gantt_isunscheduledtask.md

To enable auto scheduling in the Gantt chart, set the api/gantt_auto_scheduling_config.md property to true:

~~~js
gantt.config.auto_scheduling = true;
~~~

By default, tasks are rescheduled only when a new date violates the constraint. 
In order to always reschedule tasks to the earliest possible date, use the property api/gantt_auto_scheduling_strict_config.md:

~~~js
gantt.config.auto_scheduling_strict = true;
~~~

The api/gantt_auto_scheduling_initial_config.md property specifies whether gantt will do autoscheduling on data loading. It's set to true by default:

~~~js
gantt.config.auto_scheduling_initial = true;
~~~

To recalculate the schedule of the whole project, use the api/gantt_autoschedule.md method:

~~~js
gantt.autoSchedule();
~~~

If you need to recalculate the schedule starting from a particular task, pass the id of the task as an argument to the api/gantt_autoschedule.md method:

~~~js
gantt.autoSchedule(taskId);
~~~

In case you need to check whether the task is unscheduled, use the api/gantt_isunscheduledtask.md method with the task object as an argument:

~~~js
var isUnscheduled = gantt.isUnscheduledTask(task);
~~~

To find all circular references in the chart, make use of the api/gantt_findcycles.md method:

~~~js
gantt.findCycles();
~~~

If you need to check whether the link is circular, you can apply the api/gantt_iscircularlink.md method:

~~~js
var isCircular = gantt.isCircularLink(link);
~~~


##The list of events

The list of available events is given below:

- api/gantt_onbeforeautoschedule_event.md
- api/gantt_onafterautoschedule_event.md
- api/gantt_onbeforetaskautoschedule_event.md
- api/gantt_onaftertaskautoschedule_event.md
- api/gantt_oncircularlinkerror_event.md
- api/gantt_onautoschedulecircularlink_event.md

~~~js
// before auto scheduling starts
gantt.attachEvent("onBeforeAutoSchedule",function(taskId){
    // any custom logic here   
    return true;
});

// after auto scheduling finishes
gantt.attachEvent("onAfterAutoSchedule",function(taskId, updatedTasks){
    // any custom logic here
});

// before a particular task is rescheduled
gantt.attachEvent("onBeforeTaskAutoSchedule",function(task, startDate, link, predecessor){
    // any custom logic here
    return true;
});

// after a particular task is rescheduled
gantt.attachEvent("onAfterTaskAutoSchedule",function(task, startDate, link, predecessor){
    // any custom logic here
});

// if the circular reference has been detected and auto scheduling is not possible
gantt.attachEvent("onCircularLinkError",function(link, group){
    // any custom logic here
});

// if circular links were found during auto scheduling
gantt.attachEvent("onAutoScheduleCircularLink",function(groups){
    // any custom logic here
});
~~~



##Setting lag and lead times between tasks

Lag and lead times are special values that are used to create complex relations between tasks.

Lag is a delay between tasks which are linked by a dependency. Lead is an overlap between tasks which are linked by a dependency.

There can be two types of successor tasks: 

- a task that can start before its predecessor task's end (task A starts before task B is finished)

E.g.: If we set a lag equal to 1 day for the dependency link, task A will start one day before task B ends;

- a task that can't start until after some delay that follows the finish of its predecessor task (task A starts in some time after task B is finished)

E.g.: If we set a lead equal to 1 day for the dependency link, task A will start in one day after task B ends.

Lag and lead values are set in the additional property of the link object - **link.lag**:

- lag - any whole positive value,
- lead - a negative value of the lag.

By default, it's implied that the lag value of each dependency link is set as 0.



@relatedapi:
	api/gantt_auto_scheduling_config.md

@edition:pro
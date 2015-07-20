Auto Scheduling
===================

Starting from version 3.3, the library provides the **ext/dhtmlxgantt_auto_scheduling.js** extension that gives
Gantt the ability to calculate schedule depending on relations between tasks.

For example, imagine that you have two tasks connected by a dependency link and the second task starts when the first one ends.
If you need to change the schedule of the first task by moving it to the necessary date, the second task won't change its start date, that is won't be moved correspondingly.

In order to recalculate the schedule and move the second task according to the new position of the first task, the auto scheduling function should be applied.


To use the auto scheduling functionality, you should include the *dhtmlxgantt_auto_scheduling.js* extension:

~~~html
<script src="../codebase/ext/dhtmlxgantt_auto_scheduling.js"></script>
~~~

Then it's necessary to enable auto scheduling 

~~~js
// enable auto scheduling
gantt.config.auto_scheduling = true;
gantt.config.auto_scheduling_strict = true;

// recalculate the schedule starting from taskId
gantt.autoSchedule(taskId); 

// recalculate the schedule of the whole project
gantt.autoSchedule();
~~~



{{sample
	02_extensions/12_auto_scheduling.html
}}

@edition:pro
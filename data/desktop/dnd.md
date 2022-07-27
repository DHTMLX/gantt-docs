Dragging Tasks within the Timeline
=============================================

Dragging allows users to quickly change the start (end) dates of the tasks, their duration. <br>
By default, the drag-and-drop is enabled and the user can drag a task along its row in the timeline.

To customize the drag-and-drop behavior, use the following events:

- api/gantt_onbeforetaskdrag_event.md - to deny dragging of specific tasks
- api/gantt_ontaskdrag_event.md - to limit the area for dragging or to provide some other logic when the user drags a task 
- api/gantt_onaftertaskdrag_event.md - to postprocess tasks after they have been dragged to a new place

Let's consider typical cases when the default drag behavior needs customization:


1. [Denying dragging specific tasks](#denyingdraggingofspecifictasks).
2. [Denying dragging tasks out of specific dates](#denyingdraggingtasksoutofspecificdates).
3. [Dragging children together with the parent](#draggingchildrentogetherwiththeparent).
4. [Dragging projects with subtasks](#draggingprojectswithsubtasks).
5. [Setting minimal task duration](#settingminimaltaskduration).
6. [Autoscroll during tasks' dragging](#autoscrollduringtasksdragging).



Denying dragging of specific tasks
---------------------------------------

To deny dragging of specific tasks, use the api/gantt_onbeforetaskdrag_event.md event:

~~~js
gantt.attachEvent("onBeforeTaskDrag", function(id, mode, e){
	if(gantt.getGlobalTaskIndex(id)%2==0){
		return false;      //denies dragging if the global task index is odd
	}
	return true;           //allows dragging if the global task index is even
});
~~~


Denying dragging tasks out of specific dates
---------------------------------------
To deny dragging tasks out of specific dates, use the api/gantt_ontaskdrag_event.md event. 

<p style="margin-top: 20px; font-weight: bold;"> The onTaskDrag event: </p>

<ul style="margin-top:5px;">
	<li>Fires each time the user makes a drag movement with the mouse in the timeline area: moves, resizes a task or changes the task's progress.</li>
	<li>The type of a drag movement is passed as the 2nd argument - <b>mode</b>.</li> 
	<li>All available values of the drag movement's type are stored in the api/gantt_drag_mode_config.md property.</li>
</ul>

<p style="margin-top: 20px; font-weight: bold;">Shortly, all happens in the following order:</p>

<ol style="margin-top:5px;">
	<li>The user makes a move.</li>
    <li>dhtmlxGantt recalculates the task's  date according to the new position.</li>
    <li>dhtmlxGantt fires the api/gantt_ontaskdrag_event.md event.</li>
    <li>dhtmlxGantt re-renders the task in the Gantt chart. <br>  <br> <i>As the api/gantt_ontaskdrag_event.md event fires after dhtmlxGantt makes recalculation, 
    you can specify any custom values for the dragged task in the event's handler, without being afraid that these values will be overwritten. As a result, the task will be rendered in the desired position.</i>
</li>
</ol>


<br>
Let's assume that you want to forbid users to drag tasks out of  the **"31 March, 2020 - 11 April, 2020"** interval. 

<img style="margin-top:10px; margin-bottom:10px;" src="desktop/custom_dnd.png"/>

Then, you can use the code as in:

{{snippet
	Denying dragging tasks out of interval - [31.03.2020, 11.04.2020]
}}
~~~js
var leftLimit = new Date(2020, 2 ,31), rightLimit = new Date(2020, 3 ,12);

gantt.attachEvent("onTaskDrag", function(id, mode, task, original){
	var modes = gantt.config.drag_mode;
	if(mode == modes.move || mode == modes.resize){
    
    	var diff = original.duration*(1000*60*60*24);
       
		if(+task.end_date > +rightLimit){
			task.end_date = new Date(rightLimit);
			if(mode == modes.move)
				task.start_date = new Date(task.end_date - diff);
			}
		if(+task.start_date < +leftLimit){
			task.start_date = new Date(leftLimit);
			if(mode == modes.move)
				task.end_date = new Date(+task.start_date + diff);
		}
	}
});
~~~

{{sample
	08_api/05_limit_drag_dates.html
}}


Dragging children together with the parent
-----------------------------------------------------

To allow dragging children when the user is dragging their parent's task, use the api/gantt_ontaskdrag_event.md event (see more on the event [above](desktop/dnd.md#denyingdraggingtasksoutofspecificdates)):

~~~js
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
});
//rounds positions of the child items to scale
gantt.attachEvent("onAfterTaskDrag", function(id, mode, e){
	var modes = gantt.config.drag_mode;
    if(mode == modes.move ){
    	var state = gantt.getState();
        gantt.eachTask(function(child){          
        	child.start_date = gantt.roundDate({
            	date:child.start_date, 
            	unit:state.scale_unit, 
            	step:state.scale_step
          	});			
          	child.end_date = gantt.calculateEndDate(child.start_date, 
            	child.duration, gantt.config.duration_unit);
          	gantt.updateTask(child.id);
        },id );
    }
});
~~~

Dragging projects with subtasks
-------------------------------------------

{{pronote
This functionality is available in the Gantt PRO edition only. 
}}

Tasks of the [project type](api/gantt_types_config.md) are not draggable by default.
You can enable drag and drop of projects using the api/gantt_drag_project_config.md config:

~~~js
gantt.config.drag_project = true;
~~~

{{sample 08_api/19_draggable_projects.html}}

Dragging dependent tasks together with independent tasks
-------------------------------------------

There are several ways of implementing tasks moving with their dependent tasks.
You can read about all of them in a separate article desktop/dragging_dependent_tasks.md.


Setting minimal task duration
-------------------------------------------

Minimal task duration can be specified via the api/gantt_min_duration_config.md setting.

The option defines the minimum size of the task that can be set during resizing and can be used for preventing users from setting a zero duration.

The value is set in milliseconds:
~~~js
// 1 day
gantt.config.min_duration = 24*60*60*1000;

//OR

// 1 hour
gantt.config.min_duration = 60*60*1000;
~~~

Autoscroll during tasks' dragging
---------------------------------

If you have a large dataset in the Gantt chart, you often need to drag a task to a new distant position or set links between tasks located at a significant distance.

In this case the **autoscroll** functionality is of great help. It is enabled by default, but you can manage this behavior via 
the api/gantt_autoscroll_config.md configuration option.

~~~js
gantt.config.autoscroll = false;
gantt.init("gantt_here");
~~~

Besides, you can adjust the speed of autoscrolling in milliseconds with the help of the corresponding property - api/gantt_autoscroll_speed_config.md:

~~~js
gantt.config.autoscroll = true;
gantt.config.autoscroll_speed = 50;
 
gantt.init("gantt_here");
~~~

Disabling resize of specific tasks
---------------------------------

If you want to prevent certain tasks from being resized, there are two things you can do:

1. Remove resize handles of a task from the UI via CSS.
In order to do this, you need to use the **task_class** template to add an extra CSS class to the required items so that you could locate them via the selector:

~~~js
gantt.templates.task_class = function(start, end, task){
    if(task.no_resize) { // no_resize is a custom property used for the demonstration
        return "no_resize";
    }
    return "";
~~~

Then, you can hide the resize handles using the following CSS:

~~~css
.no_resize .gantt_task_drag{
   display: none !important;
}
~~~

2. Prevent drag and drop from code using the [onBeforeTaskDrag](api/gantt_onbeforetaskdrag_event.md) event.
Returning *false* from the handler will prevent resizing:

~~~js
gantt.attachEvent("onBeforeTaskDrag", function(id, mode, e){
    if(mode === "resize" && gantt.getTask(id).no_resize){
        return false;
    }
    return true;
});
~~~

Which side of a task is being resized
---------------------------------------

The ["resize"](api/gantt_onbeforetaskdrag_event.md) mode of drag and drop means that the user resizes the task either from the start date or from the end date.

If you need to find out which date the user is modifying by the resize, you can use the **gantt.getState().drag_from_start** flag:

~~~js
gantt.attachEvent("onBeforeTaskDrag", function(id, mode, e){
    if(mode === "resize"){
        if(gantt.getState().drag_from_start === true) {
            // changing the start date of a task
        } else {
            // changing the end date of a task
        }
    }
    return true;
});
~~~

Disabling resize of the start or the end date of a task
---------------------------------------------------------

You can locate resize handles using the following selectors:

- .gantt_task_drag[data-bind-property="start_date"]
- .gantt_task_drag[data-bind-property="end_date"]

The following CSS can be used for disabling resizing of start dates of tasks:

~~~css
.gantt_task_drag[data-bind-property="start_date"]{
   display: none !important;
}
~~~

Similarly, preventing resizing of the end dates looks like this:

~~~css
.gantt_task_drag[data-bind-property="end_date"]{
   display: none !important;
}
~~~

Another way to do this is use the [onBeforeTaskDrag](api/gantt_onbeforetaskdrag_event.md) event.
Returning *false* from the handler will prevent resizing:

~~~js
gantt.attachEvent("onBeforeTaskDrag", function(id, mode, e){
    if(mode === "resize"){
        if(gantt.getState().drag_from_start === true) {
             return false;
        } else {
             // changing the end date of a task
        }
    }
    return true;
});
~~~


@index:
- desktop/dragging_dependent_tasks.md
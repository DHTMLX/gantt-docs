Dragging Tasks within the Timeline
=============================================
Dragging allows users to quickly change the start (end) dates of the tasks, their duration. <br>
By default, the drag-and-drop is enabled and the user can drag a task along its row in the timeline.

To customize the drag-and-drop behaviour, use the following events:


- api/gantt_onbeforetaskdrag_event.md - to deny dragging of specific tasks
- api/gantt_ontaskdrag_event.md - to limit the area for dragging or to provide some other logic when the user drags a task 
- api/gantt_onaftertaskdrag_event.md - to postprocess tasks after they have been dragged to a new place

<br>


Let's consider typical cases when the default drag behaviour needs customization:


1. [Denying dragging specific tasks](desktop/dnd.md#denyingdraggingofspecifictasks).
2. [Denying dragging tasks out of specific dates](desktop/dnd.md#denyingdraggingtasksoutofspecificdates).
3. [Dragging childs together with the parent](desktop__dnd.html#draggingchildstogetherwiththeparent).

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
Let's assume that you want to forbid users to drag tasks out of  the **"31 March, 2013 - 11 April, 2013"** interval. 

<img style="margin-top:10px; margin-bottom:10px;" src="desktop/custom_dnd.png"/>

Then, you can use the code as in:

{{snippet
	Denying dragging tasks out of interval - [31.03.2013, 11.04.2013]
}}
~~~js
var leftLimit = new Date(2013, 2 ,31), rightLimit = new Date(2013, 3 ,12);

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
	return true;
});

~~~
{{sample
	08_api/05_limit_drag_dates.html
}}


Dragging childs together with the parent
-----------------------------------------------------
To provide  dragging childs when the user is dragging their parent's task,  use the api/gantt_ontaskdrag_event.md event (see more on the event [above](desktop/dnd.md#denyingdraggingtasksoutofspecificdates)):
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
    return true;
});
//rounds positions of the child items to scale
gantt.attachEvent("onAfterTaskDrag", function(id, mode, e){
	var modes = gantt.config.drag_mode;
 	if(mode == modes.move ){
  		gantt.eachTask(function(child){
   			gantt.roundTaskDates(child);
   			gantt.refreshTask(child.id, true);
  		},id );
 	}
});
~~~



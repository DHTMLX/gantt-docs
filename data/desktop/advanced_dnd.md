Creating/Selecting Tasks with DnD
======================================

dhtmlxGantt library provides an extension that includes advanced drag-n-drop functionality while working with tasks in the timeline. 

All in all the **click_drag** extension allows:

- [creating tasks with drag-n-drop](#creatingtaskswithdragndrop)
- [setting time for unscheduled tasks with drag-n-drop](#settingtimeforunscheduledtasks)
- [selecting tasks with drag-n-drop](#selectingtaskswithdragndrop)
- [creating parts of split tasks with drag-n-drop](#creatingpartsofsplittasks) (PRO version)

{{note To start using the extension, include the **ext/dhtmlxgantt_click_drag.js** file on the page.}}

To enable advanced drag-n-drop, specify the api/gantt_click_drag_config.md configuration option and set the necessary properties from the list below inside its object: 

~~~js
gantt.config.click_drag = {
	callback: onDragEnd,
	singleRow: true
};
~~~

- **className** -  (*string*) sets a custom CSS class for a selected element
- **render** - (*function*) a function that creates an element rendered during dragging. Takes two parameters: 
	- **startPoint** - (*object*) - an object of the type:<br>
    `{absolute: {left: number, top: number}, relative: {left: number, top: number} }`, <br>
	where absolute - the coordinates of the left top corner of the document, and relative - the coordinates of the left top element used as a viewPort 
	- **endPoint** - (*object*) an object of the type: <br>
    `{absolute: {left: number, top: number}, relative: {left: number, top: number} }`, <br>
	where absolute - the coordinates of the left top corner of the document, and relative - the coordinates of the left top element used as a viewPort 
- **viewPort** - (*HTMLElement*) the element to attach an event to and select
- **useRequestAnimationFrame** - (*boolean*) defines whether requestAnimationFrame is used during rendering
- **callback** - (*function*) - a function that will be called when the mouse button is released. Takes 6 parameters:
	- **startPoint** - (*object*) - an object of the type: <br>
    `{absolute: {left: number, top: number}, relative: {left: number, top: number} }`, <br>
	where absolute - the coordinates of the left top corner of the document, and relative - the coordinates of the left top element used as a viewPort 
	- **endPoint** - (*object*) an object of the type: <br>
    `{absolute: {left: number, top: number}, relative: {left: number, top: number} }`, <br>
	where absolute - the coordinates of the left top corner of the document, and relative - the coordinates of the left top element used as a viewPort 
 	- **startDate** - (*Date*) the date that corresponds to the starting point
	- **endDate** - (*Date*) the date that corresponds to the ending point
	- **tasksBetweenDates** - (*array*) an array of tasks between the start and end date points
	- **tasksInRows** - (*array*) an array of tasks selected between the start and end coordinates vertically
- **singleRow** - (*boolean*) true to add selection only in one row equal to the height of a task

You can attach the following events to the element passed as a viewPort (gantt.$task_data by default - a part of the timeline with task bars):

- **onBeforeDrag** - fires after pressing the mouse button before starting to drag
- **onDrag** - fires each time after dragging is started but before the mouse button is released
- **onBeforeDragEnd** - fires after releasing the mouse button but before the rendered element is deleted and tasks that come under selection are searched for
- **onDragEnd** - fires after removing a rendered element and finding tasks that come under selection but before calling the callback function (if specified)

Creating tasks with drag-n-drop
---------------------------

You can create tasks with drag-n-drop right on the timeline by clicking in an empty place to set the start date of a task and dragging to the right to set its duration.

~~~js
gantt.config.click_drag = {
	callback: onDragEnd,
	singleRow: true
};

gantt.init("gantt_here");
gantt.parse(tasks);
function onDragEnd(startPoint,endPoint,startDate,endDate,tasksBetweenDates,tasksInRow){
	if (tasksInRow.length === 1) {
    	var parent = tasksInRow[0];
    	gantt.createTask({
    		text:"Subtask of " + parent.text,
    		start_date: gantt.roundDate(startDate),
    		end_date: gantt.roundDate(endDate)
    	}, parent.id);
    } else if (tasksInRow.length === 0) {
    	gantt.createTask({
    		text:"New task",
    		start_date: gantt.roundDate(startDate),
    		end_date: gantt.roundDate(endDate)
    	});
    }
}
~~~

{{sample 02_extensions/24_click_drag.html}}

Setting time for unscheduled tasks
------------------------

The **click_drag** extension allows setting time for [unscheduled tasks](desktop/unscheduled_tasks.md) with drag-n-drop.

Selecting tasks with drag-n-drop
-------------------------------

It is possible to select tasks with drag-n-drop in several modes: in dates, rows, or in bounds.

~~~js
gantt.config.multiselect = true;
gantt.config.click_drag = {
	callback: onDragEnd
};

gantt.config.autoscroll = true;
gantt.config.autoscroll_speed = 50;
gantt.init("gantt_here");
gantt.parse(tasks);
function onDragEnd(startPoint,endPoint,startDate,endDate,tasksBetweenDates,tasksInRows){
	var mode = document.querySelector("input[name=selectMode]:checked").value;
		switch(mode) {
			case "1":
				unselectTasks();
				tasksBetweenDates.forEach(function(item) {
					gantt.selectTask(item.id);
				});
			break;
			case "2":
				unselectTasks();
				tasksInRows.forEach(function(item) {
					gantt.selectTask(item.id);
				});
			break;
			case "3":
				unselectTasks();
				for (var i=0; i<tasksBetweenDates.length; i++) {
					for (var j=0; j<tasksInRows.length; j++) {
						if (tasksBetweenDates[i] === tasksInRows[j]) {
							gantt.selectTask(tasksBetweenDates[i].id);
						}
					}
				}
			break;
			return;
		}
}
~~~

{{sample  02_extensions/25_click_drag_select_by_drag.html}}

Creating parts of split tasks
-------------------------

You can create parts of [split tasks](desktop/split_tasks.md) with drag-n-drop as well. 

~~~js
gantt.config.click_drag = {
	callback: onDragEnd,
	singleRow: true
}

gantt.init("gantt_here");
gantt.parse(tasks);
function onDragEnd(startPoint,endPoint,startDate,endDate,tasksBetweenDates,tasksInRow){
	if (tasksInRow.length === 1) {
		var currentTask = tasksInRow[0];
		if (currentTask.type === "project") {
			currentTask.render = "split";
			gantt.addTask({
				text:"Subtask of " + currentTask.text,
				start_date: gantt.roundDate(startDate),
				end_date: gantt.roundDate(endDate)
			}, currentTask.id);
		} else {
			var projectName = "new Project " + currentTask.text;
			var newProject = gantt.addTask({
				text: projectName,
				render: "split",
				type: "project",
			}, currentTask.parent);
			gantt.moveTask(
            	newProject,
                gantt.getTaskIndex(currentTask.id),
                gantt.getParent(currentTask.id)
            );
			gantt.moveTask(currentTask.id, 0, newProject);
			gantt.calculateTaskLevel(currentTask)

			var newTask = gantt.addTask({
				text:"Subtask of " + projectName,
				start_date: gantt.roundDate(startDate),
				end_date: gantt.roundDate(endDate)
			}, newProject);
			gantt.calculateTaskLevel(newTask);
		}
	} else if (tasksInRow.length === 0) {
		gantt.createTask({
    		text:"New task",
    		start_date: gantt.roundDate(startDate),
    		end_date: gantt.roundDate(endDate)
		});
	}
}
~~~

{{sample 02_extensions/23_click_drag_splittask.html}}


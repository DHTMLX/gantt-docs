getTaskPosition
=============
@short: calculates the position and size of the task's DOM element in the timeline area
	

@params:
- task	object	the task object
- from	Date	the start date of the item
- to	Date	the end date of the item

@returns: 
- object	object	the size object




@example:
// adding baseline display
gantt.addTaskLayer(function draw_planned(task) {
	if (task.planned_start && task.planned_end) {
		var sizes = gantt.getTaskPosition(task, task.planned_start, task.planned_end); /*!*/
		var el = document.createElement('div');
		el.className = 'baseline';
		el.style.left = sizes.left + 'px';
		el.style.top = sizes.top + 'px';
		el.style.width = sizes.width + 'px';
		el.style.height= sizes.height + 'px';
		return el;
	}
	return false;
});

@relatedsample:
	04_customization/14_deadline.html
    04_customization/15_baselines.html

@template:	api_method
@descr:
The method returns an object with the following properties:

- left - the CSS left position in pixels
- top - the CSS top position in pixels
- height - the CSS height in pixels (defined by the gantt.config.task_height configuration)
- width - the CSS width in pixels (defined by the period between start and end dates of the task or from 'from', 'to' dates if provided)

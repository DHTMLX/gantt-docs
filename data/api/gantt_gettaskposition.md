getTaskPosition
=============

@short: calculates the position and size of the task's DOM element in the timeline area
	

@params:
- task		Task		the task object
* from		Date		optional, the start date of the item
* to		Date		optional, the end date of the item

@returns: 
- object	object		the size object


@example:
// adding baseline display
gantt.addTaskLayer(function draw_planned(task) {
	if (task.planned_start && task.planned_end) {
		const sizes = gantt.getTaskPosition(task, task.planned_start, task.planned_end); /*!*/
		const el = document.createElement('div');
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

- **left** - the CSS left position in pixels
- **top** - the CSS top position in pixels
- **height** - the CSS height of the bar element in pixels (defined either by the [bar_height](api/gantt_bar_height_config.md) configuration or the *task.bar_height* property of the task object)
- **rowHeight** - the CSS height of the task row in pixels (defined either by the [row_height](api/gantt_row_height_config.md) configuration or the *task.row_height* property of the task object) (added in v7.1)
- **width** - the CSS width in pixels (defined by the period between start and end dates of the task or from 'from', 'to' dates if provided)

If only one argument is provided, the method will use **task.start_date**/**task.end_date** in order to calculate **width** and **left** values. Otherwise, the date values from the second and the third arguments will be used.

Note, that the method always uses both date and time parts of the provided dates, regardless of the time scale settings. It means that two calls of the function given below:

~~~js
gantt.getTaskPosition(task, new Date(2019, 3, 19, 1, 0), new Date(2019, 3, 19, 1, 0)); 
// and
gantt.getTaskPosition(task, new Date(2019, 3, 19, 1, 0), new Date(2019, 3, 19, 5, 0)); 
~~~

will return boxes of different sizes, not only in the *hour* scale, but in the *day/month/year* scales as well.
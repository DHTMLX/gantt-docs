getConstraintLimitations
=============

@short:
	returns the earliest and latest dates allowed by the constraint applied to a task

@params:
- task 	Task	a task object

@returns:
- constraintLimitations		object		an object containing constraint dates

@relatedsample:
	02_extensions/19_constraints_scheduling.html

@example:
gantt.addTaskLayer(function draw_deadline(task) {
	var constraintType = gantt.getConstraintType(task);
	var types = gantt.config.constraint_types;
	if (constraintType != types.ASAP && 
    		constraintType != types.ALAP && task.constraint_date) {

		var dates = gantt.getConstraintLimitations(task);

		var els = document.createElement("div");

		if (dates.earliestStart) {
			els.appendChild(renderDiv(
            	task, 
                dates.earliestStart, 
                'constraint-marker earliest-start'
            ));
		}

		if (dates.latestEnd) {
			els.appendChild(renderDiv(
            	task, 
                dates.latestEnd, 
                'constraint-marker latest-end'
            ));
		}

		if (els.children.length)
			return els;
	}
	return false;
});

function renderDiv(task, date, className) {
	var el = document.createElement('div');
	el.className = className;
	var sizes = gantt.getTaskPosition(task, date);
	el.style.left = sizes.left + 'px';
	el.style.top = sizes.top + 'px';
	return el;
}


@template:	api_method
@descr:

{{pronote This functionality is available in the PRO edition only.}}

The return value has the following structure: 

~~~js
{
	earliestStart: Date || null,
	earliestEnd: Date || null,
	latestStart: Date || null,
	latestEnd: Date || null
}
~~~

@relatedapi:
api/gantt_constraint_types_config.md
api/gantt_getconstrainttype.md

@edition: pro
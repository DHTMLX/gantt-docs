constraint_types
=============

@short:
	contains all available constraint types

@type: object
@example:


@template:	api_config
@descr:

The object definition:

~~~js
gantt.config.constraint_types = {
 // As Soon As Possible
 ASAP: "asap",
 // As Late As Possible
 ALAP: "alap",
 // Start No Earlier Than
 SNET: "snet",
 // Start No Later Than
 SNLT: "snlt",
 // Finish No Earlier Than
 FNET: "fnet",
 // Finish No Later Than
 FNLT: "fnlt",
 // Must Start On
 MSO: "mso",
 // Must Finish On
 MFO: "mfo"
};
~~~

It is added in order to avoid hardcoding constraint values in code:

~~~js
gantt.addTaskLayer(function draw_deadline(task) {
	var constraintType = gantt.getConstraintType(task);
	var types = gantt.config.constraint_types;
	if (constraintType != types.ASAP && 
        constraintType != types.ALAP && task.constraint_date) {
		// display something
	}
	return false;
});
~~~

@relatedapi:
api/gantt_getconstrainttype.md
api/gantt_getconstraintlimitations.md

@related:
desktop/auto_scheduling.md

@relatedsample:
02_extensions/19_constraints_scheduling.html
02_extensions/20_backwards_scheduling.html
getConstraintType
=============

@short:
	returns the constraint type applied to the task

@params:
- task 	object	a task object

@returns
- constraintType	string	 constraint type


@example:
var constraintType = gantt.getConstraintType(task);
var types = gantt.config.constraint_types;

if (constraintType != types.ASAP && 
    constraintType != types.ALAP && task.constraint_date) {
    // this task probably a constraint date specified
}

@template:	api_method

@descr:
The return value will match the **constraint_type** value of the task if it's not empty.

If the **constraint_type** is empty, the return value will depend on the current scheduling strategy - either "asap" or "alap" if scheduling from the project end is enabled.

All allowed constraint types are defined in the **gantt.config.constraint_types** config.

@relatedapi:
api/gantt_constraint_types_config.md
api/gantt_getconstraintlimitations.md
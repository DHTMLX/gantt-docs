auto_scheduling_strict
=============

@short:
	 enables the auto scheduling mode, in which tasks will always be rescheduled to the earliest possible date

@type: boolean
@default:false
@example:
gantt.config.auto_scheduling_strict = true;

gantt.init("gantt_here");

@template:	api_config
@descr:
By default, taks are rescheduled only when a new date violates the constraint 


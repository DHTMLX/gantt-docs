start_on_monday
=============

@short:sets the starting day of the week
	
@default:true
@type: boolean
@example:
// weeks start from Sunday
gantt.config.start_on_monday = false;
gantt.init("gantt_here");

@template:	api_config
@descr:

If the parameter is set to <i>true</i>, a week will start from Monday (otherwise, from Sunday).

sort
=============

@short: enables sorting in the table 
	

@type: boolean
@default:false

@example:
gantt.config.sort = true;

gantt.init("gantt_here");
gantt.parse("tasks.json");

@relatedsample:
	07_grid/01_builtin_sorting.html
@related:
	desktop/sorting.md
	
@template:	api_config
@descr:

@relatedapi:
api/gantt_sort.md
api/gantt_onaftersort_event.md

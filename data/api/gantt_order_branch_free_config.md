order_branch_free
=============

@short:
	activates the 'branch' mode that allows reordering tasks within the whole gantt

@type:boolean 
@default:false

@example:
// reordering tasks within the same nesting level
gantt.config.order_branch = true;
// reordering tasks within the whole gantt
gantt.config.order_branch_free = true;
 
gantt.init("gantt_here");


@template:	api_config
@descr:
@relatedsample:
	07_grid/08_drag_between_levels.html
@related:
	desktop/reordering_tasks.md
	
@relatedapi:
api/gantt_order_branch_config.md


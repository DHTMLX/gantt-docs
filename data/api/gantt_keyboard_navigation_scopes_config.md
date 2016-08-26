keyboard_navigation_scopes
=============

@todo:
	check 


@short: contains a set of gantt elements for which keyboard navigation can be applied
	

@type: object
@example:
gantt.config.keyboard_navigation_scopes = {
	"gantt":"gantt",
	"headerCell": "headerCell",
	"taskRow": "taskRow",
	"taskCell": "taskCell"
};


@template:	api_config
@descr:

- "gantt" - keyboard navigation action is applied to the whole gantt
- "headerCell" - keyboard navigation action is applied to the header cells of gantt
- "taskRow" - keyboard navigation action is applied to the row with a task
- "taskCell" - keyboard navigation action is applied to separate cells of the row with a task

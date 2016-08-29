keyboard_navigation_scopes
=============

@todo:
	check 


@short: contains a set of gantt elements for which keyboard navigation actions can be applied
	

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
added in version 4.1

- "gantt" - keyboard navigation action is applied to the whole gantt
- "headerCell" - keyboard navigation action is applied to the header cells of gantt
- "taskRow" - keyboard navigation action is applied to the row with a task
- "taskCell" - keyboard navigation action is applied to separate cells of the row with a task

@relatedsample:
02_extensions/16_keyboard_navigation.html
02_extensions/17_keyboard_navigation_cell.html

@related:
desktop/accessibility.md#keyboardnavigation

@relatedapi:
api/gantt_keyboard_navigation_config.md
api/gantt_keyboard_navigation_cells_config.md
api/gantt_addshortcut.md
api/gantt_focus.md
api/gantt_removeshortcut.md

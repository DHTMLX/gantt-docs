undo_actions
=============

@short:
	sets the actions that the Undo operation will revert

@type: object
@example:
gantt.config.undo_actions = {
	update:"update",
	remove:"remove", // remove an item from datastore
	add:"add"
};

@template:	api_config
@descr:
@relatedapi:
- api/gantt_undo_config.md
- api/gantt_undo_types_config.md
- api/gantt_undo_steps_config.md
@relatedsample:
02_extensions/14_undo.html



undo_types
=============

@short:
	sets the types of entities for which the Undo operation will be applied

@type: object
@example:
gantt.config.undo_types = {
	link:"link",
	task:"task"
};

@template:	api_config
@descr:
@relatedapi:
- api/gantt_undo_config.md
- api/gantt_undo_actions_config.md
- api/gantt_undo_steps_config.md
@relatedsample:
02_extensions/14_undo.html
@related:desktop/undo_redo.md
@changelog:
added in version 4.0

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

{{note This option is defined in the **undo.js** extension, so you need to enable the [undo](desktop/extensions_list.md#undo) plugin. Read the details in the desktop/undo_redo.md article.}}


@relatedapi:
- api/gantt_undo_config.md
- api/gantt_undo_types_config.md
- api/gantt_undo_steps_config.md
@relatedsample:
02_extensions/14_undo.html
@related:desktop/undo_redo.md
@changelog:
added in version 4.0
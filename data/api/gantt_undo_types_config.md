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

{{note This option is defined in the **undo** extension, so you need to enable the [undo](desktop/extensions_list.md#undo) plugin. Read the details in the desktop/undo_redo.md article.}}

- <span class=subproperty>**link**</span> - (*string*) - the name of the "link" entity
- <span class=subproperty>**task**</span> - (*string*) - the name of the "task" entity


@relatedapi:
- api/gantt_undo_config.md
- api/gantt_undo_actions_config.md
- api/gantt_undo_steps_config.md
@relatedsample:
02_extensions/14_undo.html
@related:desktop/undo_redo.md
@changelog:
added in version 4.0

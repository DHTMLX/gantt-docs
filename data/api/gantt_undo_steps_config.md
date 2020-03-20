undo_steps
=============

@short:
	sets the number of steps that should be reverted by the undo method

@default:10
@type: number
@example:
gantt.config.undo_steps = 10;

gantt.init("gantt_here");

@template:	api_config
@descr:

{{note This option is defined in the **undo.js** extension, so you need to enable the [undo](desktop/extensions_list.md#undo) plugin. Read the details in the desktop/undo_redo.md article.}}


@relatedapi:
- api/gantt_undo_config.md
- api/gantt_undo_actions_config.md
- api/gantt_undo_types_config.md

@relatedsample:
02_extensions/14_undo.html
@related:desktop/undo_redo.md
@changelog:
added in version 4.0
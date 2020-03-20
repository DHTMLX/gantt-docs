undo
=============

@short:
	reverts the changes made in the gantt

@params:



@example:
gantt.undo();

@template:	api_method
@descr:

{{note This method is defined in the **undo.js** extension, so you need to activate the [undo](desktop/extensions_list.md#undo) plugin. Read the details in the desktop/undo_redo.md article.}}




@relatedapi:
- api/gantt_redo.md
- api/gantt_getundostack.md
- api/gantt_clearundostack.md
- api/gantt_onbeforeundo_event.md
- api/gantt_onafterundo_event.md

@relatedsample:
02_extensions/14_undo.html

@related:
desktop/undo_redo.md

@changelog:
added in version 4.0
redo
=============

@short:
	applies the reverted changes to the gantt once again

@params:



@example:
gantt.redo();

@template:	api_method
@descr:

{{note This method is defined in the **undo** extension, so you need to enable the [undo](desktop/extensions_list.md#undo) plugin. Read the details in the desktop/undo_redo.md article.}}




@relatedapi:
- api/gantt_undo.md
- api/gantt_getredostack.md
- api/gantt_clearredostack.md
- api/gantt_onbeforeredo_event.md
- api/gantt_onafterredo_event.md


@relatedsample:
02_extensions/14_undo.html

@related:
desktop/undo_redo.md

@changelog:
added in version 4.0
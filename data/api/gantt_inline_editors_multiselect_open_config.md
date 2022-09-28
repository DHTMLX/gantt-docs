inline_editors_multiselect_open
=============

@short: defines whether inline editors should be opened after one click on a task when multi-task selection is enabled
	

@type: boolean
@example:
gantt.config.inline_editors_multiselect_open = true;

gantt.init("gantt_here");


@template:	api_config

@default: undefined

@descr:
In the single selection mode, Gantt opens the inline editor after you click on a task. 

In the multi selection mode, Gantt selects the task after you click on it, and opens the inline editor only after the second click. 
If you want Gantt to open the inline editor after the first click, enable the **inline_editors_multiselect_open** config.

@changelog: added in v7.1.13

@related: 
desktop/inline_editing.md
desktop/multiselection.md
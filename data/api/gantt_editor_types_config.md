editor_types
=============

@short:
	an object that contains definitions of inline editors

@type: object



@example:
gantt.config.editor_types.custom_editor = {// custom editor logic}


@template:	api_config
@descr:
The config can be used for creation of custom editors (see the above example).

There are several predefined inline editors:

- <span class=subproperty>**text**</span> - (*InlineEditor*) - for editing text columns, e.g. task name
- <span class=subproperty>**number**</span> - (*InlineEditor*) - for editing number columns, e.g. task duration, order, etc.
- <span class=subproperty>**duration**</span> - (*InlineEditor*) - for editing duration columns, i.e. task duration
- <span class=subproperty>**date**</span> - (*InlineEditor*) - for editing date columns, e.g. start and end dates of the task
- <span class=subproperty>**select**</span> - (*InlineEditor*) - for choosing an option from a list
- <span class=subproperty>**predecessor**</span> - (*InlineEditor*) - for setting task-predecessor for the currently edited task. This editor gets the [WBS codes of tasks](desktop/specifying_columns.md#wbscode) to set connection with the predecessor task
- <span class=subproperty>**[customEditorName: string]**</span> - (*InlineEditor | undefined*) - custom inline editors



Editors defined in this object can be attached to gantt columns:

~~~js
const textEditor = {type: "text", map_to: "text"};
const dateEditor =  {type: "date", map_to: "start_date",
	min: new Date(2018, 0, 1), max: new Date(2019, 0, 1)};

gantt.config.columns = [
	{name: "text", label: "Task name", tree: true, width: "*", editor: textEditor},
	{name: "start_date", label: "Start time", align: "center", editor: dateEditor}
];

~~~


@related:
desktop/inline_editing.md#typesofeditors
editor_types
=============

@todo:
	needs checking and improving


@short:
	an object that contains a set of predefined inline editors

@type: object
@example:
gantt.config.editor_types.custom_editor = {// custom editor logic}


@template:	api_config
@descr:
The config can be used for creation of custom editors (see the above example).

There are several predefined inline editors:

- **text** editor - for editing text columns, e.g. task name
- **number** editor - for editing number columns, e.g. task duration, order, etc.
- **date** editor - for editing date columns, e.g. start and end dates of the task
- **select** editor - for choosing an option from a list
- **predecessor** editor - for setting task-predecessor for the currently edited task. This editor gets the [WBS codes of tasks](desktop/specifying_columns.md#wbscode) to set connection with the predecessor task.

~~~js
var editors = {
	text: {type: "text", map_to: "text"},
	start_date: {type: "date", map_to: "start_date", min: new Date(2018, 0, 1), 
    	max: new Date(2019, 0, 1)},
	end_date: {type: "date", map_to: "end_date", min: new Date(2018, 0, 1), 
    	max: new Date(2019, 0, 1)},
	duration: {type: "number", map_to: "duration", min:0, max: 100},
	priority: {type:"select", map_to:"priority", options:gantt.serverList("priority")},
	predecessors: {type: "predecessor", map_to: "auto"}
};
~~~


@related:
desktop/inline_editing.md#typesofeditors
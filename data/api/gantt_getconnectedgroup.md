getConnectedGroup
=============


@short:
	returns all tasks and links that a task is connected with

@params:
* id		id			optional, the id of a task


@returns:
- connections		object			an object with tasks and links a task is connected with

@example:
gantt.getConnectedGroup(18);
// => {links:["16", "17", "18"], tasks:[18, 17, 19, 20]}


@template:	api_method
@descr:
Without parameters, the method returns all groups of tasks and links that make connections.

{{pronote This functionality is available in the PRO edition only.}}

{{note The method requires the [auto_scheduling](desktop/extensions_list.md#autoscheduling) plugin to be included on the page.}}

@related:
desktop/auto_scheduling.md


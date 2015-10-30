Implementing Undo/Redo Functionality
======================================

Starting from version 4.0 Gantt Chart allows you to undo/redo the made changes. To enable this functionality, you need to include the **ext/undo.js** extension on the page.

~~~html
<script src="codebase/dhtmlxgantt.js"></script>
<script src="codebase/ext/undo.js"></script>  /*!*/
<link rel="stylesheet" href="codebase/dhtmlxgantt.css" type="text/css">
~~~

By default, both the Undo and Redo functions are enabled. You can also use them separately by adjusting the corresponding configuration properties.
To activate the Undo functionality, set the api/gantt_undo_config.md config property to *true*:

~~~js
gantt.config.undo = true;
~~~

To enable the Redo functionality, specify the api/gantt_redo_config.md config property with the *true* value:

~~~js
gantt.config.redo = true;
~~~

Calling the Undo/Redo functions
----------------------------

To revert the changes made in the Gantt Chart, use the api/gantt_undo.md method:

~~~js
gantt.undo();
~~~

In order to redo the previously undone changes, make use of the api/gantt_redo.md method:

~~~js
gantt.redo();
~~~

Getting the stack of stored Undo/Redo commands
--------------------------------------------

All actions in the Gantt Chart are implemented as command objects. Gantt stores a stack of the most recently executed commands.
The undo.js extension can make reverse operations out of them and execute them in Gantt. 

When you need to undo or redo a command, the extension takes the most recent command object and executes the corresponding method.

To get the stack of the stored undo commands, use the api/gantt_getundostack.md method:

~~~js
var stack = gantt.getUndoStack();
~~~

To return the stack of the stored redo commands, apply the api/gantt_getredostack.md method:

~~~js
var stack = gantt.getRedoStack();
~~~

Both methods return the stack of commands as an array of command objects.


Configuring the Undo functionality
----------------------------

There are several settings that help to adjust the Undo operation.

To specify the actions for which Undo will be applied, use the api/gantt_undo_actions_config.md parameter:

~~~js
gantt.config.undo_actions = {
    update:"update",
    remove:"remove", // remove an item from datastore
    add:"add"
};
~~~

To define how many steps can be reverted, apply the api/gantt_undo_steps_config.md parameter:

~~~js
gantt.config.steps = 10;
~~~

By default, it's possible to undo 10 actions.

You can also specify the entities that the undo operation will be aplied for in the api/gantt_undo_types_config.md parameter:

~~~js
gantt.config.undo_types = {
    link:"link",
    task:"task"
};
~~~


The List of API Events
-------------------

There is a set of helpful Undo/Redo-related events:

- api/gantt_onbeforeundo_event.md - fires before the api/gantt_undo.md method is called
- api/gantt_onafterundo_event.md - fires after the api/gantt_undo.md method was called
- api/gantt_onbeforeredo_event.md - fires before the api/gantt_redo.md method is called
- api/gantt_onafterredo_event.md - fires after the api/gantt_redo.md method was called

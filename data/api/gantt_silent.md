silent
=============

@short: makes all code inside it not to trigger internal events or server-side calls
	

@params:
- callback		function	the callback function




@example:
gantt.silent(function () {
    // the task will be deleted only from the client side
    // the gantt won't repaint it automatically
    gantt.deleteTask(id);
});

// repaint the gantt manually when ready
gantt.render();

@template:	api_method
@descr:

@related: desktop/server_side.md#errorhandling

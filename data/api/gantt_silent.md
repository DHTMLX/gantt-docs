silent
=============

@short: makes all code inside it not to trigger internal events or server-side calls
	

@params:
- callback		function	the callback function




@example:
gantt.silent(function () {
	// the task will be deleted only from the client side
	gantt.deleteTask(id);
	// forces the gantt re-rendering because default rendering won't be called 
	// from the silent method 
	gantt.render(); 
});

@template:	api_method
@descr:

@related: desktop/server_side.md#errorhandling

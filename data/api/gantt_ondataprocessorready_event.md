onDataProcessorReady
=============

@short:
	fires on the `dp.init(gantt)` call

@params:
- DataProcessor		object		the DataProcessor object

@example:
gantt.attachEvent("onDataProcessorReady",function(DataProcessor){
	// any custom logic here
});

@template:	api_event
@descr:
You can use this event to add handlers for DataProcessor from the app code.

@related:
desktop/server_side.md

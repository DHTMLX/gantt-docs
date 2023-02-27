assert
=============

@short:
	if the specified expression is false, an errorMessage is shown in the red popup at the top right corner of the screen

@params:

- expression		any			true to assert the expression, false - if assertion fails
- errorMessage		string			an error message that will be shown in the red popup



@example:
gantt.attachEvent("onLoadEnd", function(){
   gantt.assert(gantt.getTaskCount(), "no data loaded");
});

@template:	api_method
@descr:
dhtmlxGantt codebase uses gantt.assert to detect an invalid state of the component

Error display can be changed using the api/gantt_show_errors_config.md config.

Errors can be traced programmatically, using the api/gantt_onerror_event.md event.

onContextMenu
=============
@short:occurs when the user clicks the right mouse button inside the Gantt chart
	

@params:
- taskId 	string		the event id
- linkId 	string		the event id
- e		Event		a native event object

@example:
gantt.attachEvent("onContextMenu", function (taskId, linkId, e){
    //any custom logic here
});

@template:	api_event
@descr:

Right clicks in the Gantt chart open the default browser context menu.

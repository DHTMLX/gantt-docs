onContextMenu
=============

@short:fires when a user clicks the right mouse button inside the Gantt chart (see the details)
	

@params:
- taskId 	string		the event id
- linkId 	string		the event id
- e			Event		a native event object

@example:
gantt.attachEvent("onContextMenu", function (taskId, linkId, event) {
  	var x = event.clientX+document.body.scrollLeft+document.documentElement.scrollLeft,
		y = event.clientY+document.body.scrollTop+document.documentElement.scrollTop;

	if (taskId) {
		menu.showContextMenu(x, y);
		return false;
	}

	return true;
});

@template:	api_event
@descr:

Right clicks in the Gantt chart open the default browser context menu, if there are no other conditions. In the above example a click on a task shows a DHTMLX context menu and hides the default browser context menu.

@relatedsample:
    04_customization/10_context_menu.html
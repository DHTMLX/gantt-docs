updateLink
=============

@short:updates the specified dependency link
	

@params:
- id	string | number	the task id

@example: 
gantt.addLink({
	id:5, 
    source:1, 
    target:2, 
    type:1
});

gantt.getLink(5).type = 2; //changes link's data
gantt.updateLink(5); //renders the updated link



@descr:

{{note The method invokes the api/gantt_onafterlinkupdate_event.md event.}}
{{note The method triggers the [DataProcessor](desktop/server_side.md) if the dataProcessor is enabled.}}

This method should be called after modifying the link object to update the Gantt's state, repaint related UI elements, and send the changes to the backend.

Calling this method will fire the api/gantt_onafterlinkupdate_event.md event, which may trigger additional recalculations.

If you're using the [DataProcessor](desktop/server_side.md), invoking this method will prompt an **update** request to the server.

For making visual changes that don't require saving, **utilize the api/gantt_refreshlink.md method instead**. This will repaint the record in the Gantt without any extra calculations or server requests.

~~~js
let selectedLink = null;
gantt.templates.link_class = function(link){
	if(link.id == selectedLink) {
		return "selected_link";
	}
};

gantt.attachEvent("onLinkClick", function(id,e){
	selectedLink = id;
	gantt.refreshLink(id); /*!*/
});
~~~


@related:
	desktop/server_side.md#updatingdataontheserver
@relatedapi:
	api/gantt_updatetask.md
	api/gantt_refreshlink.md
    api/gantt_refreshtask.md
	api/gantt_onafterlinkupdate_event.md

@template:	api_method
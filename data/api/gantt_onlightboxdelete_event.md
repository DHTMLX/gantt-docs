onLightboxDelete
=============
@short:fires when the user clicks on the 'Delete' button in the lightbox
	

@params:
- id	string, number	the task id ( the task opened in the lightbox)

@returns:  
  - result     boolean       defines whether the default action of the event will be triggered (<b>true</b>) or canceled (<b>false</b>) 
 
@example:
gantt.attachEvent("onLightboxDelete", function(id){
	var task = gantt.getTask(id);
    if (task.duration > 60){
    	alert("The duration is too long. Please, try again");
        return false;
    }
    return true;
})

@template:	api_event
@descr:
The event is blockable. Return *false* to cancel the 'delete' operation and keep the lightbox open.

@related:
	api/gantt_onlightboxcancel_event.md
    api/gantt_onlightboxsave_event.md
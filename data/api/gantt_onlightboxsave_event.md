onLightboxSave
=============
@short:fires when the user clicks on the 'Save' button in the lightbox
	

@params:
- id	 	string,number   	the id of unmodified task. Note, at this stage the lightbox values aren't applied to the task object yet and you can access the initial task using gantt.getTask(id)
- task 		object				the modified task object
- is_new	boolean				specifies whether the user opens the lightbox to create a new task (<i>true</i>)<br> or update an existing one (<i>false</i>)

@returns:  
  - result     boolean       defines whether the default action of the event will be triggered (<b>true</b>) or canceled (<b>false</b>) 
 
@example:
gantt.attachEvent("onLightboxSave", function(id, task, is_new){
    //any custom logic here
    return true;
})

@template:	api_event
@descr:
The event is blockable. Return *false* to cancel the 'save' operation and keep the lightbox open.

@related:
	api/gantt_onlightboxcancel_event.md
    api/gantt_onlightboxdelete_event.md
onBeforeLightbox
=============
@short:fires immediately before the user opens the lightbox (edit form)
	

@params:
- id	string, number		the task id

@returns:  
  - result     boolean       defines whether the default action of the event will be triggered (<b>true</b>) or canceled (<b>false</b>) 
 
 @example:
gantt.attachEvent("onBeforeLightbox", function(id) {
  	var task = gantt.getTask(id);
   	task.my_template = "<span id='title1'>Holders: </span>"+ task.users
    +"<span id='title2'>Progress: </span>"+ task.progress*100 +" %";
	return true;
});

@template:	api_event
@relatedsample:
	05_lightbox/05_template.html
    05_lightbox/06_custom_button.html
	
@descr:
- The event is blockable. Return *false* to cancel the default processing (opening of the lightbox).
- Using this event is a good way to customize something in the lightbox.

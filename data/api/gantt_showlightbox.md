showLightbox
=============
@short:opens the lightbox for the specified task
	

@params:
- id 	string | number		the task id

@example:
gantt.showLightbox(1);/*!*/

gantt.hideLightbox();
@template:	api_method
@descr:
The method invokes the api/gantt_onbeforelightbox_event.md and api/gantt_onlightbox_event.md events.

@relatedapi:
	api/gantt_hidelightbox.md
hideCover
=============
@short:hides the lightbox modal overlay that blocks interactions with the remaining screen
	

@params:
* box	HTMLElement	an element to hide

@example:
gantt.hideCover(gantt.getLightbox());

@relatedapi:
	api/gantt_showcover.md
@template:	api_method
@descr:
If you specify the input parameter, the method will hide the specified HTML object element (by setting the display property to "none").

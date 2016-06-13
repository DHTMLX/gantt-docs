onLightboxCancel
=============
@short:fires when the user clicks on the 'Cancel' button in the lightbox
	

@params:
- id	string, number	the task id ( the task opened in the lightbox)

@example:
gantt.attachEvent("onLightboxCancel", function(id){
    //any custom logic here
})

@template:	api_event
@descr:

@related:
	api/gantt_onlightboxsave_event.md
    api/gantt_onlightboxdelete_event.md
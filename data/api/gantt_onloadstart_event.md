onLoadStart
=============
@short:fires immediately before loading data from the data source has been started


@example:
gantt.attachEvent("onLoadStart", function(){
    //any custom logic here
});

@template:	api_event
@descr:
The event fires in the api/gantt_load.md method.

@relatedapi:
    api/gantt_onbeforeparse_event.md
    api/gantt_ontaskloading_event.md
	api/gantt_onparse_event.md
	api/gantt_onbeforeganttrender_event.md
    api/gantt_onbeforedatarender_event.md
    api/gantt_ondatarender_event.md
	api/gantt_onganttrender_event.md
    api/gantt_onloadend_event.md
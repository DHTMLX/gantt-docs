onLoadStart
=============
@short:fires immediately before loading data from the data source has been started

@params:
- url	string	the server-side url (may be a static file or a server side script that outputs data)
- type	string	('json', 'xml', 'oldxml') the data type

@example:
gantt.attachEvent("onLoadStart", function(url, type){
    console.log("onLoadStart",url, type)
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
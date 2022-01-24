onLoadEnd
=============

@short:fires after loading data from the data source has been completed
	
@params:
- url	string	the server-side url (may be a static file or a server side script that outputs data)
- type	string	('json', 'xml', 'oldxml') the data type

@example:
gantt.attachEvent("onLoadEnd", function(url, type){
    console.log("onLoadEnd",url, type)
});

@template:	api_event
@descr:

@relatedapi:
    api/gantt_onloadstart_event.md
    api/gantt_ontaskloading_event.md
	api/gantt_onbeforeparse_event.md
	api/gantt_onparse_event.md
	api/gantt_onbeforeganttrender_event.md
    api/gantt_onbeforedatarender_event.md
    api/gantt_ondatarender_event.md
	api/gantt_onganttrender_event.md

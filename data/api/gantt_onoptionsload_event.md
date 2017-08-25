onOptionsLoad
=============
@short:fires after a collection of options has been loaded from the server, but isn't parsed yet
	

@example: 
gantt.attachEvent("onOptionsLoad", function (){
	//any custom logic here
});



@template:	api_event
@descr: 
The event when api/gantt_updatecollection.md is called or when [JSON with additional info is parsed](desktop/supported_data_formats.md#jsonwithcollections).

@relatedapi
	api/gantt_serverlist.md
	api/gantt_updatecollection.md

@todo:
	check
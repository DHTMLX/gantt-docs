load
=============
@short:	loads data to the gantt from an external data source

@params: 
- url	string  the server-side url (may be a static file or a server side script that outputs data)
* type	string	<i>('json', 'xml', 'oldxml')</i> the data type. The default value - <i>'json'</i>
* callback		function 	the callback function

@returns:
- resultPromise		object		the promise object which resolves when ajax request is completed

@example: 
gantt.load("/data",function(){
	gantt.message("everything is ready");
});
//or
gantt.load("/data").then(function(xhr){
	gantt.message("everything is ready");
});
//or
gantt.load("data.json"); //loading data in the JSON format
//or
gantt.load("data.xml","xml"); //loading data in the XML format (version 2.0+)
//or
gantt.load("data.xml","xml", function(){ //specifying the callback function 
	alert("Data has been successfully loaded");
});


@template:	api_method
@related:	
	desktop/supported_data_formats.md
    desktop/loading.md
    desktop/server_side.md
    desktop/dynamic_loading.md
@relatedsample:
	01_initialization/04_save_rest.html
    02_extensions/06_dynamic_loading.html
@relatedapi:
	api/gantt_parse.md
	api/gantt_onloadstart_event.md
	api/gantt_onloadend_event.md
	api/gantt_onajaxerror_event.md
@descr: 
The method invokes the api/gantt_onloadstart_event.md and api/gantt_onloadend_event.md events.

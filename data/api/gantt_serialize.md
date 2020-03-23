serialize
=============
@short:serializes the data into JSON or XML format
	

@params:
* type	string 	the format that the data will be serialized into. <br> Possible values: 'json' (<i>default</i> ), 'xml'. 

@returns:
- data		object	a gantt data object 

@example:
gantt.serialize('xml');

@template:	api_method
@descr:

@related:
desktop/serialization.md
desktop/supported_data_formats.md

@relatedapi:
api/gantt_parse.md

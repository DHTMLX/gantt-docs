parse
=============
@short:loads data from a client-side resource
	

@params:
- data		string,object	 a string or object which represents data
* type		string	 		 optional, (<i>'json', 'xml'</i>) the data type. The default value - <i>'json'</i>


@example:
gantt.parse({
	data:[
        {id:1, text:"Project #2", start_date:"01-04-2013", duration:18},
        {id:2, text:"Task #1",    start_date:"02-04-2013", duration:8,
    		progress:0.6, parent:1},
        {id:3, text:"Task #2",    start_date:"11-04-2013", duration:8,
    		progress:0.6, parent:1}
    ],
    links:[
        { id:1, source:1, target:2, type:1},
        { id:2, source:2, target:3, type:0}
  ]
});

@template:	api_method
@relatedapi:
	api/gantt_load.md
@relatedsample:
	01_initialization/01_basic_init.html
@related:
    desktop/loading.md
    desktop/supported_data_formats.md
@descr:


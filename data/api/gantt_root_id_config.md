root_id
=============

@todo:fix the default value

@short:sets the id of the virtual root element
	

@type: string,number
@default: 0
@example:
gantt.config.root_id = "root"; /*!*/

var tasks =  {
    data:[
        {id:1,text:"Project #2",start_date:"01-04-2013",duration:18, parent:"root"},/*!*/
        {id:2, text:"Task #1", 	  start_date:"02-04-2013", duration:8, parent:1},
        {id:3, text:"Task #2",    start_date:"11-04-2013", duration:8, parent:1}
    ],
    links:[]
};

gantt.init("gantt_here");

gantt.parse(tasks);


@template:	api_config
@descr:



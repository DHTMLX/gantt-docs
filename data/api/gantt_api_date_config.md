api_date
=============
@short: sets the date format for addTask() method to 

	

@type: string
@example:
gantt.config.api_date="%Y-%m-%d %H:%i";
gantt.init("gantt_here");
 
gantt.addTask({
    id:10,
    text:"Task #5",
    start_date:"2013-09-02 15:00",
    duration:28
}, "project_2");

@default:"%d-%m-%Y"

@template:	api_config
@descr:

@related:
	desktop/date_format.md
@relatedapi:
	api/gantt_addtask.md
   

@descr:

sets the date format that will be used by the addTask() method to 
parse the start_date, end_date properties in case they are specified as strings 
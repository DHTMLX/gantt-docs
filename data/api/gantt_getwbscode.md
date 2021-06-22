getWBSCode
=============

@short:
	returns the WBS code (the outline number) of a task

@params:
- task		object		the object of a task

@returns:
- wbs_code		string		the WBS code of the task in the gantt



@example:

gantt.init("gantt_here");

gantt.parse({
 "data":[
  {"id":1, "text":"Project #1", "start_date":"28-03-2013", "duration":"11", 
  	"parent":"0", "open": true},
  {"id":2, "text":"Task #1", "start_date":"01-04-2013", "duration":"18", "parent":"1"},
  {"id":3, "text":"Task #2", "start_date":"02-04-2013", "duration":"8", "parent":"1"}
 ],
 "links":[]
});

var wbs_code = gantt.getWBSCode(gantt.getTask(3)) // -> returns "1.2"

@template:	api_method
@descr:
added in version 4.2

@relatedsample:
07_grid/09_wbs_column.html

@related: desktop/specifying_columns.md#wbscode

@relatedapi: api/gantt_gettaskbywbscode.md
getWBSCode
=============

@todo:
	check 

@short:
	returns the WBS code (the outline number) of a task

@params:
- task		object		the object of a task

@returns:
- wbs_code		string		the WBS code of the task in the gantt



@example:
var wbs_code = gantt.getWBSCode({"id":2, "text":"Task #1", "start_date":"02-04-2013", 
	"duration":"8", "parent":"1", "progress":0.5, "open": true}) // -> returns "2.1"

@template:	api_method
@descr:

@relatedsample:
07_grid/09_wbs_column.html
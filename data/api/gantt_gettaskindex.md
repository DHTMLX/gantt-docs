getTaskIndex
=============

@short:
	gets the index of a task in the branch 
	

@params:
- id	string | number	the task id


@returns:
- index		number		the task index in the branch (zero-based numbering)

@example:
const tasks = {
  data:[
     {id:"p_1", text:"Project #1", start_date:"01-04-2013", duration:18, 
     	open:true},
     {id:"t_1", text:"Task #1", start_date:"02-04-2013", duration:8,
     	parent:"p_1"},
     {id:"t_2", text:"Task #2", start_date:"11-04-2013", duration:8,
     	parent:"p_1"}
   ]
};
gantt.init("gantt_here");
gantt.parse(tasks);

const taskIndex = gantt.getTaskIndex("t_1"); // -> 0 /*!*/
const globalTaskIndex = gantt.getGlobalTaskIndex("t_1"); // -> 1

@relatedapi:
	api/gantt_getglobaltaskindex.md
@template:	api_method
@descr:

@relatedsample:
02_extensions/09_multiselection.html
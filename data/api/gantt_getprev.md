getPrev
=============
@short:returns the id of the previous item (no matter what the level of nesting is: the same or different)
	

@params:
- id	string, number	the task id


@returns:
- id	string, number	the id of the previous task

@example:
var tasks = {
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

gantt.getPrev("p_1"); ->  null /*!*/
gantt.getPrev("t_1"); -> "p_1" /*!*/
gantt.getPrev("t_2"); -> "t_1"  /*!*/

@template:	api_method
@descr:

@related:
	desktop/task_tree_operations.md
@relatedapi:
	api/gantt_getnext.md
    api/gantt_getparent.md
    api/gantt_haschild.md
    api/gantt_getchildren.md
    api/gantt_getsiblings.md
    api/gantt_getnextsibling.md 
    api/gantt_getprevsibling.md 
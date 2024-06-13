getNext
=============
@short:returns the id of the next item (no matter what the level of nesting is: the same or different)
	

@params:
- id	string | number	the task id

@returns:
- id	string | number	the id of the next item


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

gantt.getNext("p_1"); -> "t_1" /*!*/
gantt.getNext("t_1"); -> "t_2" /*!*/
gantt.getNext("t_2"); -> null  /*!*/

@template:	api_method
@descr:

@relatedapi:
	api/gantt_getprev.md
    api/gantt_haschild.md
    api/gantt_getchildren.md
    api/gantt_getsiblings.md
    api/gantt_getnextsibling.md 
    api/gantt_getprevsibling.md 
@related:
	desktop/task_tree_operations.md
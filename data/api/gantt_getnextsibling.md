getNextSibling
=============
@short:returns the id of the next task of the same level 
	

@params:
- id	string, number	the task id

@returns:
- id	string, number	the id of the next sibling





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
 
gantt.getSiblings("t_1"); ->  "t_2"  /*!*/
gantt.getSiblings("t_2"); ->  null (if no next sibling) /*!*/

@template:	api_method
@descr:

@related:
	desktop/task_tree_operations.md
@relatedapi:
    api/gantt_getprevsibling.md 
	api/gantt_getsiblings.md 
	api/gantt_getparent.md
    api/gantt_haschild.md
    api/gantt_getchildren.md
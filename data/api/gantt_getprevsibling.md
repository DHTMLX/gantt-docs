getPrevSibling
=============

@short:returns the id of the previous task of the same level 
	

@params:
- id	string, number	the task id

@returns:
- prevSibling	 string, number		the id of the previous sibling






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
 
gantt.getSiblings("t_2"); ->  "t_1" /*!*/
gantt.getSiblings("t_1"); ->  null (if no previous sibling) /*!*/


@related:
	desktop/task_tree_operations.md
@relatedapi:
    api/gantt_getnextsibling.md 
	api/gantt_getsiblings.md 
	api/gantt_getparent.md
    api/gantt_haschild.md
    api/gantt_getchildren.md
    
@template:	api_method
@descr:


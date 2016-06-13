getParent
=============


@short:returns the id of the parent task
	

@params:
- id 	string, number	the task id

@returns:
- id 	string, number	the id of the parent task. Root's id if there is no parent for the specified task




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

gantt.getParent("t_1"); //-> "p_1" /*!*/
gantt.getParent("p_1"); //-> 0 (the default root id) /*!*/

@template:	api_method
@descr:

@related:	
	desktop/task_tree_operations.md
@relatedapi:
	api/gantt_root_id_config.md
    api/gantt_haschild.md
    api/gantt_getchildren.md
    api/gantt_getsiblings.md

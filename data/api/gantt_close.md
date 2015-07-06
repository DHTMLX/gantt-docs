close
=============
@short:closes the branch with the specified id
	

@params:
-id 	string, number	the branch id




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

gantt.close("p_1");/*!*/   

@related:
	desktop/tree_column.md
@relatedapi:
	api/gantt_open.md
    api/gantt_onTaskClosed_event.md
@template:	api_method
@descr:
Note, the method invokes the api/gantt_ontaskclosed_event.md event.

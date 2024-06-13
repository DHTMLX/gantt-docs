open
=============
@short:opens the branch with the specified id
	

@params:
- id	string | number	the branch id




@example:
const tasks = {
  data:[
     {id:"p_1", text:"Project #1", start_date:"01-04-2023", duration:18},
     {id:"t_1", text:"Task #1", start_date:"02-04-2023", duration:8,
     parent:"p_1"},
     {id:"t_2", text:"Task #2", start_date:"11-04-2023", duration:8,
     parent:"p_1"}
   ]
};

gantt.init("gantt_here");
gantt.parse(tasks);
gantt.open("p_1"); /*!*/

@template:	api_method
@related:
	desktop/tree_column.md
@relatedapi:
	api/gantt_close.md
@descr:
The method invokes the api/gantt_ontaskopened_event.md event.

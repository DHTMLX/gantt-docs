selectTask
=============
@short:selects the specified task
	

@params:
- id	string, number		the task id

@returns:
- id	string, number		the id of the selected task
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

gantt.selectTask("t_1"); /*!*/

@template:	api_method
@descr:
The method invokes the api/gantt_ontaskselected_event.md event.

@relatedapi:
	 api/gantt_unselecttask.md
      api/gantt_getselectedid.md
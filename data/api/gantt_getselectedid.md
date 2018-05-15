getSelectedId
=============
@short: returns the id of the selected task
	

@returns:
- id	string 		the id of the selected task or <i>null</i> if no tasks are selected in the Gantt chart

@example:
var tasks = {
  data:[
     {id:"p_1", text:"Project #1", start_date:"01-04-2013", duration:18, open:true},
     {id:"t_1", text:"Task #1", start_date:"02-04-2013", duration:8, parent:"p_1"},
     {id:"t_2", text:"Task #2", start_date:"11-04-2013", duration:8, parent:"p_1"}
   ]
};

gantt.init("gantt_here");
gantt.parse(tasks);

gantt.selectTask("t_1"); 
gantt.getSelectedId(); // -> "t_1" /*!*/

@template:	api_method
@descr:

@relatedapi:
	 api/gantt_selecttask.md
	 api/gantt_unselecttask.md
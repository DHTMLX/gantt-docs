isTaskVisible
=============

@short:checks whether the specifies task is currently rendered in the Gantt chart
	

@params:
- id	string, number		the task's id

@returns:
- isvisible		boolean		<i>true</i>, if the task is currently rendered in the Gantt chart. Otherwise, <i>false</i>



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
 
gantt.isTaskVisible("t_1"); // ->true  /*!*/ 

@template:	api_method
@descr:


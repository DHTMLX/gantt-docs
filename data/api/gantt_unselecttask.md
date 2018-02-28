unselectTask
=============
@short:removes selection from the selected task
	
@params:

* id		string,number			optional, the id of the task to remove selection from, see details
    
@example:
var tasks = {
 data:[
   {id:"p_1",  text:"Project #1", start_date:"01-04-2013", duration:18, open:true},
   {id:"t_1",  text:"Task #1",    start_date:"02-04-2013", duration:8,  parent:"p_1"},
   {id:"t_2",  text:"Task #2",    start_date:"11-04-2013", duration:8,  parent:"p_1"}
 ]
};
gantt.init("gantt_here");
gantt.parse(tasks);

gantt.select("t_1"); 
gantt.unselectTask(); /*!*/

@template:	api_method
@descr:
The method invokes the api/gantt_ontaskunselected_event.md event.

In case [multi-task selection](desktop/multiselection.md) is enabled and there are several selected tasks, you need to pass as a parameter the id of the the task to remove selection from. 

@relatedapi:
	 api/gantt_selecttask.md
      api/gantt_getselectedid.md
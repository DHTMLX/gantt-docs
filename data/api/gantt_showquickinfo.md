showQuickInfo
=============
@short:displays the pop-up task form for the specified task
	
@params: 
- id	string, number 	the task id

@example: 
gantt.addTask({
    id:10,
    text:"Task #5",
    start_date:"02-09-2013",
    duration:28
}, "project_2");

window.setTimeout(function(){
	gantt.showQuickInfo(10);	
},1);	


@template:	api_method
@descr:

@relatedapi:
	api/gantt_hidequickinfo.md
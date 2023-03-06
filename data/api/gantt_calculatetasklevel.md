calculateTaskLevel
=============
@short: calculates the level of nesting of a task 
	

@params:
- task	Task	the task's object



@returns: 
- level	number	the level of a task in the tree hierarchy (zero-based numbering)

@example:
gantt.attachEvent("onTaskCreated", function(task){
 var level = gantt.calculateTaskLevel(task),
   types = gantt.config.types;
   
 //assign task type based on task level
 switch (level){
  case 0:
   task.type = types.project;
   break;
  case 1:
   task.type = types.subproject;
   break;
  default:
   task.type = types.task;
   break;
 }
 return true;
});
 


@relatedapi:
	api/gantt_calculateenddate.md
    api/gantt_calculateduration.md

@template:	api_method
@descr:


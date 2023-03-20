locate
=============

@short:
	gets the id of a task from the specified HTML event
    

@params:
- e		 Event		a native event


@returns:
- id		string,number	the task id

@example:
gantt.$container.addEventListener("mouseover", function(event){
    const taskId = gantt.locate(event);
    if(gantt.isTaskExists(taskId)){
       gantt.message({
         id:1,
         text:"Mouse over " + gantt.getTask(taskId).text});
    }
});

@template:	api_method
@defined:	RenderStack	
@descr:

@relatedapi:
api/gantt_task_attribute_config.md
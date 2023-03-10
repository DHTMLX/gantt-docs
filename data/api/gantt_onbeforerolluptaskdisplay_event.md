onBeforeRollupTaskDisplay
=============

@short: fires before the rollup task is displayed on its parent project 
	

@params:
- taskId 	number|string	the rollup task id
- task	object	the rollup task object
- parentId	number|string	the id of the parent (project) task

@returns:  
- result     boolean       defines whether the rollup task will be displayed on its parent (project) task (<b>true</b>) or not (<b>false</b>) 

@example:
gantt.attachEvent("onBeforeRollupTaskDisplay", function(taskId, task, parentId){
    // any custom logic here
    return false;
});

@template:	api_event
@descr:

@changelog: added in v8.0

@related: desktop/milestones.md#rolluptasksandmilestones

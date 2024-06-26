onBeforeBranchLoading
=============

@short: if dynamic loading is enabled, fires after a user expands the task branch but before loading starts

@params:
- settings	object	an object which contains the task id and request URL

@returns:  
  - result     boolean       returning `false` will cancel the dynamic loading and the data request won't be sent to the server

@example:

gantt.attachEvent("onBeforeBranchLoading", function(settings){
	var task = gantt.getTask(settings.taskId);
	config.url += "&value=" + encodeURIComponent(task.text);
	return true;
});

@template:	api_event

@edition: pro

@descr:

This event can be used to add extra parameters to dynamic loading requests. The `settings` object contains two properties - the id of the task and the request url:

~~~js
{
   taskId: 1,
   url:"/data?parent_id=1"
}
~~~

The request url can be modified from code.

This event fires only when [Dynamic loading](desktop/loading.md) is enabled.

The event is blockable, returning *false* will cancel the dynamic loading request.


@relatedapi:
api/gantt_onafterbranchloading_event.md
api/gantt_branch_loading_config.md
api/gantt_branch_loading_property_config.md

@related:
desktop/loading.md
onAfterBranchLoading
=============

@short:  if dynamic loading is enabled, fires after the task branch was loaded to the page
	

@params:
- settings	object	an object which contains the task id and request URL

@example:
gantt.attachEvent("onAfterBranchLoading", function(settings){
    console.log(settings.url);
});

@template:	api_event

@edition: pro

@descr:

The `settings` object contains two properties - the id of the task and the request url:

~~~js
{
   taskId: 1,
   url:"/data?parent_id=1"
}
~~~

This event fires only when [Dynamic loading](desktop/loading.md) is enabled.

@relatedapi:
api/gantt_onbeforebranchloading_event.md
api/gantt_branch_loading_config.md
api/gantt_branch_loading_property_config.md

@related:
desktop/loading.md
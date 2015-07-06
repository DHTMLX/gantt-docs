onBeforeLinkAdd
=============
@short: fires before a new link is added to the Gantt chart

@params:
- id	string, number	the link id
- link	object	the link object 

@returns:  
  - result     boolean       defines whether the default action of the event will be triggered (<b>true</b>) or canceled (<b>false</b>) 
 
@example:
gantt.attachEvent("onBeforeLinkAdd", function(id,link){
    //any custom logic here
    return true;
});

@relatedapi:
	api/gantt_addlink.md

@template:	api_event
@descr:
The event is blockable. Return *false* to cancel adding of the link.

~~~js
//excludes overtaking the target task by the source task
//in case of creating "finish_to_start" links
gantt.attachEvent("onBeforeLinkAdd", function(id, link){
	if (link.type == 0){
		var sourceTask = gantt.getTask(link.source);
		var targetTask = gantt.getTask(link.target);
		if (sourceTask.end_date >= targetTask.start_date){
			alert("This link is illegal")
			return false;
		}
    }
});
~~~
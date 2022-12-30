getTotalSlack
=============

@short:
	returns the total slack of a task

@params:
* task		object		optional, the object of a task

@returns:
- total_slack		number|object 		either the total slack of a task or, if the <i>task</i> parameter is not specified, an object with key:value pairs where key is the id of a task and value is the total slack of the task

@example:
var task = gantt.getTask(7);
gantt.getTotalSlack(task);

@template:	api_method
@descr:
{{pronote This functionality is available in the PRO edition only.}}

{{note This method is defined in the **critical_path** extension, so you need to activate the [critical_path](desktop/extensions_list.md#criticalpath) plugin using the [gantt.plugins](api/gantt_plugins.md) method. Read the details in the desktop/critical_path.md article.}}



Total slack is a period of time that can be used to increase the duration of a task or move it on the timeline without affecting the time of ending of the whole project.

@related:
desktop/critical_path.md#gettingfreeandtotalslack

@relatedapi:
api/gantt_getfreeslack.md

@relatedsample:
08_api/17_show_task_slack.html

@edition:pro
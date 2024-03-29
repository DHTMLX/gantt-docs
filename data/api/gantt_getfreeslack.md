getFreeSlack
=============

@short:
	returns the free slack of a task

@params:
- task		Task		the object of a task

@returns:
- free_slack		number 		the free slack of a task

@example:
const task = gantt.getTask(7);
gantt.getFreeSlack(task);

@template:	api_method
@descr:
{{pronote This functionality is available in the PRO edition only.}}

{{note This method is defined in the **critical_path** extension, so you need to activate the [critical_path](desktop/extensions_list.md#criticalpath) plugin using the [gantt.plugins](api/gantt_plugins.md) method. Read the details in the desktop/critical_path.md article.}}



Free slack is a period of time that can be used to increase the duration of a task or move it on the timeline without affecting the next task it is connected with.

@related:
desktop/critical_path.md#gettingfreeandtotalslack

@relatedapi:
api/gantt_gettotalslack.md

@relatedsample:
08_api/17_show_task_slack.html

@edition:pro
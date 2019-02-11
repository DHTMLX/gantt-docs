getTotalSlack
=============

@short:
	returns the total slack of a task

@params:
- task		object		the object of a task

@returns:
- total_slack		number 		the total slack of a task

@example:
var task = gantt.getTask(7);
gantt.getTotalSlack(task);

@template:	api_method
@descr:
{{pronote This functionality is available in the PRO edition only.}}

{{note This method is defined in the **ext/dhtmlxgantt_critical_path.js** extension, so you need to include it on the page. Read the details in the desktop/critical_path.md article.}}



Total slack is a period of time that can be used to increase the duration of a task or move it on the timeline without affecting the time of ending of the whole project.

@related:
desktop/critical_path.md#gettingfreeandtotalslack

@relatedapi:
api/gantt_getfreeslack.md

@relatedsample:
08_api/17_show_task_slack.html

@edition:pro
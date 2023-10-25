onBeforeSplitTaskDisplay
=============

@short: fires before a part of the split task is displayed on the Gantt chart
	

@params:
- id 	number|string	the id of the subtask
- task	object	the object of the subtask
- parent	object	the object of the parent task 

@returns:  
- result     boolean       defines whether the subtask of the split task will be displayed on the page (<b>true</b>) or not (<b>false</b>) 

@example:
gantt.attachEvent("onBeforeSplitTaskDisplay", function (id, task, parent) {
    if (task.duration < 3) {
        return false;
    }
    return true;
});

@template:	api_event
@descr:

![split tasks](api/split_tasks.png)

When the split task is rendered, firstly the [onBeforeTaskDisplay](api/gantt_onbeforetaskdisplay_event.md) event is fired for the parent item (a task with *render:"split"*). Then "onBeforeSplitTaskDisplay" is fired for its every subtask. Returning *false* from "onBeforeSplitTaskDisplay" prevents a subtask from being displayed.

{{editor	https://snippet.dhtmlx.com/3q1yd7iz		Filter split tasks}}


@changelog: added in v8.0

@related: desktop/split_tasks.md

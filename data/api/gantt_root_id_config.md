root_id
=============

@short:sets the id of the virtual root element
	

@type: string,number
@default: "0"
@example:
gantt.config.root_id = "root"; /*!*/

var tasks =  {
    data:[
      {id:1, text:"Project #2", start_date:"01-04-2013", duration:18, parent:"root"}, /*!*/
      {id:2, text:"Task #1", 	start_date:"02-04-2013", duration:8,  parent:1},
      {id:3, text:"Task #2",    start_date:"11-04-2013", duration:8,  parent:1}
    ],
    links:[]
};

gantt.init("gantt_here");

gantt.parse(tasks);


@template:	api_config
@descr:
**root_id** refers to the virtual root node of the task tree.
If the value of the *parent* property of a task is set to the value of the **root_id** config, such task will be displayed at the top level of the gantt tree.

- The [parent](desktop/loading.md#dataproperties) property of a task should contain the id of the parent task in a task tree.
- Tasks, whose parent value contains the id of an [existing task](api/gantt_istaskexists.md), will appear as subtasks of the referred items.
- Tasks, whose parent value equals *gantt.config.root_id* (numeric 0 by default) or is undefined, will be located at the top level of the tasks tree.
- Tasks, whose parent contains a [non-existing task id](api/gantt_istaskexists.md) and is [not strictly equal](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Strict_equality) to the **root_id**, won't be displayed in the tasks tree.



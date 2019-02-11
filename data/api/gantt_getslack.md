getSlack
=============
@short:checks how much time (in the current duration unit) a task has before it starts to affect other tasks
	

@params:
- task1	object	the object of the 1st task to check the slack for
- task2	object	the object of the 2nd task to check the slack for

@returns:
- slack		number,string	 a slack between tasks in the current duration units or 'Infinity', if tasks are not linked

@edition: pro

@example:
var tasks = {
    data:[
       {id:1, text:"Project #1", start_date:"01-04-2013", duration:18, type:"project"},
       {id:2, text:"Task #1", start_date:"02-04-2013",duration:8, parent:1},
       {id:3, text:"Task #2", start_date:"13-04-2013",duration:8, parent:1}
    ],
    links:[
       {id:1, source:1, target:2, type:"1"},
       {id:2, source:2, target:3, type:"0"}
    ]
};
 
gantt.config.highlight_critical_path = true; 
gantt.init("gantt_here");
gantt.parse(tasks);

gantt.getSlack(gantt.getTask(2), gantt.getTask(3)); // -> 1  /*!*/


@related:
	desktop/critical_path.md
@relatedsample:
	02_extensions/03_critical_path.html
@relatedapi:
	api/gantt_highlight_critical_path_config.md
	api/gantt_iscriticaltask.md
	api/gantt_iscriticallink.md
    
@template:	api_method
@descr:
{{pronote This functionality is available in the PRO edition only.}}

{{note This method is defined in the **ext/dhtmlxgantt_critical_path.js** extension, so you need to include it on the page. Read the details in the desktop/critical_path.md article.}}


<img src="api/iscritical_path.png"/>

@deprecated:

Use the following methods to get free/total slack of a task:

~~~js
gantt.getFreeSlack(task);

gantt.getTotalSlack(task);
~~~
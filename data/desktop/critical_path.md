Critical Path
===================================

{{pronote This functionality is available only in the PRO edition}}

A critical path is a sequence of tasks that can't be delayed. Otherwise, the whole project would be delayed.<br>
The critical path also determines the shortest time the project can take.<br>

A task is considered critical if it has no days of slack and any delay would directly affect the project completion date. The detailed explanation of how the logic of calculation of the critical path works is given in the [Critical path logic](#criticalpathlogic) section.<br>
Slack time is the time that a task can slip without affecting other tasks or the project's completion date.


<div style="text-align:center;"><img src="desktop/critical_path.png"/></div>

{{note
To start using the extension, enable it using the [gantt.plugins](api/gantt_plugins.md) method.
}}

To show the critical path in the Gantt chart, set the api/gantt_highlight_critical_path_config.md property to 'true':

{{snippet
Making the Gantt chart to display the critical path
}}
~~~js
<!DOCTYPE html>
<html>
<head>
   <script src="codebase/dhtmlxgantt.js"></script>   
   <link href="codebase/dhtmlxgantt.css" rel="stylesheet">   
</head>
<body>
    gantt.plugins({ /*!*/
        critical_path: true /*!*/
    }); /*!*/
    gantt.config.highlight_critical_path = true;
    //your code will be here
</body>
</html>
~~~

{{sample
02_extensions/03_critical_path.html
}}


Note that when the property is enabled, dhtmlxGantt will automatically check the status of tasks and update the critical path. 
Critical tasks and links will have additional *'critical_task'* and *'critical_link'* CSS classes, respectively.  

Each time a task is modified, dhtmlxGantt will completely re-draw data in order to re-calculate the critical path. 
Sometimes it may create performance issues. For that case, the component provides public methods that allow you to check
a certain task or link and implement a performance-friendlier strategy for displaying a critical path.


Critical path logic
--------------------

Gantt considers a task as a critical one in the following cases:

1\. The task has the latest end date in the whole chart.

![](desktop/critical_tasks.png)

2\. The task is connected to a critical task, and the lag between them is 0.

The lag depends on the value of the **gantt.config.duration_unit** parameter. When the **duration_unit** is set to *'day'* and duration between tasks is several hours, Gantt rounds the duration by the following rules:

- rounds the duration down if it is greater than or equal to 12 hours
- rounds the duration up if it is less than 12 hours

If the link object includes the lag parameter, it allows changing the duration between tasks. For example, when *lag* is set to 1, the task becomes critical when the duration between tasks is 1. 
	
Here are some examples with different values of **link.lag**:

- link.lag is 0

~~~js
const tasks = {
    "data": [
		...
    ],
    "links": [
        ...
        { "id": 3, "source": 3, "target": 4, "lag": 0, "type": "0" },
        
    ]
}
~~~

![](desktop/lag0.png)

- link.lag is 1

~~~js
const tasks = {
    "data": [
		...
    ],
    "links": [
        ...
        { "id": 3, "source": 3, "target": 4, "lag": 1, "type": "0" }, 
        
    ]
}
~~~

![](desktop/lag1.png)

- link.lag is -1

~~~js
const tasks = {
    "data": [
		...
    ],
    "links": [
        ...
        { "id": 3, "source": 3, "target": 4, "lag": -1, "type": "0" },
        
    ]
}
~~~

![](desktop/lag_1.png)

3\. The **gantt.config.project_end** parameter is specified and the task dates are greater than the **gantt.config.project_end** date.

Unfortunately, there is no way to change the built-in logic that defines the critical path.
But you can [customize the critical path behaviour](#customizingthecriticalpathbehaviour).

Checking if a task is critical 
---------------------------------------
To check if some task is critical, use the api/gantt_iscriticaltask.md method:

~~~js
gantt.config.highlight_critical_path = true; /*!*/
gantt.init("gantt_here");
gantt.parse(tasks);

gantt.isCriticalTask(gantt.getTask("task3"));// ->'true' /*!*/
~~~

{{sample
02_extensions/03_critical_path.html
}}

Checking if a link is critical 
---------------------------------------

To check if a link is critical (connects 2 critical tasks), use the api/gantt_iscriticallink.md method:

~~~js
gantt.isCriticalLink(gantt.getLink("link1"));
~~~

{{sample
02_extensions/03_critical_path.html
}}


Getting free and total slack
--------------------------

**Free slack** - a period of time that can be used to increase the duration of a task or move it on the timeline without affecting the next task it is connected with.

Free slack can be calculated for 'task' and 'milestone' types of tasks.

To get the free slack of a task, make use of the api/gantt_getfreeslack.md method. It takes the object of a task as a parameter:

~~~js
var task = gantt.getTask(7);
gantt.getFreeSlack(task);
~~~

{{sample 08_api/17_show_task_slack.html}}

**Total slack** - a period of time that can be used to increase the duration of a task or move it on the timeline without affecting the time of ending of the whole project.

Total slack can be calculated for all types of tasks, including projects.

To get the total slack of a task, make use of the api/gantt_gettotalslack.md method. It takes the object of a task as a parameter as well:

~~~js
var task = gantt.getTask(7);
gantt.getTotalSlack(task);
~~~

{{sample 08_api/17_show_task_slack.html}}

![Slack](desktop/show_slack.png)

Customizing the critical path behaviour
---------------------------------------------
By default, the gantt applies the default behavior to a critical path, such as default style for highlighting, re-calculating the critical path with each data update.

To manipulate the visibility of the critical path, use the following approach:

~~~js
var isEnabled = false
function updateCriticalPath(){
	isEnabled = !isEnabled;
	
	gantt.config.highlight_critical_path = isEnabled;
	
	gantt.render();
}
~~~

It can be useful when you have a big number of tasks and re-calculating the critical path may affect the performance.


To manually re-calculate the critical path and apply the related styling, use the following approach:

~~~js
gantt.templates.task_class = function(start, end, task){
	if(gantt.isCriticalTask(task))
		return "critical_task";
	  return "";
};

gantt.templates.link_class = function(link){
	if(gantt.isCriticalLink(link))
		return "critical_link";
      return "";
};

var data = {
	tasks: [
		{ id: 1, text: "Office itinerancy", open:true, type:"project" },
		{ id: 2, text: "Office facing", start_date: "21-07-2020", 
        	duration: "20", parent: "1" },
		{ id: 3, text: "Furniture installation", start_date: "21-07-2020", 
        	duration: "5", parent: "1" },
        { id: 4, text: "The employee relocation", start_date: "28-07-2020", 
        	duration: "15", parent: "1" },
        { id: 5, text: "Interior office", start_date: "28-07-2020", 
        	duration: "15", parent: "1" }
	],
	links: [
		{ id: "1", source: "2", target: "3", type: "0" },
		{ id: "2", source: "3", target: "4", type: "0" },
		{ id: "3", source: "4", target: "5", type: "0" }
	]
};
gantt.init("gantt_here");

gantt.parse(data);
~~~
<br>

It is also possible to highlight tasks and links manually:

- If you return "gantt_critical_task" in the [task_class](api/gantt_task_class_template.md) template, the task will be highlighted as a critical one.
- If you return "gantt_critical_link" in the [link_class](api/gantt_link_class_template.md) template, the link will be highlighted as a critical one.

**Related sample:** [Custom critical path per project](https://snippet.dhtmlx.com/5/eb05a1f90)

Setting lag and lead times between tasks
---------------------------------

It's possible to set lag and lead times between tasks of the critical path. You find the details [here](desktop/auto_scheduling.md#settinglagandleadtimesbetweentasks).

Scheduling completed tasks
----------------------------

By default, there is no difference in how the critical path algorithm processes completed tasks (tasks which have progress value of 1) and incomplete tasks.

Optionally, you can enable the api/gantt_auto_scheduling_use_progress_config.md config to change this behavior:

~~~js
gantt.config.auto_scheduling_use_progress = true;
 
gantt.init("gantt_here");
~~~

When the config is enabled, completed tasks will be excluded from the critical path and auto scheduling.

You can find more details on the [API page](api/gantt_auto_scheduling_use_progress_config.md).

@edition: pro


Displaying the Critical Path
===================================
A critical path is a sequence of tasks that cannot be delayed or else the whole project would be delayed. Also it determines the shortest time that the project can be completed.<br>
A task is considered critical if it has no days of slack and any delay of it would directly affect on the project completion date.<br>
Slack time is the time that a task can slip without affecting another tasks or the project's completion date.



<div style="text-align:center;"><img src="desktop/critical_path.png"/></div>

To show the critical path in the Gantt chart, set the api/gantt_highlight_critical_path_config.md property to 'true':

{{snippet
Making the Gantt chart to display the critical path
}}
~~~js
gantt.config.highlight_critical_path = true;
~~~
{{sample
02_extensions/03_critical_path.html
}}



<br>

Note, when the property is enabled, dhtmlxGantt will automatically check the status of tasks and update the critical path. 
Critical tasks and links will have an additional 'critical_task' and 'critical_link' CSS classes respectively.  
Each time a task is modified, dhtmlxGantt will completely re-draw data in order to re-calculate a critical path. 
Sometimes it may create performance issues. For that case, the component provides public methods that allow you to check
a certain task or link and implement more performance-friendly strategy for displaying a critical path




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

Checking if a slaсk between tasks
---------------------------------------

To check how much time (in the current [duration unit](api/gantt_duration_unit_config.md)) a task has before it starts to affect other tasks , use the api/gantt_getslack.md method:

~~~js
gantt.getSlack(gantt.getTask("task1"), gantt.getTask("task2")); // -> 1  /*!*/
~~~
Note, if tasks are not linked, the method returns 'Infinity'.

Customizing the critical path behaviour
---------------------------------------------
By default, the gantt applies the default behaviour to a critical path, such as default style for highlighting, re-calculating the critical path with each data update.

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


To manually re-calculate the critical path and apply the related styling, use the foolowing approach:

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

var tasks = {
	data: [
		{ "id": 1, "text": "Office itinerancy", open:true, type:"project" },
		{ "id": 2, "text": "Office facing", "start_date": "21-07-2014", "duration": "20",
        "parent": "1" },
		{ "id": 3, "text": "Furniture installation", "start_date": "21-07-2014", 
        "duration": "5", "parent": "1" }
	],
	links: [
		{ id: "1", source: "3", target: "4", type: "0" },
		{ id: "2", source: "3", target: "5", type: "0" },
		{ id: "3", source: "2", target: "6", type: "0" }
	]
};
gantt.init("gantt_here");

gantt.parse(tasks);
~~~



Setting lag and lead times between tasks
---------------------------------

It's possible to set lag and lead times between tasks of the critical path. You find the details [here](desktop/auto_scheduling.md#settinglagandleadtimesbetweentasks).

@edition: pro
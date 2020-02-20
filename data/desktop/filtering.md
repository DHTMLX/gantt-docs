Filtering Tasks
============================

Filtration allows you to manage the number and character of tasks rendered in the Gantt chart. For example, you can use filtration to display the tasks assigned to a specific worker or the
tasks that have the urgent priority.

Note, dhtmlxGantt supports client-side filtering.


<img style="padding-top:17px;padding-bottom:17px;" src="desktop/filtering.png"/>

To filter data, use the api/gantt_onbeforetaskdisplay_event.md event and return:

- *true*, for a task you want to display
- *false*, for a task you want not to display

{{snippet
Displaying only tasks with the high priority
}}
~~~js
gantt.attachEvent("onBeforeTaskDisplay", function(id, task){
	if (task.priority == "high"){
    	return true;
    }
	return false;
});
~~~

{{sample
	07_grid/03_filtering.html
}}


You can have a look at the video guide that demonstrates how to implement filtering tasks.

<iframe width="676" height="400" src="https://www.youtube.com/embed/LyJ3zKSrmH4" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
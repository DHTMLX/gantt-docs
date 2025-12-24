---
title: "Filtering Tasks"
sidebar_label: "Filtering Tasks"
---

# Filtering Tasks


Filtration allows you to manage the number and character of tasks rendered in the Gantt chart. For example, you can use filtration to display the tasks assigned to a specific worker or the
tasks that have the urgent priority.

Note, dhtmlxGantt supports client-side filtering.


![filtering](/img/filtering.png)

To filter data, use the [onBeforeTaskDisplay](api/event/onbeforetaskdisplay.md) event and return:

- *true*, for a task you want to display
- *false*, for a task you want not to display

**Displaying only tasks with the high priority**
~~~js
gantt.attachEvent("onBeforeTaskDisplay", function(id, task){
    if (task.priority == "high"){
        return true;
    }
    return false;
});
~~~


[Basic filtering](https://docs.dhtmlx.com/gantt/samples/07_grid/03_filtering.html)


To filter data of a split task, apply the [onBeforeSplitTaskDisplay](api/event/onbeforesplittaskdisplay.md) event.

You can have a look at the video guide that shows how to implement filtering tasks.

<iframe width="676" height="400" src="https://www.youtube.com/embed/LyJ3zKSrmH4" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


---
title: "Reordering Tasks"
sidebar_label: "Reordering Tasks"
---

# Reordering Tasks


dhtmlxGantt provides 2 ways to reorder tasks in the grid:

1. Drag-and-drop.
2. Sorting (see [details](guides/sorting.md)).

The ways are alternative. By default, both modes are disabled. 

To enable drag-n-drop reordering, use the [order_branch](api/config/order_branch.md) option: 

~~~js
gantt.config.order_branch = true;
gantt.init("gantt_here");
~~~


[Branch ordering](https://docs.dhtmlx.com/gantt/samples/07_grid/02_branch_ordering.html)

 
You can take a look at the video guide that shows how to sort and reorder tasks in the grid.

<iframe width="676" height="400" src="https://www.youtube.com/embed/srtb3nYOb-E" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Drag-n-drop within the whole Gantt structure


The [order_branch](api/config/order_branch.md) option allows dragging tasks within the same Tree level.

It's also possible to enable the mode in which tasks can be reordered within the whole Gantt. It means that a task can replace another task of any Tree level.
To use this type of tasks reordering, use the [order_branch_free](api/config/order_branch_free.md) option:

~~~js
// reordering tasks within the whole gantt
gantt.config.order_branch = true;
gantt.config.order_branch_free = true;
 
gantt.init("gantt_here");
~~~
 

[Drag and drop rows in Grid](https://docs.dhtmlx.com/gantt/samples/07_grid/08_drag_between_levels.html)
 


## Denying dropping to specific positions {#denyingdroppingtospecificpositions}

To deny dropping tasks to specific positions, use the [onBeforeTaskMove](api/event/onbeforetaskmove.md) or [onBeforeRowDragEnd](api/event/onbeforerowdragend.md) event:

~~~js
//prevent moving to another sub-branch:
gantt.attachEvent("onBeforeTaskMove", function(id, parent, tindex){
    var task = gantt.getTask(id);
    if(task.parent != parent)
        return false;
    return true;
});

//or
gantt.attachEvent("onBeforeRowDragEnd", function(id, parent, tindex){
      var task = gantt.getTask(id);
    if(task.parent != parent)
        return false;
    return true;
});
~~~

## Improving performance for large datasets

 
If your Gantt contains lots of tasks, the default mode of branch reordering may slow down the performance.
To speed it up, you can make use of the "marker" mode. 

~~~js
gantt.config.order_branch = "marker";
~~~


[Branch ordering - highlighting mode](https://docs.dhtmlx.com/gantt/samples/07_grid/14_branch_ordering_highlight.html)


In this mode only the name of the task is reordered (on holding the left mouse key) and Gantt is re-rendered only when a task is dropped in the target position (on releasing the key).
Unlike the default mode, changing of the task position doesn't involve firing of the onBeforeTaskMove/onAfterTaskMove events.

To prevent dropping of a task in a particular position, use the [onBeforeRowDragMove](api/event/onbeforerowdragmove.md) event instead (works only in the "marker" mode).


## Highlighting available drop places while drag-&-drop


To highlight available target places during dragging (for example, it's not possible to drag the root node under another root and you want visually inform the user about this), 
use the [onRowDragStart](api/event/onrowdragstart.md) and [onRowDragEnd](api/event/onrowdragend.md) events: 

~~~js
gantt.config.order_branch = true;// order tasks only inside a branch
gantt.init("gantt_here");
gantt.parse(demo_tasks);

var drag_id = null;
gantt.attachEvent("onRowDragStart", function(id, target, e) {
    drag_id = id;
    return true;
});
gantt.attachEvent("onRowDragEnd", function(id, target) {
    drag_id = null;
    gantt.render();
});

gantt.templates.grid_row_class = function(start, end, task){
    if(drag_id && task.id != drag_id){
        if(task.$level != gantt.getTask(drag_id).$level)
            return "cant-drop";
        }
    return "";
};
~~~

## Reordering tasks vertically in the timeline


Follow the examples given in the [How to vertically reorder tasks in the timeline](guides/how-to.md#how-to-vertically-reorder-tasks-in-the-timeline) section.


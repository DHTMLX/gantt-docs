---
title: "Resizing Rows in Grid"
sidebar_label: "Resizing Rows in Grid"
---

# Resizing Rows in Grid


There is the possibility to change the height of the separate rows in the grid. 


The dhtmlxGantt library provides 2 ways to manage the row height:

- By setting both the height of the row and the height of the task bar for the necessary task object;
- By dragging the bottom border of the grid row.

:::note
The functionality is available in v7.1 and upper.
:::

## Setting the row height


You can adjust the height of a particular row according to your needs.

:::note
The individual row height is currently not compatible with [static background rendering](api/config/static_background.md).
:::

![row_height](/img/row_height.png)

For that, you need to redefine the **row_height** and **bar_height** properties of the task object in the data set: 

**Specifying the type of a task in the data set**
~~~js
gantt.parse({
    data: [
        { id: 11, text: "Project #1", type: "project", progress: 0.6, open: true, 
            row_height: 70, bar_height: 60 }, /*!*/
        { id: 12, text: "Task #1", start_date: "03-04-2018", duration: "5", 
            parent: "11", progress: 1, open: true },
        { id: 13, text: "Task #2", start_date: "03-04-2018", type: "project", 
            parent: "11", progress: 0.5, open: true }
    ],
    links: []
});
~~~

or you can implement it dynamically:

~~~js
gantt.getTask(11).row_height = 50;
gantt.getTask(11).bar_height = 25;
// re-render Gantt to apply the changes
gantt.render();
~~~

In case the **row_height** and **bar_height** attributes of the task object are not specified or empty (the default state), the values of [gantt.config.row_height](api/config/row_height.md) and [gantt.config.bar_height](api/config/bar_height.md) will be used.

## Resizing rows by drag and drop


![resize_row](/img/resize_row.png)

To give a user the possibility to resize a row in the grid by dragging the bottom border of the row, set the [gantt.config.resize_rows](api/config/resize_rows.md) option to *true*:

~~~js
gantt.config.resize_rows = true;
~~~


[Resizable rows in grid](https://docs.dhtmlx.com/gantt/samples/02_extensions/28_row_resize.html)


The [gantt.config.min_task_grid_row_height](api/config/min_task_grid_row_height.md) option provides the ability to define the minimal row height that can be set for a task during resizing:

~~~js
gantt.config.min_task_grid_row_height = 45;
~~~

### Events

There are 4 events that you can use to handle the behavior of resizing a row by drag-and-drop:

- [onBeforeRowResize](api/event/onbeforerowresize.md) - fires before the user starts to resize the row height by drag-and-drop
- [onRowResize](api/event/onrowresize.md) - fires when the user is dragging the border of the row to resize the row height
- [onBeforeRowResizeEnd](api/event/onbeforerowresizeend.md) - fires before resizing of the row height is completed
- [onAfterRowResize](api/event/onafterrowresize.md) - fires after resizing of the row height is finished


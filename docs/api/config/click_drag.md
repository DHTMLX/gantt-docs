---
sidebar_label: click_drag
title: click_drag config
description: "enables advanced drag-n-drop"
---

# click_drag

### Description

@short: Enables advanced drag-n-drop

@signature: click_drag: undefined | ClickDrag

### Example

~~~jsx
gantt.config.click_drag = {
    callback: function(
        startPosition,
        endPosition,
        startDate,
        endDate,
        tasksBetween,
        rowsBetween
    ){
        var parentId = gantt.config.root_id;
        if(rowsBetween.length){
            parentId = rowsBetween[0].id;
        }

        gantt.createTask({
            text: "New task",
            start_date: gantt.roundDate(startDate),
            end_date: gantt.roundDate(endDate)
        }, parentId);

    },
    singleRow: true
};
~~~

**Default value:** \{ useKey: false, ignore: ".gantt_task_line, .gantt_task_link" \}

### Details

:::note
This config is defined in the **click_drag** extension, so you need to activate the [click_drag](guides/extensions-list.md#advanced-drag-n-drop) plugin using the [gantt.plugins](api/method/plugins.md) method. Read the details in the [Creating/Selecting Tasks with DnD](guides/advanced-dnd.md) article. 
:::

The **click_drag** extension allows:

- creating tasks with drag-n-drop
- setting time for unscheduled tasks with drag-n-drop
- selecting tasks with drag-n-drop
- creating parts of split tasks with drag-n-drop (PRO version)

The **gantt.config.click_drag** object includes the following properties:

- **className** -  (*string*) sets a custom CSS class for a selected element
- **viewPort** - (*HTMLElement*) the element to attach an event to and select
- **useRequestAnimationFrame** - (*boolean*) defines whether requestAnimationFrame is used during rendering
- **callback** - (*function*) - a function that will be called when the mouse button is released. Takes 6 parameters:
    - **startPoint** - (*object*) - an object of the type: 
    `{absolute: {left: number, top: number}, relative: {left: number, top: number} }`, 
  where absolute - the coordinates of the left top corner of the document, and relative - the coordinates of the left top element used as a viewPort 
    - **endPoint** - (*object*) an object of the type: 
    `{absolute: {left: number, top: number}, relative: {left: number, top: number} }`, 
  where absolute - the coordinates of the left top corner of the document, and relative - the coordinates of the left top element used as a viewPort 
     - **startDate** - (*Date*) the date that corresponds to the starting point
    - **endDate** - (*Date*) the date that corresponds to the ending point
    - **tasksBetweenDates** - (*array*) an array of tasks between the start and end date points
    - **tasksInRows** - (*array*) an array of tasks selected between the start and end coordinates vertically
- **singleRow** - (*boolean*) true to add selection only in one row equal to the height of a task
- **ignore** - (*string*) CSS selector. Drag-n-drop won't be activated for the elements that match the selector
- **useKey** - (*string|boolean*) if the property is specified, drag-n-drop will be activated only when the specified modifier key is pressed. Supported values: "ctrlKey", "shiftKey", "metaKey", "altKey"

~~~js
gantt.config.click_drag = {
    callback: onDragEnd,
    ignore: ".gantt_task_line, .gantt_marker_content, .gantt_task_link",
    useKey: "ctrlKey"
};
~~~

- **render** - (*function*) a function that creates an element rendered during dragging. It takes two parameters: 
    - **startPoint** - (*object*) - an object of the type:
    `{absolute: {left: number, top: number}, relative: {left: number, top: number} }`, 
  where absolute - the coordinates of the left top corner of the document, and relative - the coordinates of the left top element used as a viewPort 
    - **endPoint** - (*object*) an object of the type: 
    `{absolute: {left: number, top: number}, relative: {left: number, top: number} }`, 
  where absolute - the coordinates of the left top corner of the document, and relative - the coordinates of the left top element used as a viewPort

Here is an example of usage of the **render** function:

~~~js
var node;
gantt.config.click_drag = {
    callback: onDragEnd,
    singleRow: true,
    render: function(start, end){
        if(!(node && node.parentNode)){
            node = document.createElement("div");
        }
        var left = Math.min(start.relative.left, end.relative.left);

        node.style.top = (start.relative.top - gantt.config.row_height) + "px";
        node.style.left = left + "px";
        node.style.width = Math.abs(start.relative.left - end.relative.left) + "px";
        node.style.height = gantt.config.row_height + "px";
        node.style.position = "absolute";
        return node;
    }
};
~~~

### Related Guides
- [Creating/Selecting Tasks with DnD](guides/advanced-dnd.md)


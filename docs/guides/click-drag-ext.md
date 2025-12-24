---
title: "clickDrag Extension"
sidebar_label: "clickDrag Extension"
---

# clickDrag Extension


Read details about the clickDrag extension in the article [Creating/Selecting Tasks with DnD](guides/advanced-dnd.md).

## Configuration object


To enable advanced drag-n-drop, specify the [click_drag](api/config/click_drag.md) configuration option and set the necessary properties from the list below inside its object: 

~~~js
gantt.config.click_drag = {
    callback: onDragEnd,
    singleRow: true
};
~~~

- <span class="subproperty">**className?**</span> -  (*string*) - sets a custom CSS class for a selected element
- <span class="subproperty">**viewPort?**</span> - (*HTMLElement*) - the element to attach an event to and select
- <span class="subproperty">**useRequestAnimationFrame?**</span> - (*boolean*) - defines whether requestAnimationFrame is used during rendering
- <span class="submethod">**callback? (startPoint, endPoint, startDate, endDate, tasksBetweenDates, tasksInRows): any**</span> - a function that will be called when the mouse button is released. Takes 6 parameters:
    - **_startPoint?_** - (*object*) - an object with the following attributes:
        - **_absolute_** - (*object*) - the coordinates of the left top corner of the document
            - **_left_** - (*number*) - the left coordinate
            - **_top_** - (*number*) - the top coordinate
        - **_relative_** - (*object*) - the coordinates of the left top element used as a viewPort 
            - **_left_** - (*number*) - the left coordinate
            - **_top_** - (*number*) - the top coordinate
    - **_endPoint?_** - (*object*) - an object with the following attributes:
        - **_absolute_** - (*object*) - the coordinates of the left top corner of the document
            - **_left_** - (*number*) - the left coordinate
            - **_top_** - (*number*) - the top coordinate
        - **_relative_** - (*object*) - the coordinates of the left top element used as a viewPort 
            - **_left_** - (*number*) - the left coordinate
            - **_top_** - (*number*) - the top coordinate
    - **_startDate?_** - (*Date*) - the date that corresponds to the starting point
    - **_endDate?_** - (*Date*) - the date that corresponds to the ending point
    - **_tasksBetweenDates?_** - (*Array&lt;Task&gt;*) - an array of tasks between the start and end date points
    - **_tasksInRows?_** - (*Array&lt;Task&gt;*) - an array of tasks selected between the start and end coordinates vertically
- <span class="subproperty">**singleRow?**</span> - (*boolean*) - true to add selection only in one row equal to the height of a task
- <span class="subproperty">**ignore?**</span> - (*string*) - CSS selector. Drag-n-drop won't be activated for the elements that match the selector
- <span class="subproperty">**useKey?**</span> - (*string | boolean*) - if the property is specified, drag-n-drop will be activated only when the specified modifier key is pressed. Supported values: "ctrlKey", "shiftKey", "metaKey", "altKey"
- <span class="submethod">**render? (startPoint, endPoint): any**</span> - a function that creates an element rendered during dragging. Takes two parameters: 
    - **_startPoint?_** - (*object*) - an object with the attributes:
        - **_absolute_** - (*object*) - the coordinates of the left top corner of the document
            - **_left_** - (*number*) - the left coordinate
            - **_top_** - (*number*) - the top coordinate
        - **_relative_** - (*object*) - the coordinates of the left top element used as a viewPort 
            - **_left_** - (*number*) - the left coordinate
            - **_top_** - (*number*) - the top coordinate
    - **_endPoint?_** - (*object*) - an object with the attributes:
        - **_absolute_** - (*object*) - the coordinates of the left top corner of the document
            - **_left_** - (*number*) - the left coordinate
            - **_top_** - (*number*) - the top coordinate
        - **_relative_** - (*object*) - the coordinates of the left top element used as a viewPort 
            - **_left_** - (*number*) - the left coordinate
            - **_top_** - (*number*) - the top coordinate


## Events


You can attach the following events to the element passed as a viewPort (gantt.$task_data by default - a part of the timeline with task bars):

- **onBeforeDrag** - fires after pressing the mouse button before starting to drag
- **onDrag** - fires each time after dragging is started but before the mouse button is released
- **onBeforeDragEnd** - fires after releasing the mouse button but before the rendered element is deleted and tasks that come under selection are searched for
- **onDragEnd** - fires after removing a rendered element and finding tasks that come under selection but before calling the callback function (if specified)


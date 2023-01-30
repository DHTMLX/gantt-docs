clickDrag Extension
======================

Read details about the clickDrag extension in the article desktop/advanced_dnd.md.

Configuration object
------------------

To enable advanced drag-n-drop, specify the api/gantt_click_drag_config.md configuration option and set the necessary properties from the list below inside its object: 

~~~js
gantt.config.click_drag = {
	callback: onDragEnd,
	singleRow: true
};
~~~

- **className** -  (*string*) sets a custom CSS class for a selected element
- **render** - (*function*) a function that creates an element rendered during dragging. Takes two parameters: 
	- **startPoint** - (*object*) - an object of the type:<br>
    `{absolute: {left: number, top: number}, relative: {left: number, top: number} }`, <br>
	where absolute - the coordinates of the left top corner of the document, and relative - the coordinates of the left top element used as a viewPort 
	- **endPoint** - (*object*) an object of the type: <br>
    `{absolute: {left: number, top: number}, relative: {left: number, top: number} }`, <br>
	where absolute - the coordinates of the left top corner of the document, and relative - the coordinates of the left top element used as a viewPort 
- **viewPort** - (*HTMLElement*) the element to attach an event to and select
- **useRequestAnimationFrame**</span> - (*boolean*) defines whether requestAnimationFrame is used during rendering
- **callback** - (*function*) - a function that will be called when the mouse button is released. Takes 6 parameters:
	- **startPoint** - (*object*) - an object of the type: <br>
    `{absolute: {left: number, top: number}, relative: {left: number, top: number} }`, <br>
	where absolute - the coordinates of the left top corner of the document, and relative - the coordinates of the left top element used as a viewPort 
	- **endPoint** - (*object*) an object of the type: <br>
    `{absolute: {left: number, top: number}, relative: {left: number, top: number} }`, <br>
	where absolute - the coordinates of the left top corner of the document, and relative - the coordinates of the left top element used as a viewPort 
 	- **startDate** - (*Date*) the date that corresponds to the starting point
	- **endDate** - (*Date*) the date that corresponds to the ending point
	- **tasksBetweenDates** - (*array*) an array of tasks between the start and end date points
	- **tasksInRows** - (*array*) an array of tasks selected between the start and end coordinates vertically
- **singleRow** - (*boolean*) true to add selection only in one row equal to the height of a task


Events
-----------

You can attach the following events to the element passed as a viewPort (gantt.$task_data by default - a part of the timeline with task bars):

- **onBeforeDrag** - fires after pressing the mouse button before starting to drag
- **onDrag** - fires each time after dragging is started but before the mouse button is released
- **onBeforeDragEnd** - fires after releasing the mouse button but before the rendered element is deleted and tasks that come under selection are searched for
- **onDragEnd** - fires after removing a rendered element and finding tasks that come under selection but before calling the callback function (if specified)

@todo: check and improve
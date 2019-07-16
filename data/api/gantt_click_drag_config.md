click_drag
=============

@short:enables advanced drag-n-drop
	

@type: object
@example:
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

@template:	api_config
@descr:
{{note This config is defined in the **ext/dhtmlxgantt_click_drag.js** extension, so you need to include it on the page. Read the details in the desktop/advanced_dnd.md article.}}

The **click_drag** extension allows:

- creating tasks with drag-n-drop
- setting time for unscheduled tasks with drag-n-drop
- selecting tasks with drag-n-drop
- creating parts of split tasks with drag-n-drop (PRO version)

The **gantt.config.click_drag** object includes the following properties:

- **className** -  (*string*) sets a custom CSS class for a selected element
- **render** - (*function*) a function that creates an element rendered during dragging. Takes two parameters: 
	- **startPoint** - (*object*) - an object of the type:<br>
    `{absolute: {left: number, top: number}, relative: {left: number, top: number} }`, <br>
	where absolute - the coordinates of the left top corner of the document, and relative - the coordinates of the left top element used as a viewPort 
	- **endPoint** - (*object*) an object of the type: <br>
    `{absolute: {left: number, top: number}, relative: {left: number, top: number} }`, <br>
	where absolute - the coordinates of the left top corner of the document, and relative - the coordinates of the left top element used as a viewPort 
- **viewPort** - (*HTMLElement*) the element to attach an event to and select
- **useRequestAnimationFrame** - (*boolean*) defines whether requestAnimationFrame is used during rendering
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

@related:
desktop/advanced_dnd.md
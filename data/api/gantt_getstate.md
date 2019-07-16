getState
=============

@short:gets the current state of the Gantt chart
	
@returns:
- obj	object 	the state object

@example:
var opened_task = gantt.getState().lightbox;

@template:	api_method
@descr:

@descr: 
The state object reflects the inner UI configuration of the Gantt chart and has the following properties:

- <b>drag_id</b> - (<i>string</i>) the id of a task that the user is currently dragging in the Gantt chart. 'Undefined' or 'null', if no tasks are being dragged in the Gantt chart.
- <b>drag_mode</b> - (<i>'move','resize','progress', 'ignore'</i>) the drag mode. 'Undefined' or 'null', if no tasks are currently being dragged in the Gantt chart.
- <b>fullscreen</b> - (<i>boolean</i>) the flag for the fullscreen mode. 'True', if the Gantt chart is in the fullscreen mode, 'false' otherwise.
- <b>lightbox</b> - (<i>string</i>) the id of a task that is currently opened in the lightbox. 'Undefined' or 'null', if no tasks are opened in the lightbox.
- <b>min_date</b> - (<i>Date</i>) the date that tasks are displayed in the chart from
- <b>max_date</b> - (<i>Date</i>) the date that tasks are displayed in the chart till 
- <b>selected_task</b> - (<i>string</i>) the id of the currently selected task. 'Undefined' or 'null', if no tasks are selected in the Gantt chart.
- **scale_unit** - (*string*) the unit of the background grid of the timeline
- **scale_step** - (*number*) the step of the background grid of the timeline
  

{{note
Note, the  behavior of the Gantt chart can not be changed by modifying this object.
}}


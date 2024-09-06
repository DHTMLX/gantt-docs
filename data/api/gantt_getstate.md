getState
=============

@short:gets the current state of the Gantt chart
	
@returns:
- obj	GanttUIState 	the state object

@example:
const opened_task = gantt.getState().lightbox;

@template:	api_method
@descr:

@descr: 
The state object reflects the inner UI configuration of the Gantt chart and has the following properties:

- <span class=subproperty>**autoscroll**</span> - (*boolean*) - reveals if Gantt is auto-scrolled (*true*). Added only when the 
[*click_drag*](desktop/extensions_list.md#advanceddragndrop) extension is enabled
- <span class=subproperty>**batch_update**</span> - (*boolean*) - the update mode. *true* if the method is called inside the [*batchUpdate*](api/gantt_batchupdate.md) method.
- <span class=subproperty>**drag_from_start**</span> - (*boolean | null*) - the task resize mode. *true* means the task is resized from the start, *false* means from the end. When the task is not resized, it is *null*.
- <span class=subproperty>**drag_id**</span> - (*string | null | undefined*) - the id of a task that the user is currently dragging in the Gantt chart. *undefined* or *null*, if no tasks are being dragged in the Gantt chart.
- <span class=subproperty>**drag_mode**</span> - (*string | null | undefined*) - the drag mode. Has these values: 'move','resize','progress', 'ignore' when a task is dragged. Otherwise, has *null* or *undefined* value.
- <span class=subproperty>**fullscreen**</span> - (*boolean*) - the flag for the fullscreen mode. *true*, if the Gantt chart is in the fullscreen mode, *false* otherwise.
- <span class=subproperty>**lightbox**</span> - (*string | null | undefined*) - the id of a task that is currently opened in the lightbox. *undefined* or *null*, if no tasks are opened in the lightbox.
- <span class=subproperty>**link_from_start**</span> - (*boolean | null*) - the new link creation state. returns *true* when the link is created from the start of the predecessor task.
- <span class=subproperty>**link_landing_area**</span> - (*boolean*) - the new link creation state. returns *true* if the mouse points to the link drag element (bubble).
- <span class=subproperty>**link_source_id**</span> - (*string | number | null*) - the new link creation state. the id of the source (predecessor) task.
- <span class=subproperty>**link_target_id**</span> - (*string | number | null*) - the new link creation state. the id of the target (successor) task.
- <span class=subproperty>**link_to_start**</span> - (*boolean*) - the new link creation state. returns *true* when the link is created to the start of the successor task.
- <span class=subproperty>**min_date**</span> - (*Date*) - the date that tasks are displayed in the chart from
- <span class=subproperty>**max_date**</span> - (*Date*) - the date that tasks are displayed in the chart till 
- <span class=subproperty>**scale_unit**</span> - (*string*) - the unit of the background grid of the timeline
- <span class=subproperty>**scale_step**</span> - (*number*) - the step of the background grid of the timeline
- <span class=subproperty>**selected_task**</span> - (*string | null | undefined*) - the id of the currently selected task. *undefined* or *null*, if no tasks are selected in the Gantt chart.


{{note
Note, the  behavior of the Gantt chart can not be changed by modifying this object.
}}


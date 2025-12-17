---
sidebar_label: getState
title: getState method
description: "gets the current state of the Gantt chart"
---

# getState

### Description

@short: Gets the current state of the Gantt chart

@signature: getState: () =\> GanttUIState

### Returns
- ` obj` - (GanttUIState) - the state object

### Example

~~~jsx
const opened_task = gantt.getState().lightbox;
~~~

### Details
- **autoscroll** - (*boolean*) - reveals if Gantt is auto-scrolled (*true*). Added only when the [*click_drag*](guides/extensions-list.md#advanced-drag-n-drop) extension is enabled  
- **batch_update** - (*boolean*) - the update mode. *true* if the method is called inside the [*batchUpdate*](api/method/batchupdate.md) method.  
- **drag_from_start** - (*boolean | null*) - the resizing mode of a task. *true* means the task is resized from the start, *false* means that the task is resized from the end. When the task is not resized, it is *null*.  
- **drag_id** - (*string | null | undefined*) - the id of a task that the user is currently dragging in the Gantt chart. *undefined* or *null*, if no tasks are being dragged in the Gantt chart.  
- **drag_mode** - (*string | null | undefined*) - the drag mode. Has these values: 'move','resize','progress', 'ignore' when a task is dragged. Otherwise, has *null* or *undefined* value.  
- **fullscreen** - (*boolean*) - the flag for the fullscreen mode. *true*, if the Gantt chart is in the fullscreen mode, *false* otherwise.  
- **lightbox** - (*string | null | undefined*) - the id of a task that is currently opened in the lightbox. *undefined* or *null*, if no tasks are opened in the lightbox.  
- **link_from_start** - (*boolean | null*) - the new link creation state, returns *true* when the link is created from the start of the predecessor task.  
- **link_landing_area** - (*boolean*) - the new link creation state, returns *true* if the mouse points to the link drag element (bubble).  
- **link_source_id** - (*string | number | null*) - the new link creation state. the id of the source (predecessor) task.  
- **link_target_id** - (*string | number | null*) - the new link creation state. the id of the target (successor) task.  
- **link_to_start** - (*boolean*) - the new link creation state, returns *true* when the link is created to the start of the successor task.  
- **min_date** - (*Date*) - the date that tasks are displayed in the chart from  
- **max_date** - (*Date*) - the date that tasks are displayed in the chart till   
- **scale_unit** - (*string*) - the unit of the background grid of the timeline  
- **scale_step** - (*number*) - the step of the background grid of the timeline  
- **selected_task** - (*string | null | undefined*) - the id of the currently selected task. *undefined* or *null*, if no tasks are selected in the Gantt chart.

:::note
Note, the behavior of the Gantt chart can not be changed by modifying this object.
:::


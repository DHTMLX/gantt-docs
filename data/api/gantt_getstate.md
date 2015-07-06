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

<table class="webixdoc_links">
	<tbody>
        <tr>
			<td class="webixdoc_links0"><b>drag_id</b></td>
			<td>(<i>string</i>) the id of a task that the user is currently dragging in the Gantt chart. 'Undefined' or 'null', if no tasks are being dragged in the Gantt chart.</td>
		</tr>
        <tr>
			<td class="webixdoc_links0"><b>drag_mode</b></td>
			<td>(<i>'move','resize','progress', 'ignore'</i>) the drag mode. 'Undefined' or 'null', if no tasks are currently being dragged in the Gantt chart.</td>
		</tr>
        <tr>
			<td class="webixdoc_links0"><b>lightbox</b></td>
			<td>(<i>string</i>)  the id of a task that is currently opened in the lightbox. 'Undefined' or 'null', if no tasks are opened in the lightbox.</td>
		</tr>
		<tr>
			<td class="webixdoc_links0"><b>min_date</b></td>
			<td>(<i>Date</i>) the date that tasks are displayed in the chart from </td>
		</tr>
        <tr>
			<td class="webixdoc_links0"><b>max_date</b></td>
			<td>(<i>Date</i>) the date that tasks are displayed in the chart till </td>
		</tr>
		<tr>
			<td class="webixdoc_links0"><b>selected_task</b></td>
			<td>(<i>string</i>)  the id of the currently selected task. 'Undefined' or 'null', if no tasks are selected in the Gantt chart.</td>
		</tr>
    </tbody>
</table>

{{note
Note, the  behavior of the Gantt chart can not be changed by modifying this object.
}}

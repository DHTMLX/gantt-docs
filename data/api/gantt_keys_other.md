keys
=============

@short:defines the hot keys for the Gantt chart

	

@type:object

@example:
gantt.keys.edit_save = 32;
gantt.init("gantt_here");

@template:	api_config
@descr:


The **keys** object has the following properties:

<table class="list" cellspacing="0" cellpadding="5" border="0">
	<thead>
	<tr>
		<th>
			Property
		</th>
		<th>
			Description
		</th>
		<th>
			Default value
		</th>
		<th>
			Applicable views
		</th>
	</tr>
	</thead>
	<tbody>
	<tr>
		<td>edit_save</td>
		<td>sets the number code of a keyboard key which can be used to confirm the edit operation (alternative to clicking the 'Save' button in the lightbox)</td>
		<td>13 (the 'Enter' key)</td>
		<td>all views</td>
	</tr>
	<tr>
		<td>edit_cancel</td>
		<td>sets the number code of a keyboard key which can be used to cancel the edit operation (alternative to clicking the 'Cancel' button in the lightbox)</td>
		<td>27 (the 'Escape' key)</td>
		<td>all views</td>
	</tr>
	</tbody>
</table>


{{note
Note, all the **keys'** properties have the 'number' data type.
}}
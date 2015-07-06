subscales
=============
@short: specifies the second time scale(s)
	

@type: array
@example:
gantt.config.scale_unit = "month";

gantt.config.subscales = [
	{unit:"week", step:1, template:weekScaleTemplate},
	{unit:"day",  step:1, date:"%D" }
];

gantt.init("gantt_here");

@related:
	desktop/second_scale.md
@relatedsample:
	03_scales/01_multiple_scales.html
	
@template:	api_config
@descr:
Each object in the array specifies a single scale. An object can take the following attributes:

<table class="webixdoc_links">
	<tbody>
    	<tr>
			<td class="webixdoc_links0"><b>css</b></td>
			<td>(<i>function</i>) a function that returns a name of a CSS class that will be applied to the scale units. Takes a date object as a parameter</td>
		</tr>
		<tr>
			<td class="webixdoc_links0"><b>format</b></td>
			<td>(<i>string</i>) the format of the scale's labels</td>
		</tr>
		<tr>
			<td class="webixdoc_links0"><b>step</b></td>
			<td>(<i>string</i>) the scale's step. By default, 1.</td>
		</tr>
        <tr>
			<td class="webixdoc_links0"><b>template</b></td>
			<td>(<i>function</i>) the template of the scale's labels. Takes a date object as a parameter</td>
		</tr>
		<tr>
			<td class="webixdoc_links0"><b>unit</b></td>
			<td>(<i>"minute", "hour", "day", "week", "month", "year"</i>) the scale's unit. By default, "day"</td>
		</tr>
	</tbody>
</table>
columns
=============
@short: configures the columns of the table
	

@type: array
@example:
// default columns definition
gantt.config.columns=[
	{name:"text", 		label:"Task name", 	tree:true, width:'*' },
	{name:"start_date", label:"Start time", align: "center" },
	{name:"duration",	label:"Duration", 	align: "center" },
    {name:"add",		label:"" }
];
gantt.init("gantt_here");



@template:	api_config
@descr:
Each object in the array specifies a single column. An object can take the following attributes:

<table class="webixdoc_links">
	<tbody>
    	<tr>
			<td class="webixdoc_links0"><b>align</b></td>
			<td>(<i>'left', 'center', 'right'</i>) sets the horizontal title alignment </td>
		</tr>
    	<tr>
			<td class="webixdoc_links0"><b>hide </b></td>
			<td>(<i>boolean</i>) hides/shows a column (PRO)</td>
		</tr>
		<tr>
			<td class="webixdoc_links0"><b>label</b></td>
			<td>(<i>string</i>) specifies the title of the column</td>
		</tr>
        <tr>
			<td class="webixdoc_links0"><b>max_width</b></td>
			<td>(<i>number</i>) sets the maximum column width in case of resize operations</td>
		</tr>
        <tr>
			<td class="webixdoc_links0"><b>min_width</b></td>
			<td>(<i>number</i>) sets the minimum column width in case of resize operations</td>
		</tr>
		<tr>
			<td class="webixdoc_links0"><b>name</b></td>
			<td>(<i>string</i>) defines the column's id. The name 'add' allows you to add a column with the '+' sign</td>
		</tr>
    	<tr>
			<td class="webixdoc_links0"><b>resize </b></td>
			<td>(<i>boolean</i>) enables the possibility to resize a column by dragging the column's border (PRO)</td>
		</tr>
        <tr>
			<td class="webixdoc_links0"><b>template</b></td>
			<td>(<i>function</i>) sets a data template  </td>
		</tr>
        <tr>
			<td class="webixdoc_links0"><b>tree</b></td>
			<td>(<i>boolean</i>) indicates that the related column should display a tree</td>
		</tr>
        <tr>
			<td class="webixdoc_links0"><b>width</b></td>
			<td>(<i>number</i>) defines the width of the column</td>
		</tr>
</tbody>
</table>

<br>

The **template** attribute is a function that takes a data item object as a parameter and returns the final data template. The function definition allows you to present almost any content.

~~~js
gantt.config.columns =  [
    {name:"text",       label:"Task name",  tree:true, width:'*' },
    {name:"start_date", label:"Start time", align: "center" },
    {name:"staff",      label:"Holder(s)", template:function(obj){
                                return obj.holder+"("+obj.progress+")"} }
];
gantt.init("gantt_here");
~~~

@related:
	desktop/specifying_columns.md
@relatedsample:
	05_lightbox/02_progress_lightbox.html
grid_row_class
=============
@short:specifies the CSS class that will be applied to a grid row

@params: 
- start	Date	the date when a task is scheduled to begin
- end	Date	the date when a task is scheduled to be completed
- task	object	the task object

@example:
gantt.templates.grid_row_class = function(start, end, task){
	return "";
};

@template:	api_template
@returns:
- text		string		css class for item in question
@descr:

Every other row of the grid and the timeline area contains an extra css class named **odd** that can be used to alternate colors of rows:

~~~css
.gantt_row.odd, .gantt_task_row.odd{
	background: silver;
}

.gantt_row, .gantt_task_row {
	background: white;
}
~~~

By default, the styles will be applied only to even rows. To style odd rows, you need to add the **odd** class name to the style rule selectors. Therefore, if you want to assign the same color to all rows, you usually need to specify css rule for both selectors (with and without '.odd' class), otherwise the default css rules [becomes more specific and gets higher priority](https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity).

~~~css
.gantt_row.odd, .gantt_task_row.odd,
.gantt_row, .gantt_task_row {
{
	background: white;
}
~~~

The same works for the custom css classes which you can apply via the [grid_row_class](api/gantt_grid_row_class_template.md) and [task_row_class](api/gantt_task_row_class_template.md) templates:

{{snippet index.js}}
~~~js
gantt.templates.grid_row_class = function(start, end, task){
	return "wheat_color";
};
~~~
<br>
{{snippet index.css}}
~~~css
.wheat_color,
.wheat_color.odd{
	background:wheat;
}
~~~

If you check the [indexes of rows](api/gantt_gettaskindex.md), you may notice that the odd class is added to rows with numbers 0, 2, 4, 6, etc., instead of 1, 3, 5, etc. So, in fact, the **odd** class is applied to rows with **even** indexes instead of the opposite.

This is a mistake we made in the early days of dhtmlxGantt, and by the time it was noticed, the correction would do more harm than good by causing existing users to modify code that already works.
But, while the behavior of this class is counter-intuitive, it isn't likely to change due to backward compatibility reasons.



@related:
	desktop/table_templates.md
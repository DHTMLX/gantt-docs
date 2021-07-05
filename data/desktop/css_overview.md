CSS documentation
===========================

Grid
------------
https://docs.dhtmlx.com/gantt/desktop__table.html

https://prnt.sc/12hcaot

Overall structure:

~~~js
- .gantt_grid
	- .gantt_grid_scale
	    - .gantt_grid_head_cell
	- .gantt_grid_data
		- .gantt_row.odd 
		- .gantt_row 
		- .gantt_row.gantt_row_task
		- .gantt_row.gantt_row_project
		- .gantt_row.gantt_row_milestone
			- gantt_cell.gantt_cell_tree
			    - .gantt_tree_indent
				- .gantt_tree_icon.gantt_close
				- .gantt_tree_icon.gantt_open
				- .gantt_tree_content
			- gantt_cell
				- .gantt_tree_content
~~~

### Grid header

Grid header element: https://prnt.sc/13cipfe

- **.gantt_grid_scale**

Common background and font color for grid and timeline headers:

~~~css
.gantt_grid_scale, .gantt_task_scale, .gantt_task_vscroll {
    background-color: #eee;
}
.gantt_grid_scale, .gantt_task_scale, 
.gantt_task .gantt_task_scale .gantt_scale_cell,
.gantt_grid_scale .gantt_grid_head_cell {
    color: #000;
    font-size: 12px;
    border-bottom: 1px solid #cecece;
}
~~~

{{editor 		https://snippet.dhtmlx.com/5/4b8e365e7			Styling grid and timeline headers}}

The height of the scale must be set via the [scale_height](api/gantt_scale_height_config.md) configuration property of Gantt:

~~~js
gantt.config.scale_height = 50;
~~~

Do **not** change the height of the scale via css.

### Grid header cell:

https://prnt.sc/13ciqrz

- **.gantt_grid_head_cell**

Selector for a cell of a specific column:

- **.gantt_grid_head_cell[data-column-id='columnName']**

**columnName** matches the value of the **name** property of the [column](desktop/specifying_columns.md):

~~~js
gantt.config.columns = [
	...
	{name: "columnName", align: "center"},
	...
];
~~~

~~~css
.gantt_grid_head_cell[data-column-id='columnName'] {
    background-color: #ededed;
    color:black;
}
~~~

{{editor 		https://snippet.dhtmlx.com/5/013219d9b			Styling a particular cell in the grid header}}

Selector for a specific column by index:

- .gantt_grid_head_cell[data-column-index='1']

### Grid body

Grid body element: https://prnt.sc/13citae

- .gantt_grid_data

Row: https://prnt.sc/13ciuww

- .gantt_row

Every other row: https://prnt.sc/13cj0hd

- .gantt_row.odd

~~~css
.gantt_row.odd{
    background-color:#f4f4fb;
}
~~~

{{editor 		https://snippet.dhtmlx.com/5/e3773648c			Styling every other row in grid}}


Selected row:

- .gantt_row.gantt_selected

~~~css
.gantt_grid_data .gantt_row.gantt_selected,
.gantt_grid_data .gantt_row.odd.gantt_selected,
.gantt_task_row.gantt_selected {
    background-color: #fff3a1;
}
~~~

{{editor 		https://snippet.dhtmlx.com/5/9bdd40782			Styling selected row}}

Rows of tasks, projects or milestones:

- .gantt_row.gantt_row_task
- .gantt_row.gantt_row_project
- .gantt_row.gantt_row_milestone

~~~css
.gantt_row.gantt_row_project{
   background-color:#fafafa;
   font-weight: bold;
}
~~~

{{editor 		https://snippet.dhtmlx.com/5/9d0f8ab3f			Styling rows of project tasks}}

If you want to add styles to specific rows, you can add them a custom class using [gantt.templates.grid_row_class](api/gantt_grid_row_class_template.md) template:

~~~css
gantt.templates.grid_row_class = function(start, end, task){
	if(task.highlight){
		return "highlighted_task";
	}
	return "";
};
~~~

And use this custom class in the selector:

~~~css
.highlighted_task.gantt_row {
    background-color: #ff9668;
    border-color: rgba(0,0,0,0.3);
}
~~~

{{editor 		https://snippet.dhtmlx.com/5/f95395843			Styling a particular row in the grid}}



The height of the row can be changed using [row_height](api/gantt_row_height_config.md) config:

~~~js
gantt.config.row_height = 40;
~~~

Or via row_height property of a task:

~~~js
{ id: 2, text: "Task #1", start_date: "02-04-2018", duration: 8, row_height:40, parent: 1 },
~~~

Do not attempt changing row height via css, this will break the layout.

https://docs.dhtmlx.com/gantt/api__gantt_row_height_config.html 

https://docs.dhtmlx.com/gantt/desktop__resizing_rows.html#settingtherowheight

Cells/Columns:

- .gantt_row .gantt_cell

Specific column by column name:

- .gantt_row .gantt_cell[data-column-name='columnName']

~~~css
.gantt_grid_head_cell[data-column-id='start_date'],
.gantt_row .gantt_cell[data-column-name='start_date'] {
    background-color: #ededed;
    color:black;
}
~~~

{{editor 		https://snippet.dhtmlx.com/5/fc0a24e88			Styling a column in grid}}

Note, that `.gantt_grid_head_cell` and `.gantt_cell` use different data attributes, `data-column-id` and `data-column-name` respectively. This inconsistency in gantt css will be fixed in one of future versions.

Specific column by column index:

- .gantt_row .gantt_cell[data-column-index='1']

Timeline
-------------

https://prnt.sc/12hcz7d

https://docs.dhtmlx.com/gantt/desktop__time_scale.html

Overall structure

~~~js
- .gantt_task
	- .gantt_task_scale
		- .gantt_scale_line
			- .gantt_scale_cell
	- .gantt_data_area
		- .gantt_task_bg
			- .gantt_task_row
			- .gantt_task_row.odd
				- .gantt_task_cell
		- .gantt_links_area
			- .gantt_task_link
		- .gantt_bars_area
			- .gantt_task_line 
				- .gantt_task_progress_wrapper 
					- .gantt_task_progress 
				- .gantt_task_progress_drag 
				- .gantt_task_content 
				- .gantt_task_drag.task_start_date 
				- .gantt_task_drag.task_end_date
				- .gantt_link_control.task_start_date
				- .gantt_link_control.task_end_date
					- .gantt_link_point
		- div - custom layers
~~~

### Time scale

Structure:

~~~js
- .gantt_task_scale
	- .gantt_scale_line
		- .gantt_scale_cell
~~~

Time scale container:

- .gantt_task_scale

Changing the font color and borders of the time scale

~~~css
.gantt_grid_scale, .gantt_task_scale {
    border-bottom: 1px solid #0e0e0e;
}
  
.gantt_task .gantt_task_scale .gantt_scale_cell {
    color: #000;
}
 .gantt_grid_scale .gantt_grid_head_cell {
    color: #000;
}
~~~

http://snippet.dhtmlx.com/5/abf267d53

Single time scale:

- .gantt_scale_line

Target a specific time scale by order:

- .gantt_scale_line:nth-child(n)

Setting background color of the time scale:

~~~css
.gantt_scale_line:nth-child(1){
	font-weight:bold;
	background-color:#eee;
}
.gantt_scale_line:nth-child(2){
	background-color:#fff;
}
~~~

http://snippet.dhtmlx.com/5/5a7d1f0aa

By default there are no css classes to target time scales by units, but you can add such classes using `scale_row_class` template.

Setting different styles to **month**, **week**, **day** scales

~~~js
gantt.templates.scale_row_class = function(scale){
	return scale.unit + "_scale";
};
~~~

~~~css
.gantt_scale_line.month_scale{
	font-weight:bold;
	background-color:#eee;
}
.gantt_scale_line.day_scale{
	background-color:#fff;
}
~~~

http://snippet.dhtmlx.com/5/5eabe4823

Cells of the time scale:

- .gantt_scale_cell

Changing the font color and borders of the cells in the time scale:

~~~css
.gantt_task .gantt_task_scale .gantt_scale_cell {
    color: #a6a6a6;
    border-right: 1px solid #ebebeb;
}
~~~

http://snippet.dhtmlx.com/5/3532e30d7

In order to color specific dates, use a css property of `gantt.config.scales` objects, as described here: https://docs.dhtmlx.com/gantt/desktop__configuring_time_scale.html#styling

~~~js
gantt.config.scales = [
	{unit: "month", step: 1, format: "%Y %M"},
	{unit: "day", step: 1, format: "%l, %F %d", css: function(date){
		if(!gantt.isWorkTime({date: date, unit: "day"})){
			return "weekend";
		}
		return "";
	}}
];
~~~

CSS:

~~~css
.gantt_scale_cell.weekend {
	background-color: #F5F5F5;
}
~~~

{{sample	09_worktime/02_working_days.html}}

In order to color the whole column, use `timeline_cell_class`, as described below.

### Data area

Structure:

~~~js
- .gantt_data_area
	- .gantt_task_bg
		- .gantt_task_row
		- .gantt_task_row.odd
			- .gantt_task_cell
	- .gantt_links_area
		- .gantt_task_link
	- .gantt_bars_area
		- .gantt_task_line 
			- .gantt_task_progress_wrapper 
				- .gantt_task_progress 
			- .gantt_task_progress_drag 
			- .gantt_task_content 
			- .gantt_task_drag.task_start_date 
			- .gantt_task_drag.task_end_date
			- .gantt_link_control.task_start_date
			- .gantt_link_control.task_end_date
				- .gantt_link_point
	- div - custom layers
~~~

Task bar

- .gantt_task_line

Rows of tasks, projects or milestones:

- .gantt_task_line.gantt_bar_task
- .gantt_task_line.gantt_bar_project
- .gantt_task_line.gantt_bar_milestone

Tasks of [custom type](desktop/task_types.md#creatingacustomtype) will have the appropriate class name:

~~~js
{ id: 2, text: "Task #1", start_date: "02-04-2018", duration: 8, type:"custom_type", parent: 1 },
~~~

-->

- .gantt_task_line.gantt_bar_custom_type

Progress bar fill:

- .gantt_task_progress

Progress bar drag handle:

- .gantt_task_progress_drag

To style task borders, you can apply the **.gantt_task_line** class:

~~~css
.gantt_task_line {
    border-radius: 14px;
}
~~~

{{editor 		https://snippet.dhtmlx.com/5/a3a5bb2f5			Styling task bars}}

**Background, foreground, and progress color**:

~~~css
/* task */

/* background color of task bars*/
.gantt_task_line {
    background-color: #3db9d3;
    border: 1px solid #2898b0;
}

/* text color */
.gantt_task_line .gantt_task_content {
    color: #fff;
}

/* progress fill */
.gantt_task_progress {
    background: #299cb4;
}
~~~

**Styles of Project(Summary) bars**:

~~~css
/* project */
/* background color of project bars*/
.gantt_task_line.gantt_bar_project {
    background-color: #65c16f;
    border: 1px solid #3c9445;
}

/* progress of project bars */
.gantt_task_line.gantt_bar_project .gantt_task_progress {
    background-color: #46ad51;
}
~~~

**Styles of Milestone bars**:

~~~css
/* milestone */
.gantt_task_line.gantt_milestone {
    background-color: #d33daf;
    border: 0 solid #61164f;
}
~~~

{{editor 		https://snippet.dhtmlx.com/5/13a0a0e28			Background, foreground, and progress color. Styling Project and Milestone bars.}}

If you want to set color of specific tasks, you'll need to assign them custom class using the [gantt.templates.task_class](api/gantt_task_class_template.md) template:

~~~js
gantt.templates.task_class = function(start, end, task){
	if(task.highlight){
		return "highlighted_task";
	}
	return "";
};
~~~

And use this custom class in the selector:

~~~css
.highlighted_task.gantt_task_line {
    background-color: #ff9668;
    border-color: rgba(0,0,0,0.3);
}
.highlighted_task .gantt_task_progress {
    text-align: center;
    z-index: 0;
    background: rgba(0,0,0,0.3);
}
~~~

{{editor 		https://snippet.dhtmlx.com/5/67f3a26bb			Styling particular task bars}}

Selected bar styles:

~~~css
.gantt_task_line.gantt_selected {
    box-shadow: 0 2px 5px #000;
}

.gantt_task_line.gantt_bar_project.gantt_selected {
    box-shadow: 0 2px 5px #000;
}
~~~

{{editor 		https://snippet.dhtmlx.com/5/ed520b1a9			Styling selected bar}}

If you want to highlight custom areas inside the task bar, you'll need to inject additional elements into the bar using the `gantt.templates.task_text` template:

~~~js
gantt.templates.task_text = function(start, end, task){
	return '<div class="custom_progress warm_up" style="width:20%"></div>' +
	  '<div class="custom_progress in_progress" style="width:60%">'+task.text+'</div>'
	  '<div class="custom_progress cool_down" style="width:20%"></div>';
};
~~~

CSS:

~~~css
.custom_progress {
	display: inline-block;
	vertical-align: top;
	text-align: center;
	height: 100%;
}

.custom_progress.nearly_done {
	background-color: #4CC259;
}

.custom_progress.in_progress {
	background-color: #88BFF5;
}

.custom_progress.idle {
	background-color: #d96c49;
}
~~~

{{sample	04_customization/09_html_content.html}}

Resize element:

- .gantt_task_drag
- .gantt_task_drag.task_start_date
- .gantt_task_drag.task_end_date

Disable resizer of the start date:

~~~css
.gantt_task_line:hover .gantt_task_drag.task_start_date{
	display: none;
}
~~~

{{editor 		https://snippet.dhtmlx.com/5/8a25fe936			Disabling resizer of the start date}}

Disable resizer of the end date:

~~~css
.gantt_task_line:hover .gantt_task_drag.task_end_date{
	display: none;
}
~~~

{{editor 		https://snippet.dhtmlx.com/5/9e8c0a0aa			Disabling resizer of the end date}}


Link control:

- .gantt_link_control .gantt_link_point
- .gantt_link_control.task_start_date .gantt_link_point
- .gantt_link_control.task_end_date .gantt_link_point

Background rows:

- .gantt_task_row

every other background row:

- .gantt_task_row.odd

Selected row:

~~~css
.gantt_grid_data .gantt_row.gantt_selected,
.gantt_grid_data .gantt_row.odd.gantt_selected,
.gantt_task_row.gantt_selected {
	background-color: #fff3a1;
}
.gantt_task_row.gantt_selected .gantt_task_cell{
	border-right-color: #ffec6e;
}
~~~

{{editor 		https://snippet.dhtmlx.com/5/91cf22b1d			Styling selected row}}

Background grid:

~~~js
- .gantt_data_area
	- .gantt_task_bg
		- .gantt_task_row
		- .gantt_task_row.odd
			- .gantt_task_cell
~~~

Background rows:

- .gantt_task_row

Background cells:

- gantt_task_cell

Color rows:

~~~css
.gantt_row,
.gantt_task_row {
    border-bottom: 1px solid #ebebeb;
    background-color: #fff;
}
~~~

In order to color background columns, use `timeline_cell_class` template:

~~~js
gantt.templates.timeline_cell_class = function (task, date) {
	if(!gantt.isWorkTime({date: date, unit: "day", task: task})){
		return "weekend";
	}
	return "";
};
~~~

CSS:

~~~css
.gantt_task_cell.weekend {
	background-color: #F5F5F5;
}

.gantt_task_row.gantt_selected .gantt_task_cell.weekend {
	background-color: #F8EC9C;
}
~~~

{{sample	09_worktime/02_working_days.html}}

Link:

~~~js
- .gantt_task_link
	- .gantt_line_wrapper
	- .gantt_link_line_right
	- .gantt_link_line_left
	- .gantt_link_line_up
	- .gantt_link_line_down
- .gantt_link_arrow.gantt_link_arrow_right
- .gantt_link_arrow.gantt_link_arrow_left
~~~

Color links:

~~~css
.gantt_line_wrapper div {
    background-color: #ffa011;
}
.gantt_link_arrow_right {
    border-left-color: #ffa011;
}
.gantt_link_arrow_left {
    border-right-color: #ffa011;
}
.gantt_task_link:hover .gantt_line_wrapper div {
    box-shadow: 0 0 5px 0 #ffa011;
}
~~~

http://snippet.dhtmlx.com/5/8d0941797

Thickness of the link line is set via the `gantt.config.link_line_width` config

https://docs.dhtmlx.com/gantt/api__gantt_link_line_width_config.html

Resource panel
--------------

https://docs.dhtmlx.com/gantt/desktop__resource_management.html#resourceviewpanel

The resource panel consists of the grids and timelines similar to the main gantt area.

By default, grids and timelines of the resource view will use global templates and configs. You can use different configs and templates for the resource panel by passing them into the layout config: https://docs.dhtmlx.com/gantt/desktop__layout_config.html#configsandtemplatesofviews

You can target the resource grid and timeline using the appropriate view name in css selector:

~~~css
.resourceGrid_cell .gantt_row,
.resourceHistogram_cell .gantt_task_row {
    border-bottom: 1px solid #ebebeb;
    background-color: #fff;
}
~~~

Overall structure is the following:

~~~js
- .gantt_layout_root
	- .grid_cell 
	- .timeline_cell 
	- .resourceGrid_cell 
	- .resourceHistogram_cell 
	- .resourceTimeline_cell
~~~

Names of classes under `.gantt_layout_root` come from the layout config and match the value of the view property of layout cell:

~~~js
gantt.config.layout = {
	css: "gantt_container",
	rows: [
		{
			cols: [
				{view: "grid", group:"grids", scrollY: "scrollVer"}, // !*!
				...
			]
		},
		...
		{
			id: "resources",
			cols: [
				{ view: "resourceGrid", group:"grids", scrollY: "resourceVScroll" }, // !*!
				...
				{ view: "resourceHistogram", capacity:24, scrollX: "scrollHor", scrollY: "resourceVScroll" }, // !*!
				...
			]
		},
		...
	]
};
~~~

### Resource grid

https://prnt.sc/12hdmxb

You can use the same selectors as for the task grid, top level selector is **.resourceGrid_cell**

~~~css
.resourceGrid_cell .gantt_row,
.resourceGrid_cell .gantt_row.odd{
    background-color: rgba(232, 232, 232, 0.6);
}
~~~

### Resource histogram:

https://prnt.sc/12hdp12

Resource histogram has the same elements as the main timeline. By default, all selectors that target the main timeline will target the resource timeline as well, unless you use the layout cell class (**.timeline_cell**, **.resourceHistogram_cell**) in your selectors.

You can target the resource histogram with the following selector: **.resourceHistogram_cell**.

Overall structure

~~~js
- .gantt_task_bg
- .gantt_bars_area
	- div
		- .gantt_histogram_fill 
		- .gantt_histogram_cell 
	- div
		- .gantt_histogram_hor_bar
		- .gantt_histogram_vert_bar
~~~

Changing the color of histogram elements

~~~css
.gantt_histogram_cell {
    color: #000;
}

.gantt_histogram_label {
    font-weight: 700;
    font-size: 13px;
}

.gantt_histogram_fill {
    background-color: rgba(41,157,180,.2);
}
~~~

In order to change the color of specific cells, use `gantt.templates.histogram_cell_class` template:

~~~js
gantt.templates.histogram_cell_class = function(start_date, end_date, resource, tasks) {
	if (getAllocatedValue(tasks, resource) > getCapacity(start_date, resource)) {
		return "column_overload"
	}
};
~~~

CSS:

~~~css
.column_overload .gantt_histogram_fill {
    background-color: #ffa9a9;
}
~~~

Histogram line:

- .gantt_histogram_hor_bar, .gantt_histogram_vert_bar

Changing the color of the histogram line:

~~~css
.gantt_histogram_hor_bar, .gantt_histogram_vert_bar {
    background: #299db4;
}
~~~

### Resource diagram:

https://prnt.sc/12hdvjp

Resource diagram has the same elements as the main timeline. By default, all selectors that target the main timeline will target the resource timeline as well, unless you use the layout cell class (.timeline_cell, .resourceTimeline_cell) in your selectors.

You can target the resource diagram with the following selector: **.resourceTimeline_cell**.

Overall structure

~~~js
- .gantt_task_bg
- .gantt_bars_area
	- div
		- .gantt_resource_marker
			- div
~~~

Top level selector is **.resourceTimeline_cell**

Style for labels of the resource diagram:

~~~css
.gantt_resource_marker div {
    background: #51c185;
    width: 28px;
    height: 28px;
    line-height: 29px;
    display: inline-block;
    color: #FFF;
    margin: 3px;
}
~~~

In order to change styles of specific markers, use `gantt.templates.resource_cell_class` template:

~~~js
gantt.templates.resource_cell_class = function(start_date, end_date, resource, tasks){
	var css = [];
	css.push("resource_marker");
	if (tasks.length <= 1) {
		css.push("workday_ok");
	} else {
		css.push("workday_over");
	}
	return css.join(" ");
};
~~~

CSS:

~~~css
.resource_marker.workday_over div {
    border-radius: 3px;
    background: #ff8686;
}
~~~
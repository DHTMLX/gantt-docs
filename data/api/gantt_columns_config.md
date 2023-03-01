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


- <span class=subproperty>**align?**</span> - (*string*) - sets the horizontal title alignment. Possible values: *'left'*, *'center'*, or *'right'*
- <span class=subproperty>**hide?**</span> - (*boolean*) - hides/shows a column (PRO)
- <span class=subproperty>**label?**</span> - (*string | number*) - specifies the title of the column
- <span class=subproperty>**max_width?**</span> - (*number*) - sets the maximum column width in case of resize operations
- <span class=subproperty>**min_width?**</span> - (*number*) - sets the minimum column width in case of resize operations
- <span class=subproperty>**name?**</span> - (*string | number*) - defines the column's id. The name 'add' allows you to add a column with the '+' sign
- <span class=subproperty>**resize?**</span> - (*boolean*) - enables the possibility to resize a column by dragging the column's border (PRO)
- <span class=submethod>**template? (task): any**</span> - sets a data template
    - **_task_** - (*Task*) - the Task object
- <span class=subproperty>**tree?**</span> - (*boolean*) - indicates that the related column should display a tree
- <span class=subproperty>**width?**</span> - (*number | string*) - defines the width of the column
- <span class=submethod>**onrender? (task, node): any**</span> - optional, a callback function for rendering a cell into the DOM. The function takes a task object and the DOM element of the grid cell as parameters and may return a component of the framework. See details <a href="desktop/specifying_columns.md#modifyingcellsafterrendering">here</a>
    - **_task_** - (*Task*) - the Task object
    - **_node_** - (*HTMLElement*) - the HTML element of the Grid cell
- <span class=subproperty>**editor?**</span> - (*object*) - attached inline editor
    - **_type_** - (*string*) - the type of the inline editor
    - **_map_to_** - (*string*) - specifies which property of the task should be updated by the inline editor
    - **_min?_** - (*Date | number*) - minimal value for the date and duration types
    - **_max?_** - (*Date | number*) - maximal value for the date and duration types
    - **_options?_** - (*Array &lt;any&gt;*) - an array with the options for the select types
    - **_formatter?_** - (*DurationFormatter | LinkFormatter*) - formatter for the date and predecessor types




<br>

The width of Grid columns depends on two attributes: the **width** of the column and [grid_width](api/gantt_grid_width_config.md). If the sum of the width of columns is not equal to the width of the grid, Gantt changes one of the parameters.

- When initializing the gantt via [gantt.init()](api/gantt_init.md), the **width** of the column is a priority.
- When rendering the gantt via [gantt.render()](api/gantt_render.md), the [grid_width](api/gantt_grid_width_config.md) is a priority. <br> 
{{editor	https://snippet.dhtmlx.com/5/36b6baa89	Adjustment of column width}}
- When initializing the gantt via [gantt.init()](api/gantt_init.md) and either the width of the column is not specified or is set to **'*'**, the [grid_width](api/gantt_grid_width_config.md) is a priority. <br>{{editor	https://snippet.dhtmlx.com/5/a35378204	Adjusting column width}}

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
	desktop/how_to.md#howtoaddacustomcolumninthegrid (read how to add a custom column in the grid)
	desktop/how_to.md#howtoaddacustomaddbutton (read how to add a custom add(+) button)


@relatedsample:
	05_lightbox/02_progress_lightbox.html

@changelog: the **onrender** attribute has been added in v7.1
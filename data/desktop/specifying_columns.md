Specifying Columns
==============================================
Grid's columns are configured with the api/gantt_columns_config.md parameter. 

<img src="desktop/gantt_left.png"/>


~~~js
//default columns definition
gantt.config.columns = [
	{name:"text", 		label:"Task name", 	width:"*", tree:true },
	{name:"start_date", label:"Start time", align: "center" },
	{name:"duration", 	label:"Duration", 	align: "center" },
	{name:"add", 		label:"", 			width:44 }
];
~~~


Overviewing the default columns
---------------------------------------------

By default, the grid contains 4 columns:

1. Task name
2. Start date
3. Duration 
4. '+' column. A special column with the <code>name="add"</code> that displays the '+' sign which allows users to add childs for the task.

{{note
Note, you needn't to specify the api/gantt_columns_config.md parameter to present the default columns in the grid.
}}

Showing the WBS code of a task
------------------------

You can add a column that will display the outline numbers of tasks (their WBS code). For this, you need to use the api/gantt_getwbscode.md method in the column 
template.

~~~js
gantt.config.columns = [
	{name:"wbs", label:"WBS", width:40, template:gantt.getWBSCode }, /*!*/
	{name:"text", label:"Task name", tree:true, width:170 },
	{name:"start_date", align: "center", width: 90},
	{name:"duration", align: "center" , width: 60},
	{name:"add", width:40}
];
~~~

{{sample 07_grid/09_wbs_column.html}}

The method takes the object of a task as a parameter and returns a string with the WBS code of the task:

~~~js
var wbs_code = gantt.getWBSCode({"id":2, "text":"Task #1", "start_date":"02-04-2013", 
    "duration":"8", "parent":"1", "progress":0.5, "open": true}) // -> returns "2.1"
~~~

Setting mapping between columns and data properties
---------------------------------------
By default, dhtmlxGantt populates the grid with data properties that correspond to the IDs of the columns.
For example, if you set for a column  **<code>id ="holder"</code>**, dhtmlxGantt will look for a such data property in the incoming JSON data. And
if such a property exists, load it to the column.

If you want to present in a column the mix of several data properties, use whatever id you want but [set the data template](desktop/specifying_columns.md#settingthetemplateofdatapresentation) with the 
**template** attribute of the api/gantt_columns_config.md parameter.

Configuring the required number of columns
---------------------------------------------
The  api/gantt_columns_config.md parameter is an array, each object of which presents a single column. 
So, for example,  to define 5 columns in the grid: 'Task', 'Start Date', 'End Date', 'Holder', 'Progress', specify the api/gantt_columns_config.md parameter as in:

~~~js
//default columns definition
gantt.config.columns =  [
	{name:"text", 		label:"Task name", 	tree:true, width:'*' },
	{name:"holder", 	label:"Holder", 	align: "center" },
    {name:"start_date", label:"Start time", align: "center" },
	{name:"end_date",	label:"End date", 	align: "center" },
    {name:"progress", 	label:"Progress", 	align: "center" },
];
gantt.init("gantt_here");
~~~
where 'text', 'holder', 'start_date', 'end_date', 'progress' are [the names of the data properties](desktop/specifying_columns.md#settingmappingbetweencolumnsanddataproperties).


Setting the widths of columns
-------------------------------------------
To set the width of a column, use attribute [width](api/gantt_columns_config.md) in the related column's object:

~~~js
gantt.config.columns =  [
	{name:"text", 		label:"Task name", 	width:'*', tree:true },
	{name:"start_date", label:"Start time", width:150 },
    {name:"duration", 	label:"Duration", 	width:120 }
];
gantt.init("gantt_here");
~~~
{{note
Use the '*' value, to make the column occupy all the remaining space.
}}

Setting the text alignment in columns
-----------------------------------------
To set the horizontal alignment of the text in a column, use the [align](api/gantt_columns_config.md) attribute in the related column's object:

~~~js
gantt.config.columns =  [
	{name:"text", 		label:"Task name", 	tree:true, align:"center"},
	{name:"start_date", label:"Start time", align: "center" },
	{name:"duration",	label:"Duration", 	align: "center" }
];
gantt.init("gantt_here");
~~~


Setting the template of data presentation
-----------------------------------------------
To set a template of data presentation in a column, use the [template](api/gantt_columns_config.md) attribute in the related column's object:

~~~js
gantt.config.columns =  [
	{name:"text", 		label:"Task name", 	tree:true, width:'*' },
    {name:"start_date", label:"Start time", align: "center" },
	{name:"staff",		label:"Holder(s)", template:function(obj){
    							return obj.holder+"("+obj.progress+")"} }
];
gantt.init("gantt_here");
~~~

Hiding/showing columns
----------------------------------------------------
To manipulate the visibility of a column, use the [hide](api/gantt_columns_config.md) attribute in the related column's object.<br> 
Visibility can be toggled dynamically, by changing the value of the 'hide' property and refreshing the Gantt chart:

{{pronote This functionality available only in PRO edition }}

{{snippet
Switching between basic and detailed view}}
~~~
gantt.config.columns = [
	{name: "text", label: "Task name", width: "*", tree: true, resize: true },
    {name: "start_date", label: "Start time" },
    {name: "duration", label: "Duration", width: 60, hide:true  }, /*!*/
    {name: "planned_start", label: "Planned start", hide:true  }, /*!*/
    {name: "planned_end", label: "Planned end", width:80, hide:true  },/*!*/
    {name: "add", label: "", width: 36 }
];
 
var show_details = false;
function toggleView(){
	show_details = !show_details;
    gantt.getGridColumn("duration").hide = !show_details;
    gantt.getGridColumn("planned_start").hide = !show_details;
    gantt.getGridColumn("planned_end").hide = !show_details;
 
	if(show_details){
		gantt.config.grid_width = 600;
	}else{
    	gantt.config.grid_width = 300;
    }
    	gantt.render();
};
gantt.init("gantt_here");
~~~
{{sample
02_extensions/07_managing_grid_columns.html
}}

Resizing columns
-------------------------------------------------

{{pronote This functionality available only in PRO edition }}

To provide users a possibility to resize a column by dragging the right column's border, use the [resize](api/gantt_columns_config.md) attribute in the related column's object:
~~~js
gantt.config.columns = [
	{name:"text", tree:true, width:'*',resize:true },//-> 'resize' active
	{name:"start_date", resize:true, min_width:100 },//-> 'resize' limited with 'min_width'
	{name:"duration", align: "center" },             //-> no resize
	{name:"add", width:'44' }
];
~~~
{{sample
02_extensions/04_grid_resize.html
}}


To make the whole grid resizable by dragging the grid's border, set the api/gantt_grid_resize_config.md option to true:

~~~js
gantt.config.columns = [
	{ name:"text", tree:true, width:"*", resize:true },
	{ name:"start_date", align: "center"},
	{ name:"duration", align: "center", width:70 },
	{ name:"add", width:44 }
];

gantt.config.grid_resize = true; /*!*/
gantt.config.min_grid_column_width = 100; // the minimum width of the grid while resizing
gantt.init("gantt_here");
~~~
{{sample
02_extensions/04_grid_resize.html
}}


To preserve the grid's size during resizing of columns, set the api/gantt_keep_grid_width_config.md option to true:

~~~js
gantt.config.columns = [
	{ name:"text", tree:true, width:"*", resize:true },
	{ name:"start_date", align: "center"},
	{ name:"duration", align: "center", width:70 },
	{ name:"add", width:44 }
];

gantt.config.keep_grid_width = true; /*!*/
gantt.init("gantt_here");
~~~
{{sample
02_extensions/04_grid_resize.html
}}


###Events
dhtmlxGantt provides 6 events for handling the resizing behaviour: 

- api/gantt_oncolumnresizestart_event.md - fires before the user starts to drag the column's border to resize the column
- api/gantt_oncolumnresize_event.md - fires when the user is dragging the column's border to resize the column
- api/gantt_oncolumnresizeend_event.md - fires after the user finished dragging the column's border to resize the column

<br>

- api/gantt_ongridresizestart_event.md - fires before the user starts to drag the grid's border to resize the grid
- api/gantt_ongridresize_event.md - fires when the user is dragging the grid's border to resize the grid
- api/gantt_ongridresizeend_event.md - fires after the user finished dragging the grid's border to resize the grid


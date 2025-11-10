Work with Gantt Styles
=========================

dhtmlxGantt provides you with a wide set of options for modifying its appearance. You can both [change the general look of the Gantt chart by using one of the predefined skins](desktop/skins.md)
and adjust the styles of separate elements (tasks, links, scale, grid, etc.) of the component.  

In this guide general instructions on working with styles of Gantt parts are collected together to facilitate your wandering through the documentation. 
Detailed information for each particular element is provided in the related articles.


Styling Grid
------------------

You can change the style of the grid area via the related desktop/table_templates.md.

### Headers of the grid columns

There is a api/gantt_grid_header_class_template.md template that allows you to apply a custom style to the headers of the grid columns. For example, you can change the background color of certain headers of the grid columns in the following way:

~~~js
<style>
	.gantt-grid__header--highlighted {
		background-color: #ffeb8a !important;
	}
</style>
~~~

~~~js
gantt.templates.grid_header_class = (columnName) =>
	(columnName === 'duration' || columnName === 'text')
		? 'gantt-grid__header--highlighted'
		: '';
~~~

<img src="desktop/styling_columns_headers.png">

{{editor		https://snippet.dhtmlx.com/j01gqhtj		Styling Headers of Grid Columns}}

### Custom elements in the grid header

It is possible to add custom elements (such as buttons, icons, inputs, etc.) into the header of the grid. To add an element, you need to set its HTML as the value of the **label** property inside the 
[**gantt.config.columns**](api/gantt_columns_config.md) configuration option:

~~~js
gantt.config.columns = [
	{
		name: "text",
		label: ` /*!*/
			<div class="gantt-grid__header-search-wrapper"> /*!*/
				Task name  /*!*/
				<input id="task-search" type="text" placeholder="Search tasks..."> /*!*/
			</div> /*!*/
		`, /*!*/
		width: 250, tree: true
	},
	// other columns
];
~~~

The implementation of the search functionality looks like this:

~~~js 
const taskSearchInput = document.getElementById('task-search');

taskSearchInput.addEventListener('input', () => {
	gantt.refreshData();
});

function hasSubstring(parentId, searchValue) {
	const task = gantt.getTask(parentId);
	if (!task) return false;

	if (task.text.toLowerCase().includes(searchValue)) {
		return true;
	}

	const children = gantt.getChildren(parentId);
	for (let i = 0; i < children.length; i++) {
		if (hasSubstring(children[i], searchValue)) {
			return true;
		}
	}

	return false;
}

gantt.attachEvent('onBeforeTaskDisplay', (id) => {
	const searchValue = taskSearchInput.value.toLowerCase().trim();
	if (!searchValue) return true;
	return hasSubstring(id, searchValue);
});
~~~

<img src="desktop/custom_elements_grid_header.png">

{{editor 		https://snippet.dhtmlx.com/8jilpcrg			Custom Elements in Grid Header}}

#### Icons and images in the grid header

To add an image or an icon into the header, you can also put it into the inner HTML of the cell using the **label** property:

~~~js
const textLabel = `
	<div class="gantt-grid__header-label">
		<img src="http://docs.dhtmlx.com/scheduler/assets/index/icon1.png" alt="icon">
		<span>Text</span>
	</div>
`;

gantt.config.columns = [
	{ name: "text", label: textLabel, tree: true, width: "*", resize: true },
	{ name: "start_date", align: "center", resize: true },
	{ name: "duration", align: "center" },
	{ name: "add", width: 44 }
];
~~~

{{editor	https://snippet.dhtmlx.com/10y58pbv	Images in Grid Header: Columns Config}}

Alternatively, you can set a header cell in CSS using the **.gantt_grid_head_<columnName>** selector:

~~~css
.gantt_grid_head_text {
	background-image: url("http://docs.dhtmlx.com/scheduler/assets/index/icon1.png");
	background-repeat: no-repeat;
}
~~~

<img src="desktop/custom_elements_grid_header_image.png">

{{editor	https://snippet.dhtmlx.com/gvcsrpmb	Images in Grid Header:CSS}}

### Multiline text in the grid header

Follow the example shown in the [How to display several lines in the grid cell/header](desktop__how_to.html#howtodisplayseverallinesinthegridcellheader) section.

###Background color of the grid rows 

You can apply a custom color for all or separate grid rows with tasks via the api/gantt_grid_row_class_template.md template. For example, you can change the background color of a particular row like this:

~~~js
<style>
	.gantt-grid__row--highlight {
		background-color: #ffeb8a !important;
	}
</style>
~~~

~~~js
gantt.templates.grid_row_class = (start, end, task) =>
	task.id === 3 ? "gantt-grid__row--highlight" : "";
~~~

<img src="desktop/grid_row_bg.png">

{{editor	https://snippet.dhtmlx.com/y0dbph4x			Coloring Grid Rows}}

### Color of the grid rows on hover

You can highlight the grid row on hover by applying the following style rules:

~~~js
.gantt_grid_data .gantt_row.odd:hover, .gantt_grid_data .gantt_row:hover,
.gantt_grid_data .gantt_row.gantt_selected,
.gantt_grid_data .gantt_row.odd.gantt_selected,
.gantt_task_row.gantt_selected {
	background-color: cyan; 
}
~~~

<img src="desktop/grid_row_hover_color.png">

{{editor	https://snippet.dhtmlx.com/730ig4ck	Coloring Grid Rows on Hover}}

<h3 id="customizationgridcolumns">Customization of the grid columns</h3>

dhtmlxGantt provides the possibility to modify the default appearance of the grid columns via the **template** attribute of the [**gantt.config.columns**](api/gantt_columns_config.md) configuration option.

The **template** attribute is a function that takes a data item object as a parameter and returns the final data template. The function definition allows you to present almost any content. For example, you can
change the default color of the text in grid rows, or use custom elements in grid columns.

####Text color in the grid rows

You can define a special color for the text of tasks depending on their priority as in:

~~~js
gantt.config.columns = [
	{ name: "text", label: "Task name", tree: true, width: 230,
		template: gridTaskTextTemplate  /*!*/
	},
	{ name: "start_date", label: "Start time", align: "center" },
	{ name: "duration", label: "Duration", align: "center" }
];

function gridTaskTextTemplate (task) {
	const text = `${task.text} (${task.users})`;
	if (task.priority === 1) {
		return `<div class="gantt-grid__text--important">${text}</div>`;
	}
	return text;
}
~~~

<img src="desktop/columns_text_color.png">

{{sample	04_customization/05_tree_template.html}}


####Custom elements in the grid columns

To add a custom element, such as a button, an input, etc. into the grid columns, you should set the HTML of the element as the value of the **template** attribute of the column:

~~~js
function gridColumnTemplate (task) {
	return `
		<i class="fa fa-pencil" onclick="clickGridButton(${task.id}, 'edit')"></i>
		<i class="fa fa-plus" onclick="clickGridButton(${task.id}, 'add')"></i>
		<i class="fa fa-times" onclick="clickGridButton(${task.id}, 'delete')"></i>
	`;
}

gantt.config.columns = [
	{ name: "text", tree: true, width: "*", resize: true },
	{ name: "start_date", align: "center", resize: true },
	{ name: "duration", align: "center" },
	{ name: "buttons", width: 75, label: gridColumnHeaderTemplate,
		template: gridColumnTemplate /*!*/
	}
];
~~~

<img src="desktop/custom_elements_grid_columns.png">

{{sample  07_grid/07_custom_buttons.html}}

#### Multiline text in grid cells

Follow the examples shown in the [How to display several lines in the grid cell/header](desktop__how_to.html#howtodisplayseverallinesinthegridcellheader) section.

Styling Scale
------------

The scale styling is defined by the related [templates of the timeline area](desktop/timeline_templates.md).

###Scale row

You can style the row of the scale with the help of the **scale_row_class** template. For example, define the background color:

~~~js
<style>
	.gantt-scale__row--highlight {
		background-color: #ffeb8a !important;
	}
</style>
~~~

~~~js
gantt.templates.scale_row_class = (scale) => "gantt-scale__row--highlight";
~~~

<img src="desktop/color_scale_row.png">
 
{{editor	https://snippet.dhtmlx.com/7ngm6yzk		Styling Row of the Scale}}

###Scale cells 

It is also possible to style certain cells of the scale via the **scale_cell_class** template. For example, you can color particular days of the timeline area:

~~~js
<style>
	.gantt-scale__cell--highlight {
		background-color: #ffeb8a !important;
	}
</style>
~~~

~~~js
gantt.templates.scale_cell_class = date =>
	date.getDay() === 0 || date.getDay() === 6 ? "gantt-scale__cell--highlight" : "";
~~~

<img src="desktop/styling_scale_cells.png">

{{editor	https://snippet.dhtmlx.com/emdjgwln		Styling Separate Cells on the Scale}}

Read more in the related articles: desktop/configuring_time_scale.md#settingthescalesstyle and desktop/highlighting_time_slots.md.

###Subscale

You can specify a new style for a scale via the **css** attribute of the api/gantt_scales_config.md property. For example, you can set a specific color for the weekends as follows:

~~~js
<style type="text/css">
	.gantt-scale__cell--weekend {
		background-color: #F0DFE5 !important;
	}
</style>
~~~

~~~js
const isWeekendStyle = (date) => {
	const day = gantt.date.day_start(date).getDay();
	return (day === 0 || day === 6) ? "gantt-scale__cell--weekend" : "";
};

gantt.config.scales = [
	// other scales
	{ unit: "day", format: "%D", css: isWeekendStyle }
];
~~~

<img src="desktop/styling_subscale.png">

{{sample 03_scales/01_multiple_scales.html}}

Styling Tasks
----------------

You can change the styling of tasks via the corresponding [templates of the timeline area](desktop/timeline_templates.md).

###Task bar

You can redefine the api/gantt_task_class_template.md template to refresh the styles of a task. 
You can find the details in the article desktop/colouring_tasks.md#redefiningthetaskstemplate.

~~~js
gantt.templates.task_class = (start, end, task) => "";
~~~

<img src="desktop/coloring_tasks.png">

{{sample 04_customization/04_task_styles.html}}

Templates allow applying styles dynamically. For example, you can change colors depending on the progress of the task:

~~~js
gantt.templates.task_class = (start, end, task) =>
	task.progress > 0.5 ? "" : "task--low-progress";
~~~

<img src="desktop/dynamic_styling.png">

{{sample 04_customization/08_templates.html}}


###Task bar text

The api/gantt_task_text_template.md template allows using inline styles to change the style of the task bar text:

~~~js
gantt.templates.task_text = (start, end, task) =>
	task.id === 12 ? `<span style="color:red">${task.text}</span>` : task.text;
~~~

<img src="desktop/inline_styling_task_text.png">

{{editor		https://snippet.dhtmlx.com/us1g45wg		Inline Styling of the Task Text}}

#### Multiline text

Follow the [example](https://snippet.dhtmlx.com/55uy7ibo) shown in the [How to display several lines in the grid cell/header](desktop__how_to.html#howtodisplayseverallinesinthegridcellheader) section.

###Custom elements in task bars

You can insert custom elements into task bars via the api/gantt_task_text_template.md template as well. For example, you can add buttons into task bars in the following way:

~~~js
gantt.templates.task_text = (start, end, task) => `${task.text} <button>Text</button>`;
~~~

<img src="desktop/custom_elements_task_bars.png">

{{editor	https://snippet.dhtmlx.com/fahpyr58  	Custom Elements in Task Bars}}

###Setting style via properties of a task object

You can set additional properties in the task object configuration to define a custom color for a task. They are: **color**, **textColor** and **progressColor**.

~~~js
const data = {
	tasks: [
		{ id: 1, text: "Task #1", start_date: "01-04-2026", duration: 2, color:"red" },
		{ id: 2, text: "Task #2", start_date: "02-04-2026", duration: 3, color:"blue" }
	]
};

gantt.init("gantt_here");
gantt.parse(data);

const task = gantt.getTask(2);
task.color = "red";
~~~

Read the related section of the desktop/colouring_tasks.md#specifyingstyleinthepropertiesofataskobject article to get the details.

###Styling task bars via the lightbox

You can define a set of predefined colors and specify them as options in the lightbox configuration to set the text or background color of a task:

~~~js
const colors = [
	{ key: "", label: "Default" },
	{ key: "#4B0082", label: "Indigo" },
	{ key: "#FFFFF0", label: "Ivory" },
	{ key: "#F0E68C", label: "Khaki" }
	// more colors
];

gantt.config.lightbox.sections = [
	{ name: "description", height: 38, map_to: "text", type: "textarea", focus: true },
	{ name: "priority", height: 22, map_to: "color", type: "select", options: colors },
	{ name: "textColor", height: 22, map_to: "textColor", type: "select",
		options: colors
	},
	{ name: "time", type: "duration", map_to: "auto" }
];
~~~

<img src="desktop/task_style_property.png">

{{sample 04_customization/16_inline_task_colors.html}}

###Rows of the timeline area

The api/gantt_task_row_class_template.md template allows you to change the color of the rows of the timeline area (those lying behind the Gantt tasks).

~~~js
<style>
	.gantt-timeline__row--highlight {
		background-color: #ffeb8a !important;
	}
</style>
~~~

~~~js
gantt.templates.task_row_class = (start, end, task) =>
	task.id === 3 ? "gantt-timeline__row--highlight" : "";
~~~

<img src="desktop/styling_timeline_row.png">

{{editor	https://snippet.dhtmlx.com/33jfmwsp		Styling Rows of the Timeline Area}}

{{sample	04_customization/02_custom_tree.html}}


###Highlighting timeline cells

You can highlight the necessary timeline cells, depending on the day of the week with the **timeline_cell_class** template. The template function will iterate over the cells and apply the desired CSS
class to the specified cells. For example, you can highlight weekends as in:

~~~js
<style>
	.gantt-timeline__cell--weekend {
		background-color: #f4f7f4;
	}
</style>
~~~

~~~js
gantt.templates.timeline_cell_class = (task, date) =>
	(date.getDay() === 0 || date.getDay() === 6) ? "gantt-timeline__cell--weekend" :"";
~~~

<img src="desktop/styling_timeline_cells.png">

{{sample	04_customization/06_highlight_weekend.html}}

Read more on this topic in the article desktop/highlighting_time_slots.md.

###Showing external elements (baselines, deadlines, etc.)

{{pronote This functionality is available only in the PRO edition. }}


You can display additional elements, such as baseline or deadline markers in the Gantt. For this you need to create a new displayable layer via the api/gantt_addtasklayer.md method and place custom elements there.
As a parameter, the method takes a function that takes a task object and returns either a DOM element that will be displayed, or *false* (the element for a task should be hidden):

~~~js
gantt.addTaskLayer(function createTaskLayerElement(task) {
	const layerElement = document.createElement('div');
	// your code here
	return layerElement;
});
~~~

Read more about displaying external elements in Gantt in the article desktop/baselines.md.

###Tooltips for tasks

You can provide tooltips for tasks to show their details in a compact way.

<img src="desktop/default_task_tooltip.png">

Default tooltips are automatically displayed for tasks, once you activate the [tooltip](desktop/extensions_list.md#tooltip) plugin. 

####Custom text for tooltips

To set a custom text for tooltips, use the api/gantt_tooltip_text_template.md template:

~~~js
gantt.templates.tooltip_text = (start, end, task) =>
	`<b>Task:</b> ${task.text}<br/><b>Duration:</b> ${task.duration}`;
~~~

More information about tooltips in Gantt is given in the article desktop/tooltips.md.

Styling Links
--------------

You can change the style of the dependency links via the related desktop/dependency_templates.md.

###Lines of dependency links

You can change the color of the dependency line via the api/gantt_link_class_template.md template.

~~~js
gantt.templates.link_class = (link) => "";
~~~

<img src="desktop/coloring_links.png">

{{sample  04_customization/03_link_styles.html}}


There is more information in the related article desktop/colouring_lines.md.

###Coloring links via the property of a link object

You can also set a custom color for a dependency link by specifying the **color** property in the link object:

~~~js
const data = {
	tasks: [
		// tasks configuration
	],
	links: [
		{ id: 1, source: 1, target: 2, type: "1", color: "red" },
		{ id: 2, source: 2, target: 3, type: "0", color: "blue" }
	]
};

gantt.init("gantt_here");
gantt.parse(data);

gantt.getLink(2).color = "blue";
~~~

Read the related section of the desktop/colouring_lines.md#specifyingcolorinthepropertiesofthelinkobject article to get the details.

### Link color on hover

It is possible to modify the color of a link on hover via CSS:

~~~js
.gantt_task_link:hover .gantt_line_wrapper div {
	box-shadow: 0 0 5px 0 yellowgreen;
	background: yellowgreen
}

.gantt_task_link:hover .gantt_link_arrow_left,
.gantt_task_link:hover .gantt_link_arrow_right {
	border-left-color: yellowgreen !important;
	border-right-color: yellowgreen !important;
}
~~~

{{editor	https://snippet.dhtmlx.com/z3friavt	Link color on hover}}

<img src="desktop/link_hover_color.png">

For more information, see the related article desktop/colouring_lines.md.

###Popups of dependency links

The api/gantt_drag_link_class_template.md template allows styling the popup that appears when a user starts dragging a dependency line between tasks. For example, you can color the background of the popup and change the color of the popup text:

~~~js
<style>
	.gantt_link_tooltip {
		color: red;
		background-color: yellow;
	}
</style>
~~~


~~~js
gantt.templates.drag_link_class = (from, from_start, to, to_start) =>
	`gantt_link_tooltip`;
~~~

<img src="desktop/styling_link_popup.png">

{{editor	https://snippet.dhtmlx.com/7o5f261z		Styling the Popup of Dependency Link}}

Check the desktop/dependency_templates.md article to get more details on the topic.

###Editing link values from UI

While there are lightboxes for editing and styling tasks bars, there is no built-in UI for editing links provided. Nevertheless, you can create such a UI yourself by implementing the technique described in the 
[dedicated article](desktop/crud_dependency.md#editinglinkvaluesfromui).

<img src="desktop/link_edit_ui.png">

{{editor	https://snippet.dhtmlx.com/2208ic0t		Custom UI for Editing Link Values}}

Styling Quick Info Popup
-------------------

The styling of the Quick Info popup is defined via the desktop/touch_templates.md templates.

You can apply the necessary style to the pop-up edit form by the api/gantt_quick_info_class_template.md template. For example, you can style quick info popups for
particular tasks as follows:

~~~js
<style>
	.quick-info-highlight {
		background-color: #ffeb8a !important;
	}
	.quick-info-highlight .gantt_cal_qi_title {
		background-color: #ffeb8a !important;
	}
</style>
~~~

~~~js
gantt.templates.quick_info_class = (start, end, task) =>
	task.id === "2" ? "quick-info-highlight" : "";
~~~

<img src="desktop/styling_quick_info.png">

{{editor			https://snippet.dhtmlx.com/b92gyqwu			Styling Quick Info Popup}}



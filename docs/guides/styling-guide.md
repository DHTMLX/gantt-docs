---
title: "Work with Gantt Styles"
sidebar_label: "Work with Gantt Styles"
---

# Work with Gantt Styles

dhtmlxGantt provides you with a wide set of options for modifying its appearance. You can both [change the general look of the Gantt chart by using one of the predefined skins](guides/skins.md)
and adjust the styles of separate elements (tasks, links, scale, grid, etc.) of the component. 

In this guide general instructions on working with styles of Gantt parts are collected together to facilitate your wandering through the documentation. 
Detailed information for each particular element is provided in the related articles.


## Styling Grid

You can change the style of the grid area via the related [Templates of the Grid](guides/table-templates.md).

### Headers of the grid columns

There is a [grid_header_class](api/template/grid_header_class.md) template that allows you to apply a custom style to the headers of the grid columns. For example, you can change the background color of certain headers of the grid columns in the following way:

~~~jsx
<style>
    .gantt-grid__header--highlighted {
        background-color: #ffeb8a !important;
    }
</style>

gantt.templates.grid_header_class = (columnName) =>
    (columnName === 'duration' || columnName === 'text')
        ? 'gantt-grid__header--highlighted'
        : '';
~~~

![styling_columns_headers](/img/styling_columns_headers.png)

**Related sample**: [Styling Headers of Grid Columns](https://snippet.dhtmlx.com/j01gqhtj)

### Custom elements in the grid header

It is possible to add custom elements (such as buttons, icons, inputs, etc.) into the header of the grid. To add an element, you need to set its HTML as the value of the **label** property inside the 
[**gantt.config.columns**](api/config/columns.md) configuration option:

~~~jsx
gantt.config.columns = [
    {
        name: "text",
        label: `<div class="gantt-grid__header-search-wrapper">Task name
                    <input id="task-search" type="text" placeholder="Search tasks...">
                </div>`, 
        width: 250, tree: true
    },
    // other columns
];
~~~

The implementation of the search functionality looks like this:

~~~jsx 
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

![custom_elements_grid_header](/img/custom_elements_grid_header.png)

**Related sample**: [Custom Elements in Grid Header](https://snippet.dhtmlx.com/8jilpcrg)

#### Icons and images in the grid header

To add an image or an icon into the header, you can also put it into the inner HTML of the cell using the **label** property:

~~~jsx
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

**Related sample**: [Images in Grid Header: Columns Config](https://snippet.dhtmlx.com/10y58pbv)

Alternatively, you can set a header cell in CSS using the **.gantt_grid_head_\<columnName\>** selector:

~~~css
.gantt_grid_head_text {
    background-image: url("http://docs.dhtmlx.com/scheduler/assets/index/icon1.png");
    background-repeat: no-repeat;
}
~~~

![custom_elements_grid_header_image](/img/custom_elements_grid_header_image.png)

**Related sample**: [Images in Grid Header:CSS](https://snippet.dhtmlx.com/gvcsrpmb)

### Multiline text in the grid header

Follow the example shown in the [How to display several lines in the grid cell/header](guides/how-to.md#how-to-display-several-lines-in-the-grid-cellheader) section.

### Background color of the grid rows 

You can apply a custom color for all or separate grid rows with tasks via the [grid_row_class](api/template/grid_row_class.md) template. For example, you can change the background color of a particular row like this:

~~~jsx
<style>
    .gantt-grid__row--highlight {
        background-color: #ffeb8a !important;
    }
</style>

gantt.templates.grid_row_class = (start, end, task) =>
    task.id === 3 ? "gantt-grid__row--highlight" : "";
~~~

![grid_row_bg](/img/grid_row_bg.png)

**Related sample**: [Coloring Grid Rows](https://snippet.dhtmlx.com/y0dbph4x)

### Color of the grid rows on hover

You can highlight the grid row on hover by applying the following style rules:

~~~css
.gantt_grid_data .gantt_row.odd:hover, .gantt_grid_data .gantt_row:hover,
.gantt_grid_data .gantt_row.gantt_selected,
.gantt_grid_data .gantt_row.odd.gantt_selected,
.gantt_task_row.gantt_selected {
    background-color: cyan; 
}
~~~

![grid_row_hover_color](/img/grid_row_hover_color.png)

**Related sample**: [Coloring Grid Rows on Hover](https://snippet.dhtmlx.com/730ig4ck)

### Customization of the grid columns {#customizationgridcolumns}

dhtmlxGantt provides the possibility to modify the default appearance of the grid columns via the **template** attribute of the [**gantt.config.columns**](api/config/columns.md) configuration option.

The **template** attribute is a function that takes a data item object as a parameter and returns the final data template. The function definition allows you to present almost any content. For example, you can
change the default color of the text in grid rows, or use custom elements in grid columns.

#### Text color in the grid rows

You can define a special color for the text of tasks depending on their priority as in:

~~~jsx
gantt.config.columns = [
    { name: "text", label: "Task name", tree: true, width: 230,
        template: gridTaskTextTemplate 
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

![columns_text_color](/img/columns_text_color.png)


**Related sample**: [Template for tree nodes](https://docs.dhtmlx.com/gantt/samples/04_customization/05_tree_template.html)

#### Custom elements in the grid columns

To add a custom element, such as a button, an input, etc. into the grid columns, you should set the HTML of the element as the value of the **template** attribute of the column:

~~~jsx
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

![custom_elements_grid_columns](/img/custom_elements_grid_columns.png)


**Related sample**: [Custom Buttons in a Grid](https://docs.dhtmlx.com/gantt/samples/07_grid/07_custom_buttons.html)


#### Multiline text in grid cells

Follow the examples shown in the [How to display several lines in the grid cell/header](guides/how-to.md#how-to-display-several-lines-in-the-grid-cellheader) section.

## Styling Scale

The scale styling is defined by the related [templates of the timeline area](guides/timeline-templates.md).

### Scale row

You can style the row of the scale with the help of the **scale_row_class** template. For example, define the background color:

~~~jsx
<style>
    .gantt-scale__row--highlight {
        background-color: #ffeb8a !important;
    }
</style>
~~~

~~~jsx
gantt.templates.scale_row_class = (scale) => "gantt-scale__row--highlight";
~~~

![color_scale_row](/img/color_scale_row.png)
 
**Related sample**: [Styling Row of the Scale](https://snippet.dhtmlx.com/7ngm6yzk)

### Scale cells 

It is also possible to style certain cells of the scale via the **scale_cell_class** template. For example, you can color particular days of the timeline area:

~~~jsx
gantt.templates.scale_cell_class = date =>
    date.getDay() === 0 || date.getDay() === 6 ? "gantt-scale__cell--highlight" : "";
~~~

![styling_scale_cells](/img/styling_scale_cells.png)

**Related sample**: [Styling Separate Cells on the Scale](https://snippet.dhtmlx.com/emdjgwln)

Read more in the related articles: [Setting up Scale](guides/configuring-time-scale.md#styling) and [Highlighting Time Slots](guides/highlighting-time-slots.md).

### Subscale

You can specify a new style for a scale via the **css** attribute of the [scales](api/config/scales.md) property. For example, you can set a specific color for the weekends as follows:

~~~jsx
<style type="text/css">
    .weekend{
        background: #F0DFE5 !important;
    }
</style>
~~~

~~~jsx
const isWeekendStyle = (date) => {
    const day = gantt.date.day_start(date).getDay();
    return (day === 0 || day === 6) ? "gantt-scale__cell--weekend" : "";
};

gantt.config.scales = [
    // other scales
    { unit: "day", format: "%D", css: isWeekendStyle }
];
~~~

![styling_subscale](/img/styling_subscale.png)


**Related sample**: [Multiple scales](https://docs.dhtmlx.com/gantt/samples/03_scales/01_multiple_scales.html)


## Styling Tasks

You can change the styling of tasks via the corresponding [templates of the timeline area](guides/timeline-templates.md).

### Task bar

You can redefine the [task_class](api/template/task_class.md) template to refresh the styles of a task. 
You can find the details in the article [Tasks Coloring](guides/colouring-tasks.md#redefiningthetaskstemplate).

~~~jsx
gantt.templates.task_class = (start, end, task) => "";
~~~

![coloring_tasks](/img/coloring_tasks.png)


**Related sample**: [Task styles](https://docs.dhtmlx.com/gantt/samples/04_customization/04_task_styles.html)


Templates allow applying styles dynamically. For example, you can change colors depending on the progress of the task:

~~~jsx
gantt.templates.task_class = (start, end, task) =>
    task.progress > 0.5 ? "" : "task--low-progress";
~~~

![dynamic_styling](/img/dynamic_styling.png)


**Related sample**: [Styling task bars with events](https://docs.dhtmlx.com/gantt/samples/04_customization/08_templates.html)


### Task bar text

The [task_text](api/template/task_text.md) template allows using inline styles to change the style of the task bar text:

~~~jsx
gantt.templates.task_text = (start, end, task) =>
    task.id === 12 ? `<span style="color:red">${task.text}</span>` : task.text;
~~~

![inline_styling_task_text](/img/inline_styling_task_text.png)

**Related sample**: [Inline Styling of the Task Text](https://snippet.dhtmlx.com/us1g45wg)

#### Multiline text

Follow the [example](https://snippet.dhtmlx.com/55uy7ibo) shown in the [How to display several lines in the grid cell/header](guides/how-to.md#how-to-display-several-lines-in-the-grid-cellheader) section.

### Custom elements in task bars

You can insert custom elements into task bars via the [task_text](api/template/task_text.md) template as well. For example, you can add buttons into task bars in the following way:

~~~jsx
gantt.templates.task_text = (start, end, task) => `${task.text} <button>Text</button>`;  
~~~

![custom_elements_task_bars](/img/custom_elements_task_bars.png)

**Related sample**: [Custom Elements in Task Bars](https://snippet.dhtmlx.com/fahpyr58)

### Setting style via properties of a task object

You can set additional properties in the task object configuration to define a custom color for a task. They are: **color**, **textColor** and **progressColor**.

~~~jsx
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

Read the related section of the [Tasks Coloring](guides/colouring-tasks.md#specifyingstyleinthepropertiesofataskobject) article to get the details.

### Styling task bars via the lightbox

You can define a set of predefined colors and specify them as options in the lightbox configuration to set the text or background color of a task:

~~~jsx
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

![task_style_property](/img/task_style_property.png)


**Related sample**: [Specify inline colors for Tasks and Links](https://docs.dhtmlx.com/gantt/samples/04_customization/16_inline_task_colors.html)


### Rows of the timeline area

The [task_row_class](api/template/task_row_class.md) template allows you to change the color of the rows of the timeline area (those lying behind the Gantt tasks).

~~~jsx
<style>
    .gantt-timeline__row--highlight {
        background-color: #ffeb8a !important;
    }
</style>

gantt.templates.task_row_class = (start, end, task) =>
    task.id === 3 ? "gantt-timeline__row--highlight" : "";
~~~

![styling_timeline_row](/img/styling_timeline_row.png)

**Related sample**: [Styling Rows of the Timeline Area](https://snippet.dhtmlx.com/33jfmwsp)


**Related sample**: [Custom tree formatting](https://docs.dhtmlx.com/gantt/samples/04_customization/02_custom_tree.html)


### Highlighting timeline cells

You can highlight the necessary timeline cells, depending on the day of the week with the **timeline_cell_class** template. The template function will iterate over the cells and apply the desired CSS
class to the specified cells. For example, you can highlight weekends as in:

~~~jsx
<style>
    .gantt-timeline__cell--weekend {
        background-color: #f4f7f4;
    }
</style>

gantt.templates.timeline_cell_class = (task, date) =>
    (date.getDay() === 0 || date.getDay() === 6) ? "gantt-timeline__cell--weekend" :"";
~~~

![styling_timeline_cells](/img/styling_timeline_cells.png)


**Related sample**: [Highlighting weekends](https://docs.dhtmlx.com/gantt/samples/04_customization/06_highlight_weekend.html)


Read more on this topic in the article [Highlighting Time Slots](guides/highlighting-time-slots.md).

### Showing external elements (baselines, deadlines, etc.)

:::note
This functionality is available only in the PRO edition.
:::


You can display additional elements, such as baseline or deadline markers in the Gantt. For this you need to create a new displayable layer via the [addTaskLayer](api/method/addtasklayer.md) method and place custom elements there.
As a parameter, the method takes a function that takes a task object and returns either a DOM element that will be displayed, or *false* (the element for a task should be hidden):

~~~jsx
gantt.addTaskLayer(function createTaskLayerElement(task) {
    const layerElement = document.createElement('div');
    // your code here
    return layerElement;
});
~~~

Examples of external elements are:

- baselines

![show_baselines](/img/show_baselines.png)


**Related sample**: [Display baselines](https://docs.dhtmlx.com/gantt/samples/04_customization/15_baselines.html)


- deadlines

![show_deadlines](/img/show_deadlines.png)


**Related sample**: [Displaying deadlines](https://docs.dhtmlx.com/gantt/samples/04_customization/14_deadline.html)


Read more about displaying external elements in Gantt in the article [Custom Elements in Timeline Area](guides/baselines.md).

### Tooltips for tasks

You can provide tooltips for tasks to show their details in a compact way.

![default_task_tooltip](/img/default_task_tooltip.png)

Default tooltips are automatically displayed for tasks, once you activate the [tooltip](guides/extensions-list.md#tooltip) plugin. 

#### Custom text for tooltips

To set a custom text for tooltips, use the [tooltip_text](api/template/tooltip_text.md) template:

~~~jsx
gantt.templates.tooltip_text = (start, end, task) =>
    `<b>Task:</b> ${task.text}<br/><b>Duration:</b> ${task.duration}`;
~~~

More information about tooltips in Gantt is given in the article [Tooltips for Gantt Elements](guides/tooltips.md).

## Styling Links

You can change the style of the dependency links via the related [Templates of Dependency Links](guides/dependency-templates.md).

### Lines of dependency links

You can change the color of the dependency line via the [link_class](api/template/link_class.md) template.

~~~jsx
gantt.templates.link_class = (link) => "";
~~~

![coloring_links](/img/coloring_links.png)


**Related sample**: [Link styles](https://docs.dhtmlx.com/gantt/samples/04_customization/03_link_styles.html)


There is more information in the related article [Links Coloring and Styling](guides/colouring-lines.md).

### Coloring links via the property of a link object

You can also set a custom color for a dependency link by specifying the **color** property in the link object:

~~~jsx
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

Read the related section of the [Links Coloring and Styling](guides/colouring-lines.md#specifyingcolorinthepropertiesofthelinkobject) article to get the details.

### Link color on hover

It is possible to modify the color of a link on hover via CSS:

~~~css
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

**Related sample**: [Link color on hover](https://snippet.dhtmlx.com/z3friavt)

![link_hover_color](/img/link_hover_color.png)

For more information, see the related article [Links Coloring and Styling](guides/colouring-lines.md).

### Popups of dependency links

The [drag_link_class](api/template/drag_link_class.md) template allows styling the popup that appears when a user starts dragging a dependency line between tasks. For example, you can color the background of the popup and change the color of the popup text:

~~~jsx
<style>
    .gantt_link_tooltip {
        color: red;
        background-color: yellow;
    }
</style>

gantt.templates.drag_link_class = (from, from_start, to, to_start) =>
    `gantt_link_tooltip`;
~~~

![styling_link_popup](/img/styling_link_popup.png)

**Related sample**: [Styling the Popup of Dependency Link](https://snippet.dhtmlx.com/7o5f261z)

Check the [Templates of Dependency Links](guides/dependency-templates.md) article to get more details on the topic.

### Editing link values from UI

While there are lightboxes for editing and styling tasks bars, there is no built-in UI for editing links provided. Nevertheless, you can create such a UI yourself by implementing the technique described in the 
[dedicated article](guides/crud-dependency.md#editing-link-values-from-ui).

![link_edit_ui](/img/link_edit_ui.png)

**Related sample**: [Custom UI for Editing Link Values](https://snippet.dhtmlx.com/2208ic0t)

## Styling Quick Info Popup

The styling of the Quick Info popup is defined via the [Templates of the 'Quick Info' Extension (Touch Support)](guides/touch-templates.md) templates.

You can apply the necessary style to the pop-up edit form by the [quick_info_class](api/template/quick_info_class.md) template. For example, you can style quick info popups for particular tasks as follows:

~~~jsx
<style>
    .quick-info-highlight {
        background-color: #ffeb8a !important;
    }
    .quick-info-highlight .gantt_cal_qi_title {
        background-color: #ffeb8a !important;
    }
</style>

gantt.templates.quick_info_class = (start, end, task) =>
    task.id === "2" ? "quick-info-highlight" : "";
~~~

![styling_quick_info](/img/styling_quick_info.png)

**Related sample**: [Styling Quick Info Popup](https://snippet.dhtmlx.com/b92gyqwu)


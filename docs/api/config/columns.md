---
sidebar_label: columns
title: columns config
description: "configures the columns of the table"
---

# columns

### Description

@short: Configures the columns of the table

@signature: columns: GridColumn[]

### Example

~~~jsx
// default columns definition
gantt.config.columns = [
    { name: "text",       label: "Task name",  width: "*", tree: true },
    { name: "start_date", label: "Start time", align: "center" },
    { name: "duration",   label: "Duration",   align: "center" },
    { name: "add",        label: "",           width: 44 }
];

gantt.init("gantt_here");
~~~

### Related samples
- [Progress lightbox](https://docs.dhtmlx.com/gantt/samples/05_lightbox/02_progress_lightbox.html)

### Details

Each object in the array specifies a single column. An object can take the following attributes:

- **align?** - (*string*) - sets the horizontal title alignment. Possible values: *'left'*, *'center'*, or *'right'*;
- **hide?** - (*boolean*) - hides/shows a column (PRO);
- **label?** - (*string | number | any*) - specifies the title of the column;
- **max_width?** - (*number*) - sets the maximum column width in case of resize operations;
- **min_width?** - (*number*) - sets the minimum column width in case of resize operations;
- **name?** - (*string | number*) - defines the column's id. The name 'add' allows you to add a column with the '+' sign;
- **resize?** - (*boolean*) - enables the possibility to resize a column by dragging the column's border (PRO);
- **sort? (task1, task2): number** - (*boolean | string | Function*) - the configuration of sorting after clicking on the column header. When the property is set to *false*, sorting is disabled. You can also set a different task property in the *string* to sort the column or use a custom sorting function.
    - **_task1_** - (*Task*) - an object of the first task that will be sorted.
    - **_task2_** - (*Task*) - an object of the second task that will be sorted.
- **template? (task): any** - sets a data template.
    - **_task_** - (*Task*) - the Task object.
- **tree?** - (*boolean*) - indicates that the related column should display a tree;
- **width?** - (*number | string*) - defines the width of the column;
- **onrender? (task, node): any** - optional, a callback function for rendering a cell into the DOM. The function takes a task object and the DOM element of the grid cell as parameters and may return a component of the framework. See details here;
    - **_task_** - (*Task*) - the Task object.
    - **_node_** - (*HTMLElement*) - the HTML element of the Grid cell.
- **editor?** - (*object*) - attached inline editor.
    - **_type_** - (*string*) - the type of the inline editor.
    - **_map_to_** - (*string*) - specifies which property of the task should be updated by the inline editor.
    - **_min?_** - (*Date | number*) - minimal value for the date and duration types.
    - **_max?_** - (*Date | number*) - maximal value for the date and duration types.
    - **_options?_** - (*Array &lt;any&gt;*) - an array with the options for the select types.
    - **_formatter?_** - (*DurationFormatter | LinkFormatter*) - formatter for the date and predecessor types.


The width of Grid columns depends on two attributes: the **width** of the column and [grid_width](api/config/grid_width.md). If the sum of the width of columns is not equal to the width of the grid, Gantt changes one of the parameters.

- When initializing the gantt via [gantt.init()](api/method/init.md), the **width** of the column is a priority.

:::note
 [Column width priority over grid width at initialization](https://snippet.dhtmlx.com/itnvg6z9)
:::
- When rendering the gantt via [gantt.render()](api/method/render.md), the [grid_width](api/config/grid_width.md) is a priority.

:::note
sample: [Grid width priority over column width during rendering ](https://snippet.dhtmlx.com/4nb67z61)
:::
- When initializing the gantt via [gantt.init()](api/method/init.md) and either the width of the column is not specified or is set to **'*'**, the [grid_width](api/config/grid_width.md) is a priority. 

:::note
sample: [Grid width priority when column width is undefined or set to '*' at initialization](https://snippet.dhtmlx.com/qej8w5ix)
:::


The **template** attribute is a function that takes a data item object as a parameter and returns the final data template. The function definition allows you to present almost any content.

~~~js
gantt.config.columns = [
    { name: "text",        label: "Task name",  tree: true, width: "*" },
    { name: "start_date",  label: "Start time", align: "center" },
    { name: "staff",       label: "Holder(s)", template: (obj) => {
        return `${obj.holder} (${obj.progress})`;
    } }
];

gantt.init("gantt_here");
~~~

### Related Guides
- [Specifying Columns](guides/specifying-columns.md)
- [How-tos](guides/how-to.md#how-to-add-a-custom-column-in-the-grid) (read how to add a custom column in the grid)
- [How-tos](guides/how-to.md#how-to-add-a-custom-add-button) (read how to add a custom add(+) button)

### Change log
- the **onrender** attribute has been added in v7.1


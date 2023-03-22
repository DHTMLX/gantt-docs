How-tos
==================================

## How to toggle grid/chart

If you use the default layout configuration, you can change the [show_grid](api/gantt_show_grid_config.md) or [show_chart](api/gantt_show_chart_config.md) parameters and use the [render()](api/gantt_render.md) method to repaint the changes.

~~~js
function toggleGrid(){
    gantt.config.show_grid = !gantt.config.show_grid;
    gantt.render();
}
~~~

{{editor	https://snippet.dhtmlx.com/gnloz505	Gantt. Toggle grid (default layout)}}

~~~js
function toggleChart(){
    gantt.config.show_chart = !gantt.config.show_chart;
    gantt.render();
}
~~~

{{editor	https://snippet.dhtmlx.com/kqe1hqp2	Gantt. Toggle timeline (default layout)}}
 
If you use a custom layout configuration, you need to create several layout configurations - with and without a grid/timeline. To switch between them, you need to modify the [gantt.config.layout](api/gantt_layout_config.md) parameter and apply the [init()](api/gantt_init.md) method to see the changes:

~~~js
let showGrid = true;
function toggleGrid() {
    showGrid = !showGrid;
    if (showGrid) {
        gantt.config.layout = gridAndChart; // layout with grid and timeline
    }
    else {
        gantt.config.layout = onlyChart; // layout with the timeline only

    }
    gantt.init("gantt_here");
}
~~~

{{editor	https://snippet.dhtmlx.com/omk98l0x	Gantt. Toggle grid (custom layout)}}

~~~js
let showChart = true;
function toggleChart() {
    showChart = !showChart;
    if (showChart) {
        gantt.config.layout = gridAndChart; // layout with grid and timeline
    }
    else {
        gantt.config.layout = onlyGrid; // layout with the grid only

    }
    gantt.init("gantt_here");
}
~~~

{{editor	https://snippet.dhtmlx.com/aukjyqc8	Gantt. Toggle timeline (custom layout)}}

## How to toggle the resource view

As with the previous use case, you need to create several layout configurations - with and without resource views. To switch between them, you need to modify the [gantt.config.layout](api/gantt_layout_config.md) parameter and apply the [init()](api/gantt_init.md) method to see the changes:

~~~js
let resourceChart = true;

function layoutChange() {
    resourceChart = !resourceChart;
    if (resourceChart) {
        gantt.config.layout = resourceLayout;
    }
    else {
        gantt.config.layout = noresourceLayout;
    }
    gantt.init("gantt_here");
};
~~~

{{editor	https://snippet.dhtmlx.com/vbaczl07	Gantt. Toggle resource load diagram}}

~~~js
let histogramView = true;

function layoutChange() {
    histogramView = !histogramView;
    if (histogramView) {
        gantt.config.layout = histogramLayout;
    }
    else {
        gantt.config.layout = simpleLayout;
    }
    gantt.init("gantt_here");
};
~~~

{{editor	https://snippet.dhtmlx.com/isn2ger4	Gantt. Toggle resource histogram}}

Alternatively, you can generate layout by using the layout views and re-initializing Gantt to see the changes:

{{editor	https://snippet.dhtmlx.com/3dnzfhit	Gantt. Generate layout}}

## How to have an infinite scroll in the timeline

There are several ways to implement an infinite scroll. But in most cases, you will need to modify the displayed date range ([gantt.config.start_date](api/gantt_start_date_config.md) and [gantt.config.end_date](api/gantt_end_date_config.md) parameters):

### While using the scrollbar

You need to obtain the [scroll position](api/gantt_onganttscroll_event.md) and increase the date range. Note, [repainting](api/gantt_render.md) of Gantt too often will affect performance, therefore you will need to do that after a timeout:

~~~js
gantt.init("gantt_here");
gantt.parse(tasks);

gantt.attachEvent("onGanttScroll", function (left, top) {
    const left_date = gantt.dateFromPos(left)
    const right_date = gantt.dateFromPos(left + gantt.$task.offsetWidth)

    gantt.config.start_date = gantt.config.start_date || gantt.getState().min_date;
    gantt.config.end_date = gantt.config.end_date || gantt.getState().max_date;

    const min_allowed_date = gantt.date.add(gantt.config.start_date, 1, "day");
    const max_allowed_date = gantt.date.add(gantt.config.end_date, -2, "day");

    let repaint = false;
    if (+left_date <= +min_allowed_date) {
        gantt.config.start_date = gantt.date.add(gantt.config.start_date, -2, "day");
        repaint = true;
    }
    if (+right_date >= +max_allowed_date) {
        gantt.config.end_date = gantt.date.add(gantt.config.end_date, 2, "day");
        repaint = true;
    }

    if (repaint) {
        setTimeout(function () {
            gantt.render()
            gantt.showDate(left_date)
        }, 20)
    }
});
~~~

{{editor	https://snippet.dhtmlx.com/4u52p5g3	Gantt. Infinite scroll while using scrollbar}}

### While dragging the timeline

You need to get the current scroll position and if it is near the start or end of the timeline, increase the displayed date range:

~~~js
gantt.attachEvent("onMouseMove", function (id, e) {
  if (!gantt.getState().drag_id && e.buttons == 1) {
    const left_date = gantt.dateFromPos(gantt.getScrollState().x);
    const right_date = gantt.dateFromPos(
      gantt.getScrollState().x + gantt.$task.offsetWidth - 1
    );
    if (left_date && +left_date <= +gantt.config.start_date) {
      gantt.config.start_date = gantt.date.add(gantt.config.start_date, -1, 'day');
      gantt.render();
    }
    if (right_date && +gantt.config.end_date < +gantt.date.add(right_date, 1, 'day')) {
      gantt.config.end_date = gantt.date.add(gantt.config.end_date, 1, 'day');
      gantt.render();
    }
  }
});
~~~

{{editor	https://snippet.dhtmlx.com/zqob7lz5	Gantt. Infinite scroll while dragging the timeline}}

### While dragging a task

If the date range is not set, you can call the [render()](api/gantt_render.md) method each time the task is dragged near the start or end of the timeline:

~~~js
gantt.init("gantt_here");
gantt.parse(tasks);

gantt.attachEvent("onTaskDrag", function (id, mode, task, original) {
    if (task.start_date <= gantt.getState().min_date ||
        task.end_date >= gantt.getState().max_date) {
        gantt.render()
    }
});
~~~

{{editor	https://snippet.dhtmlx.com/44qcunjc	Gantt. Infinite scroll while dragging a task (default range settings)}}

If the [date range](api/gantt_start_date_config.md) is set, you will need to modify it:

~~~js
gantt.init("gantt_here");
gantt.parse(tasks);

gantt.config.start_date = new Date(2025, 02, 28)
gantt.config.end_date = new Date(2025, 03, 10)
gantt.render();

gantt.attachEvent("onTaskDrag", function (id, mode, task, original) {
    if (+task.start_date <= +gantt.config.start_date) {
        gantt.config.start_date = gantt.date.add(
            gantt.config.start_date, -1, gantt.config.duration_unit
        );
        gantt.render()
    }
    if (+task.end_date >= +gantt.config.end_date) {
        gantt.config.end_date = gantt.date.add(
            gantt.config.end_date, 1, gantt.config.duration_unit
        );
        gantt.render()
    }
});
~~~

{{editor	https://snippet.dhtmlx.com/3lrm0wyp	Gantt. Infinite scroll while dragging a task (explicit range settings)}}

## How to load tasks dynamically

You can detect that you have scrolled to the last visible task in the [onGanttScroll](api/gantt_onganttscroll_event.md) event and use the [parse()](api/gantt_parse.md) method to load new tasks:

~~~js
gantt.attachEvent("onGanttScroll", function (left, top) {
    const visibleTasks = gantt.getVisibleTaskCount();
    const lastVisibleTask = gantt.getTaskByIndex(visibleTasks - 1)

    if (gantt.getTaskRowNode(lastVisibleTask.id)) {
        const tasks = load_tasks()
        gantt.parse(tasks);
    }
});
~~~

{{editor	https://snippet.dhtmlx.com/39l7o0rm	Gantt. Load data dynamically}}

## How to expand/collapse all tasks with a button

You can use the [open()](api/gantt_open.md) and [close()](api/gantt_close.md) methods to open and close a task. To do that with all tasks in the chart, you need to use the  method inside the [eachTask()](api/gantt_eachtask.md) function. To repaint the changes only once, you can wrap the function with the [batchUpdate()](api/gantt_batchupdate.md) method:

~~~js
function collapseAll() {
    gantt.batchUpdate(function () {
        gantt.eachTask(function (task) {
            gantt.close(task.id)
        })
    })
}

function expandAll() {
    gantt.batchUpdate(function () {
        gantt.eachTask(function (task) {
            gantt.open(task.id)
        })
    })
}
~~~

{{editor	https://snippet.dhtmlx.com/z7o5qt9s	Gantt. Add collapse/expand buttons into Gantt header}}

{{editor	https://snippet.dhtmlx.com/72zahagy	Gantt. Collapse/expand all tasks}}

## How to display several lines in the grid cell/header

This can be achieved by adding some style rules.

For the grid header:

~~~css
.gantt_grid_head_text{
    line-height: 12px;
    white-space:normal;
}
~~~

{{editor	https://snippet.dhtmlx.com/lx70v5hw	Gantt. Multiline text in the grid header}}

For the grid cells:

~~~css
.gantt_tree_content, .gantt_task_content{
    line-height: 12px;
    white-space:normal;
    overflow-wrap: break-word; 
}
~~~

{{editor	https://snippet.dhtmlx.com/55uy7ibo	Gantt. Multiline text in Grid cells and Timeline}}

{{editor	https://snippet.dhtmlx.com/bwil9sxs	Gantt. Multiline text in cells of a Grid column}}

## How to add a custom column in the grid

To add a custom column, you need to modify the [gantt.config.columns](api/gantt_columns_config.md) parameter. If you specify the **name** parameter, Gantt will return the value of the task property with the same name. You can also use the [template()](desktop/specifying_columns.md#datamappingandtemplates) function to return any custom date or HTML elements.

~~~js
gantt.config.columns = [
    /*
    other columns
    */
    {
        name: "progress", label: "Progress", width: 50, resize: true, align: "center", 
        template: function (task) {
            return Math.round(task.progress * 100) + "%"
        }
    },
    /*
    other columns
    */
];
~~~

{{editor	https://snippet.dhtmlx.com/t5ba0gzu	Gantt. Custom column with template for task progress}}

{{editor	https://snippet.dhtmlx.com/gfsdp121	Gantt. Custom column with template for action buttons}}

## How to add a custom add(+) button

You need to create a custom column via the [gantt.config.columns](api/gantt_columns_config.md) parameter. You can set any name for that column except *add*. Otherwise, Gantt will add the default *add* column.
It is possible to return any HTML elements in the grid column by using the [template](desktop/specifying_columns.md#datamappingandtemplates) function. It means that you can return a button and attach a click event to it with a custom function for adding tasks.

~~~js
gantt.config.columns = [
    /*
    other columns
    */
    {
        name: "add_tasks", label: "+", width: 50, resize: true, align: "center", 
        template: function (task) {
            return `<button onclick='addTask(${task.id})';>`
        }
    },
];
~~~

{{editor	https://snippet.dhtmlx.com/o36jnko3	Gantt. Custom columns with templates for add (+) buttons}}

## How to add a custom scale

You need to create a [custom scale unit](desktop/configuring_time_scale.md#customtimeunits) and add logic to calculate the dates.

An example of a custom scale with work shift hours (06:30, 18:30):

~~~js
gantt.date.custom_scale_start = function (date) {
    return date;
};

gantt.date.add_custom_scale = function (date, inc) {
    let next = new Date(date)
    if (!next.getMinutes()) {
        gantt.date.day_start(next)
        next = gantt.date.add(next, 6, "hour");
        next = gantt.date.add(next, 30, "minute");
    }
    else {
        next = gantt.date.add(next, 12 * inc, "hour");
    }
    return next
};

gantt.config.scales = [
    { unit: "day", step: 1, date: "%d" },
    { unit: "custom_scale", step: 1, date: "%H:%i" },
];
~~~

{{editor	https://snippet.dhtmlx.com/0l49yvp2	Gantt. Custom work shift hours on the scale}}

An example of a custom scale with numbers instead of days:

~~~js
gantt.config.scales = [
    {
        unit: "day", step: 1, format: function (date) {
            return gantt.getScale().trace_indexes[+date] + 1
        }
    }
]
~~~

{{editor	https://snippet.dhtmlx.com/06bp4wdl	Gantt. Numbers of days on the scale}}

An example of a custom scale with 5-day work weeks:

~~~js
const weekScaleTemplate = function (date) {
    const dateToStr = gantt.date.date_to_str("%d");
    const endDate = gantt.date.add(gantt.date.add(date, 5, "day"), -1, "day");
    return dateToStr(date) + " - " + dateToStr(endDate);
};

gantt.date.five_days_start = function (date) {
    return date;
};

gantt.date.add_five_days = function (date, inc) {
    if (date.getDay() == 0 || date.getDay() == 6) {
        return gantt.date.add(date, 1 * inc, "day");
    }
    gantt.date.week_start(date);
    return gantt.date.add(date, 5 * inc, "day");
};


gantt.config.scales = [
    { unit: "month", step: 1, format: "%F, %Y" },
    { unit: "five_days", step: 1, format: weekScaleTemplate },
];

gantt.ignore_time = function (date) {
    return date.getDay() == 0 || date.getDay() == 6;
};
~~~

{{editor	https://snippet.dhtmlx.com/eq70o558	5-day work weeks on the scale}}

An example of a custom scale with weeks of the year (the week's number starts from the first day of the year):

~~~js
gantt.date.custom_week_start = function (date) {
    return date;
};

gantt.date.add_custom_week = function (date, inc) {
    const year_start = new Date(date);
    gantt.date.year_start(year_start);
    const week_number = Math.round(gantt.calculateDuration(year_start, date) / 7);

    const next_week = gantt.date.add(year_start, week_number + 1, "week");
    if (next_week.getYear() != date.getYear()) {
        gantt.date.year_start(next_week)
    }
    return next_week;
};


const custom_week_template = function (date) {
    const year_start = gantt.date.year_start(new Date(date));
    const week_number = Math.round(gantt.calculateDuration(year_start, date) / 7) + 1;

    return "Week:" + week_number
}

gantt.config.scales = [
    { unit: 'custom_week', step: 1, template: custom_week_template },
    { unit: 'day', step: 1, format: "%d, %M" },
];
~~~

{{editor	https://snippet.dhtmlx.com/gbowxpmr	Gantt. Weeks of the year on the scale}}

## How to copy and paste tasks

You can use the [copy()](api/gantt_copy.md) method to create a deep copy of the task object. Then, you can change the ID of the cloned task. After that, you can add the cloned task with the [addTask()](api/gantt_addtask.md) or [createTask()](api/gantt_createtask.md) methods.

This is how you can add a button to clone a task:

~~~js
function clone_task(id) {
    const task = gantt.getTask(id);
    const clone = gantt.copy(task);
    clone.id = +(new Date());
    gantt.addTask(clone, clone.parent, clone.$index)
}

gantt.config.columns = [
    /*
    other columns
    */
    {
        name: "clone", label: "clone", width: 44, template: function (task) {
            return "<input type=button value='V' onclick=clone_task(" + task.id + ")>"
        }
    }
];
~~~

{{editor	https://snippet.dhtmlx.com/ii9u6wbe	Gantt. Clone a task}}

The following example shows how to clone a task with all its subtasks and links:

~~~js
let child_links;
let clone_original_ids_table;

function obtain_link_ids(id) {
  const task = gantt.getTask(id);
  const source_links = task.$source;
  for (let i = 0; i < source_links.length; i++) {
    child_links.push(source_links[i]);
  }
}

function create_clone_original_ids_table(original_id, clone_id) {
  clone_original_ids_table[original_id] = clone_id;
}

function clone_child_links() {
 for (let i = 0; i < child_links.length; i++) {
  const link = gantt.getLink(child_links[i]);
  if (clone_original_ids_table[link.source] && clone_original_ids_table[link.target]){
    const clone_link = {};
    clone_link.id = gantt.uid();
    clone_link.target = clone_original_ids_table[link.target];
    clone_link.source = clone_original_ids_table[link.source];
    clone_link.type = link.type;
    gantt.addLink(clone_link)
  }
 }
}

function clone_children(id, new_parent) {
  const children = gantt.getChildren(id)
  for (let i = 0; i < children.length; i++) {
    const child_original = gantt.getTask(children[i]);
    const child_clone = gantt.copy(child_original);
    child_clone.id = gantt.uid();
    child_clone.parent = new_parent;
    gantt.addTask(child_clone, child_clone.parent, child_clone.$index);

    obtain_link_ids(child_original.id);
    create_clone_original_ids_table(child_original.id, child_clone.id);

    if (gantt.hasChild(child_original.id)) clone_children(
      child_original.id, child_clone.id
    );
  }
}

function clone_task(id) {
  const task = gantt.getTask(id);
  const clone = gantt.copy(task);
  clone.id = gantt.uid();
  gantt.addTask(clone, clone.parent, clone.$index);

  child_links = [];
  obtain_link_ids(id);

  clone_original_ids_table = {};
  create_clone_original_ids_table(task.id, clone.id);

  if (gantt.hasChild(id)) {
    clone_children(id, clone.id)
  }

  clone_child_links()
}

gantt.config.order_branch = true;
gantt.config.order_branch_free = true;

gantt.config.columns = [
  /*
  other columns
  */
  {
    name: "clone", label: "clone", width: 44, template: function (task) {
      return "<input type=button value='V' onclick=clone_task(" + task.id + ")>"
    }
  }
];
~~~

{{editor	https://snippet.dhtmlx.com/b33jfmws	Gantt. Clone a task with all its subtasks and links}}

One more example demonstrates how to implement copying via key navigation (select tasks, use the *Ctrl + C* hotkey to copy them, and *Ctrl + V* hotkey to paste them as children to the selected task):

~~~js
gantt.plugins({
    keyboard_navigation: true,
    multiselect: true,
})

let tasks_to_copy = [];

gantt.ext.keyboardNavigation.addShortcut("ctrl+c", function (e) {
    tasks_to_copy = [];
    gantt.eachSelectedTask(function (task_id) {
        tasks_to_copy.push(task_id);
    });
}, "taskRow");
gantt.ext.keyboardNavigation.addShortcut("ctrl+v", function (e) {
    const new_parent = gantt.getSelectedId();
    for (let i = 0; i < tasks_to_copy.length; i++) {
        const task = gantt.copy(gantt.getTask(tasks_to_copy[i]));
        task.id = +new Date() + '+' + Math.floor(Math.random() * 10);
        gantt.addTask(task, new_parent)
    }
    gantt.getTask(new_parent).$open = true;
    gantt.render()
}, "taskRow");
~~~

{{editor	https://snippet.dhtmlx.com/kck3pnmh	Gantt. Copy and paste tasks via Ctrl+C, Ctrl+V}}

## How to add resource chart or custom styles in the exported PDF file

You need to export the data in the [raw](desktop/export.md#exportingcustommarkupandstyles) mode and include the styles in the [header](desktop/export.md#customstylefortheoutputfile) or [footer](desktop/export.md#customstylefortheoutputfile) parameters of the export function.

For example, you can save custom styles in a variable and then add the variable to the [header](desktop/export.md#customstylefortheoutputfile) parameter

~~~js
const header = `
    .gantt_bar_task {
        background: orange;
    }

    .gantt_task_progress {
        background-color: rgba(33, 33, 33, 0.17);
    }
`

gantt.exportToPDF({
       header: "<style>" + header + "</style>"
});
~~~

{{editor	https://snippet.dhtmlx.com/51ds6zwa	Gantt. Export Gantt to PDF (styles from a variable)}}

Or you can find the &lt;style&gt; element on the page and add its content as in:

~~~js
gantt.exportToPDF({
    raw: true,
    header: "<style>" + document.getElementById("styles").innerHTML + "</style>"
});

<style id='styles'>
	.gantt_bar_task {
		background: orange;
	}

	.gantt_task_progress {
		background-color: rgba(33, 33, 33, 0.17);
	}
</style>
~~~

{{editor	https://snippet.dhtmlx.com/6qwzclr2	Gantt. Export Gantt to PDF (styles from &lt;style&gt; element)}}

{{editor	https://snippet.dhtmlx.com/2lqhkfhh	Gantt. Export Gantt with custom icons to PDF}}

An example of exporting Gantt with legend:

{{editor	https://snippet.dhtmlx.com/gz4ddlnl	Gantt. Export Gantt with legend to PDF}}

Examples of exporting resource load diagram and histogram:

{{editor	https://snippet.dhtmlx.com/lw5xcm31	Gantt. Export Gantt with resource load diagram to PDF}}

{{editor	https://snippet.dhtmlx.com/i9me4oxl	Gantt. Export Gantt with resource histogram to PDF}}

## How to calculate task progress depending on child tasks

A simple way to implement that is calculate the progress of a parent task after you update a child task. To iterate over parent tasks, you can use the [eachParent()](api/gantt_eachparent.md) method.

In the following example, the progress of parent tasks depends only on the progress of child tasks:

~~~js
gantt.config.auto_types = true;

gantt.templates.progress_text = function (start, end, task) {
    return "<span style='text-align:left;'>" + Math.round(task.progress * 100) 
          + "% </span>";
};

gantt.init("gantt_here");
gantt.parse({
    "data": [
        ...
    ]
});

gantt.attachEvent("onAfterTaskUpdate", function (id, task) {
    parentProgress(id)
});
gantt.attachEvent("onTaskDrag", function (id, mode, task, original) {
    if (mode == "progress") {
        parentProgress(id)
    }
});
gantt.attachEvent("onAfterTaskAdd", function (id) {
    parentProgress(id)
});
gantt.attachEvent("onAfterTaskDelete", function (id, task) {
    if (task.parent) {
        const siblings = gantt.getChildren(task.parent);
        if (siblings.length) {
            parentProgress(siblings[0])
        }
    }
});

function parentProgress(id) {
    gantt.eachParent(function (task) {
        const children = gantt.getChildren(task.id);
        let childProgress = 0;
        for (let i = 0; i < children.length; i++) {
            const child = gantt.getTask(children[i])
            childProgress += (child.progress * 100);
        }
        task.progress = childProgress / children.length / 100;
    }, id)
    gantt.render();
}
~~~

{{editor	https://snippet.dhtmlx.com/xuicd1q7	Gantt. Calculate progress of a parent task dynamically}}

In the next example, the progress of parent tasks depends on the progress of child tasks and their duration:

~~~js
function calculateSummaryProgress(task) {
    if (task.type != gantt.config.types.project)
        return task.progress;
    var totalToDo = 0;
    var totalDone = 0;
    gantt.eachTask(function (child) {
        if (child.type != gantt.config.types.project) {
            totalToDo += child.duration;
            totalDone += (child.progress || 0) * child.duration;
        }
    }, task.id);
    if (!totalToDo) return 0;
    else return totalDone / totalToDo;
}

function refreshSummaryProgress(id, submit) {
    if (!gantt.isTaskExists(id))
        return;

    var task = gantt.getTask(id);
    var newProgress = calculateSummaryProgress(task);
    
    if (newProgress !== task.progress) {
        task.progress = newProgress;

        if (!submit) {
            gantt.refreshTask(id);
        } else {
            gantt.updateTask(id);
        }
    }

    if (!submit && gantt.getParent(id) !== gantt.config.root_id) {
        refreshSummaryProgress(gantt.getParent(id), submit);
    }
}


gantt.attachEvent("onParse", function () {
    gantt.eachTask(function (task) {
        task.progress = calculateSummaryProgress(task);
    });
});

gantt.attachEvent("onAfterTaskUpdate", function (id) {
    refreshSummaryProgress(gantt.getParent(id), true);
});

gantt.attachEvent("onTaskDrag", function (id) {
    refreshSummaryProgress(gantt.getParent(id), false);
});
gantt.attachEvent("onAfterTaskAdd", function (id) {
    refreshSummaryProgress(gantt.getParent(id), true);
});


(function () {
    var idParentBeforeDeleteTask = 0;
    gantt.attachEvent("onBeforeTaskDelete", function (id) {
        idParentBeforeDeleteTask = gantt.getParent(id);
    });
    gantt.attachEvent("onAfterTaskDelete", function () {
        refreshSummaryProgress(idParentBeforeDeleteTask, true);
    });
})();

...

gantt.config.auto_types = true;

gantt.templates.progress_text = function (start, end, task) {
    return "<span style='text-align:left;'>" + Math.round(task.progress * 100) 
          + "% </span>";
};

gantt.templates.task_class = function (start, end, task) {
    if (task.type == gantt.config.types.project)
        return "hide_project_progress_drag";
};
~~~

{{sample 08_api/16_dynamic_progress.html}}

## How to vertically reorder tasks in the timeline

You can use the [addTaskLayer()](api/gantt_addtasklayer.md) method to display custom HTML elements in the timeline and add functions to drag them vertically and horizontally.

In the following example, it will work as a regular task reorder in the grid:

{{editor	https://snippet.dhtmlx.com/fla78m0y	Gantt. Reorder tasks vertically in timeline}}

In the following example, you can reorder split tasks and place tasks on the same row:

{{editor	https://snippet.dhtmlx.com/usfulweq	Gantt. Reorder split tasks vertically in timeline}}

## How to freeze/fix columns in the grid

This can be done by using CSS. You need to set the 'relative' position to the column that needs to be fixed. The 'left' parameter should have the same value as the scrollbar position, so, you can add the event handler to the scrollbar and update the CSS variable:

~~~js
gantt.attachEvent("onGanttReady", function () {
    const el = document.querySelector(".gantt_hor_scroll");
    if (el) {
        el.addEventListener('scroll', function () {
            document.documentElement.style.setProperty(
              '--gantt-frozen-column-scroll-left', el.scrollLeft + "px"
            );
        });
    }
});

const textEditor = { type: "text", map_to: "text" };
const start_dateEditor = { type: "date", map_to: "start_date" };
const end_dateEditor = { type: "date", map_to: "end_date" };
const durationEditor = { type: "number", map_to: "duration", min: 0, max: 100 };


gantt.config.columns = [
    { name: "text", tree: true, width: 150, resize: true, editor: textEditor },
    { name: "start_date", align: "center", width: 120, resize: true, 
      editor: start_dateEditor },
    { name: "end_date", label: "End Time", align: "center", width: 120, 
      resize: true, editor: end_dateEditor },
    { name: "duration", align: "center", width: 80, resize: true, 
      editor: durationEditor },
    { name: "progress", label: "Progress", width: 80, align: "center", 
      resize: true },
    {
        name: "custom", label: "Custom", width: 180, align: "center", 
        resize: true, template: function (task) {
            return Math.round(Math.random() * 100)
        }
    },
    { name: "add", width: 44 }
];

gantt.config.layout = {
    css: "gantt_container",
    cols: [
        {
            rows: [
                {
                    view: "grid", scrollable: true, 
                    scrollX: "scrollHor1", scrollY: "scrollVer"
                },
                {
                    view: "scrollbar", id: "scrollHor1",
                    scroll: 'x', group: 'hor'
                },
            ]
        },
        { resizer: true, width: 1 },
        {
            rows: [
                {
                    view: "timeline", scrollX: "scrollHor", scrollY: "scrollVer"
                },
                {
                    view: "scrollbar", id: "scrollHor",
                    scroll: 'x', group: 'hor'
                },
            ]
        },
        { view: "scrollbar", id: "scrollVer" }
    ]
}
~~~

And add CSS styles:

~~~css
:root {
	--gantt-frozen-column-scroll-left: 0px;
}

.gantt_cell:nth-child(1),
.gantt_grid_head_cell:nth-child(1) {
	background: Azure;
	position: relative;
	left: var(--gantt-frozen-column-scroll-left);
}

.gantt_grid_editor_placeholder[data-column-name="text"] {
	left: var(--gantt-frozen-column-scroll-left) !important;
}

.gantt_grid_head_cell:nth-child(1) {
	z-index: 1;
}
~~~

{{editor	https://snippet.dhtmlx.com/jbiplpjz	Gantt. Frozen column in Grid (via CSS)}}

Another way is to add [several grid views](desktop/layout_config.md), but it doesn't work well with the inline editors:

~~~js
gantt.config.columns = [
    { name: "start_date", align: "center", width: 80, resize: true },
    { name: "end_date", label: "End Date", align: "center", width: 80, resize: true },
    { name: "duration", width: 60, align: "center", resize: true },
    { name: "progress", label: "Progress", width: 60, align: "center", resize: true },
    { name: "add", width: 44 }
];


const fixedColumn = {
    columns: [
        { name: "text", tree: true, width: 200, resize: true },
    ]
};

gantt.config.layout = {
  css: "gantt_container",
  cols: [
    {
      width: 400,
      //min_width: 100,
      rows: [
        {
          group: "gantt",
          cols: [
            {
              rows: [
                { view: 'grid', config: fixedColumn, bind: "task", 
                  scrollY: 'gridScrollY' }
              ]
            },
            {
              rows: [
                { view: 'grid', bind: "task", scrollX: 'gridScrollX', 
                  scrollable: true, scrollY: 'gridScrollY' },
                { view: 'scrollbar', id: 'gridScrollX' }
              ]
            },
            { view: 'scrollbar', id: 'gridScrollY' }
          ]
        }
      ]
    },
    { resizer: true, width: 1 },
    {
      rows: [
        {
          group: "gantt",
          cols: [
            {
              rows: [
                { view: "timeline", scrollX: "scrollHor", scrollY: "scrollVer" },
                { view: "scrollbar", id: "scrollHor" }
              ]
            },
            { view: 'scrollbar', id: 'scrollVer' }
          ]
        }
      ]
    }
  ]
}
~~~

{{editor	https://snippet.dhtmlx.com/8dg2r8m9	Gantt. Fixed column in Grid (several grid views)}}

## How to add legend to the gantt

There is no built-in method for displaying legend in the Gantt, the closest thing is the [Overlay extension](desktop/baselines.md#extraoverlayforthechart), but it’s not exactly the same and can’t be customized that easily.

However, legends can be implemented fairly simple. You can code the legend element in HTML and then just inject it into the gantt node:

~~~js
gantt.$root.appendChild(legend);
~~~

Here is a live example, to show the legend, press the "Toggle legend" button on top of the gantt:

{{editor	https://snippet.dhtmlx.com/1ui0lim5	Gantt. Add information legend
}}

To add interactivity, you can add listeners for DOM events to the legend element directly, or you can listen to DOM events at the root level of the gantt (event delegation):

~~~js
gantt.event(gantt.$root, "click", function(e){
    var closest = gantt.utils.dom.closest;
    if(closest(e.target, ".gantt-legend")) {
        gantt.message("Mouse click inside the legend element");
    }
});
~~~



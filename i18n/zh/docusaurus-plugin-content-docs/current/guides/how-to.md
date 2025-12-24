---
title: "操作指南"
sidebar_label: "操作指南"
---

# 操作指南


## 如何切换网格/图表

在使用默认布局配置时，可以通过更改 [show_grid](api/config/show_grid.md) 或 [show_chart](api/config/show_chart.md) 参数，并调用 [render()](api/method/render.md) 方法来切换网格或图表的显示状态，从而更新界面。

~~~js
function toggleGrid(){
    gantt.config.show_grid = !gantt.config.show_grid;
    gantt.render();
}
~~~


**Related example:** [Gantt. Toggle grid (default layout)](https://snippet.dhtmlx.com/gnloz505)


~~~js
function toggleChart(){
    gantt.config.show_chart = !gantt.config.show_chart;
    gantt.render();
}
~~~


**Related example:** [Gantt. Toggle timeline (default layout)](https://snippet.dhtmlx.com/kqe1hqp2)

 
对于自定义布局配置，需要分别创建包含或不包含网格或时间线的不同布局。切换时，需更新 [gantt.config.layout](api/config/layout.md) 参数，并通过 [init()](api/method/init.md) 方法重新初始化以应用更改:

~~~js
let showGrid = true;
function toggleGrid() {
    showGrid = !showGrid;
    if (showGrid) {
        gantt.config.layout = gridAndChart; // 带有网格和时间线的布局
    }
    else {
        gantt.config.layout = onlyChart; // 仅有时间线的布局

    }
    gantt.init("gantt_here");
}
~~~


**Related example:** [Gantt. Toggle grid (custom layout)](https://snippet.dhtmlx.com/omk98l0x)


~~~js
let showChart = true;
function toggleChart() {
    showChart = !showChart;
    if (showChart) {
        gantt.config.layout = gridAndChart; // 带有网格和时间线的布局
    }
    else {
        gantt.config.layout = onlyGrid; // 仅有网格的布局

    }
    gantt.init("gantt_here");
}
~~~


**Related example:** [Gantt. Toggle timeline (custom layout)](https://snippet.dhtmlx.com/aukjyqc8)


## 如何切换资源视图

与切换网格或时间线视图类似，需要准备包含或不包含资源视图的多种布局配置。切换时需更新 [gantt.config.layout](api/config/layout.md) 参数，并调用 [init()](api/method/init.md) 方法以反映更改:

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


**Related example:** [Gantt. Toggle resource load diagram](https://snippet.dhtmlx.com/vbaczl07)


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


**Related example:** [Gantt. Toggle resource histogram](https://snippet.dhtmlx.com/isn2ger4)


另一种方式是使用布局视图动态生成布局，并重新初始化 Gantt 以更新显示:


**Related example:** [Gantt. Generate layout](https://snippet.dhtmlx.com/3dnzfhit)


## 如何在时间线上实现无限滚动

无限滚动可以通过多种方式实现，通常涉及通过 [gantt.config.start_date](api/config/start_date.md) 和 [gantt.config.end_date](api/config/end_date.md) 参数调整显示的日期范围:

### 使用滚动条时

通过监听 [scroll position](api/event/onganttscroll.md)，当用户滚动到边缘附近时，可以扩展日期范围。为避免性能问题，建议使用延时（timeout）方式重绘 Gantt 图表:

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


**Related example:** [Gantt. Infinite scroll while using scrollbar](https://snippet.dhtmlx.com/4u52p5g3)


### 拖动时间线时

在拖动时间线过程中检测当前滚动位置，如果接近时间线的起止端，则扩展日期范围:

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


**Related example:** [Gantt. Infinite scroll while dragging the timeline](https://snippet.dhtmlx.com/zqob7lz5)


### 拖动任务时

如果未显式设置日期范围，可在任务拖动到时间线边缘时每次调用 [render()](api/method/render.md) 来保持可见范围:

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


**Related example:** [Gantt. Infinite scroll while dragging a task (default range settings)](https://snippet.dhtmlx.com/44qcunjc)


如果已显式设置 [date range](api/config/start_date.md)，则需在任务拖动到边缘时动态更新日期范围:

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


**Related example:** [Gantt. Infinite scroll while dragging a task (explicit range settings)](https://snippet.dhtmlx.com/3lrm0wyp)


## 如何动态加载任务

通过 [onGanttScroll](api/event/onganttscroll.md) 事件检测滚动到最后一条可见任务时，可以调用 [parse()](api/method/parse.md) 方法动态加载更多任务:

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


**Related example:** [Gantt. Load data dynamically](https://snippet.dhtmlx.com/39l7o0rm)


## 如何通过按钮展开/收起所有任务

可以使用 [open()](api/method/open.md) 和 [close()](api/method/close.md) 方法分别展开或收起单个任务。若要对所有任务操作，可结合 [eachTask()](api/method/eachtask.md) 方法实现。将操作包裹在 [batchUpdate()](api/method/batchupdate.md) 内可确保图表只重绘一次:

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


**Related example:** [Gantt. Add collapse/expand buttons into Gantt header](https://snippet.dhtmlx.com/z7o5qt9s)


**Related example:** [Gantt. Collapse/expand all tasks](https://snippet.dhtmlx.com/72zahagy)


## 如何在网格单元格/表头中显示多行文本

在网格表头或单元格中显示多行文本，可以通过应用特定 CSS 样式实现。

对于网格表头:

~~~css
.gantt_grid_head_text{
    line-height: 12px;
    white-space:normal;
}
~~~


**Related example:** [Gantt. Multiline text in the grid header](https://snippet.dhtmlx.com/lx70v5hw)


对于网格单元格:

~~~css
.gantt_tree_content, .gantt_task_content{
    line-height: 12px;
    white-space:normal;
    overflow-wrap: break-word; 
}
~~~


**Related example:** [Gantt. Multiline text in Grid cells and Timeline](https://snippet.dhtmlx.com/55uy7ibo)


**Related example:** [Gantt. Multiline text in cells of a Grid column](https://snippet.dhtmlx.com/bwil9sxs)


## 如何在网格中添加自定义列

添加自定义列需要修改 [gantt.config.columns](api/config/columns.md) 参数。指定 **name** 属性后，Gantt 会显示对应任务属性的值。也可以使用 [template()](guides/specifying-columns.md#shujuyingsheyumoban) 函数返回自定义数据或 HTML 元素。

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


**Related example:** [Gantt. Custom column with template for task progress](https://snippet.dhtmlx.com/t5ba0gzu)


**Related example:** [Gantt. Custom column with template for action buttons](https://snippet.dhtmlx.com/gfsdp121)


## 如何添加自定义新增（+）按钮

可以通过 [gantt.config.columns](api/config/columns.md) 参数定义自定义列来创建新增按钮。列名不应为 *add*，否则会触发默认的新增列。利用 [template](guides/specifying-columns.md#shujuyingsheyumoban) 函数，可以返回任意 HTML 内容（如按钮），并绑定点击事件以添加任务。

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


**Related example:** [Gantt. Custom columns with templates for add (+) buttons](https://snippet.dhtmlx.com/o36jnko3)


## 如何添加自定义时间刻度

要添加自定义时间刻度，首先需要创建一个[自定义时间单位](guides/configuring-time-scale.md#zidingyishijiandanwei)，并实现计算日期的逻辑。

下面是一个表示工作班次小时（06:30，18:30）的自定义刻度示例:

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


**Related example:** [Gantt. Custom work shift hours on the scale](https://snippet.dhtmlx.com/0l49yvp2)


下面是另一个示例，展示了使用数字而不是天数的自定义刻度:

~~~js
gantt.config.scales = [
    {
        unit: "day", step: 1, format: function (date) {
            return gantt.getScale().trace_indexes[+date] + 1
        }
    }
]
~~~


**Related example:** [Gantt. Numbers of days on the scale](https://snippet.dhtmlx.com/06bp4wdl)


以下示例演示了一个用于5天工作周的自定义刻度:

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


**Related example:** [5-day work weeks on the scale](https://snippet.dhtmlx.com/eq70o558)


下面是一个显示一年中每周的自定义刻度示例，其中周数从每年的第一天开始计算:

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


**Related example:** [Gantt. Weeks of the year on the scale](https://snippet.dhtmlx.com/gbowxpmr)


## 如何复制和粘贴任务

可以使用 [copy()](api/method/copy.md) 方法来创建任务对象的深拷贝。复制后，可以为克隆任务分配一个新的 ID，并使用 [addTask()](api/method/addtask.md) 或 [createTask()](api/method/createtask.md) 方法添加它。

下面是添加一个克隆任务按钮的示例:

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
            return "<input type="button" value='V' onclick="clone_task("" + task.id + ")>"
        }
    }
];
~~~


**Related example:** [Gantt. Clone a task](https://snippet.dhtmlx.com/ii9u6wbe)


下面的示例演示了如何克隆一个任务及其所有子任务和链接:

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
      return "<input type="button" value='V' onclick="clone_task("" + task.id + ")>"
    }
  }
];
~~~


**Related example:** [Gantt. Clone a task with all its subtasks and links](https://snippet.dhtmlx.com/b33jfmws)


另一个示例展示了如何通过键盘快捷键实现复制:选择任务后，按下 *Ctrl + C* 进行复制，*Ctrl + V* 粘贴为所选任务的子任务:

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


**Related example:** [Gantt. Copy and paste tasks via Ctrl+C, Ctrl+V](https://snippet.dhtmlx.com/kck3pnmh)


## 如何在导出的 PDF 文件中添加资源图表或自定义样式

要在导出的 PDF 中包含自定义样式或资源图表，可以以 [raw](guides/export.md#daochuzidingyibiaojiheyangshi) 模式导出数据，并在导出函数的 [header](guides/export.md#shuchuwenjiandezidingyiyangshi) 或 [footer](guides/export.md#shuchuwenjiandezidingyiyangshi) 参数中添加样式。

例如，可以将自定义样式存储在变量中，然后在 [header](guides/export.md#shuchuwenjiandezidingyiyangshi) 参数中引用该变量:

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


**Related example:** [Gantt. Export Gantt to PDF (styles from a variable)](https://snippet.dhtmlx.com/51ds6zwa)


另外，也可以获取页面上 &lt;style&gt; 元素的内容，并这样添加:

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


**Related example:** [Gantt. Export Gantt to PDF (styles from &lt;style&gt; element)](https://snippet.dhtmlx.com/6qwzclr2)


**Related example:** [Gantt. Export Gantt with custom icons to PDF](https://snippet.dhtmlx.com/2lqhkfhh)


以下是带有图例的甘特图导出示例:


**Related example:** [Gantt. Export Gantt with legend to PDF](https://snippet.dhtmlx.com/gz4ddlnl)


资源负载图和直方图导出示例:


**Related example:** [Gantt. Export Gantt with resource load diagram to PDF](https://snippet.dhtmlx.com/lw5xcm31)


**Related example:** [Gantt. Export Gantt with resource histogram to PDF](https://snippet.dhtmlx.com/i9me4oxl)


## 如何根据子任务计算任务进度

一种直接的方法是在子任务发生变化后立即更新父任务的进度。要遍历父任务，可以使用 [eachParent()](api/method/eachparent.md) 方法。

在下面的示例中，父任务的进度仅基于其子任务的进度:

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


**Related example:** [Gantt. Calculate progress of a parent task dynamically](https://snippet.dhtmlx.com/xuicd1q7)


在下一个示例中，父任务的进度是基于子任务的进度和持续时间来计算的:

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


[Calculate Progress of Summary Tasks](https://docs.dhtmlx.com/gantt/samples/08_api/16_dynamic_progress.html)


## 如何在时间线中垂直重新排序任务

[addTaskLayer()](api/method/addtasklayer.md) 方法允许向时间线添加自定义 HTML 元素，并支持垂直和水平拖动。

下面的示例演示了如何在时间线中垂直重新排序任务，类似于在网格中对任务重新排序:


**Related example:** [Gantt. Reorder tasks vertically in timeline](https://snippet.dhtmlx.com/fla78m0y)


另一个示例展示了如何重新排序拆分任务，并将任务定位在同一行:


**Related example:** [Gantt. Reorder split tasks vertically in timeline](https://snippet.dhtmlx.com/usfulweq)


## 如何在网格中冻结/固定列

可以通过 CSS 实现该效果。你想要固定的列应设置为 'relative' 定位，并且 'left' 属性应与滚动条的当前位置一致。为了保持同步，可以为滚动条添加事件监听器，并相应地调整 CSS 变量:

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

为配合上述代码，请添加以下 CSS 样式:

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


**Related example:** [Gantt. Frozen column in Grid (via CSS)](https://snippet.dhtmlx.com/jbiplpjz)


另外，你还可以设置[多个网格视图](guides/layout-config.md)，但这种方式与内联编辑器兼容性不佳:

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


**Related example:** [Gantt. Fixed column in Grid (several grid views)](https://snippet.dhtmlx.com/8dg2r8m9)


## 如何为甘特图添加图例

Gantt 本身没有内置添加图例的功能。最接近的方案是使用 [Overlay 扩展](guides/baselines.md#weitubiaotianjiaewaifugaiceng)，但它并不完全相同，且自定义能力有限。

不过，添加图例其实很简单。你可以在 HTML 中创建图例元素，然后将其插入到 gantt 容器中，例如:

~~~js
gantt.$root.appendChild(legend);
~~~

以下是一个实际示例，点击甘特图上方的 "Toggle legend" 按钮后会显示图例:


**Related example:** [Gantt. Add information legend](https://snippet.dhtmlx.com/1ui0lim5)

))

为了增加交互性，可以直接为图例元素添加事件监听器，或通过事件委托在 gantt 根节点处理事件:

~~~js
gantt.event(gantt.$root, "click", function(e){
    var closest = gantt.utils.dom.closest;
    if(closest(e.target, ".gantt-legend")) {
        gantt.message("Mouse click inside the legend element");
    }
});
~~~


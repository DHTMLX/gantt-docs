---
title: "操作指南"
sidebar_label: "操作指南"
---

# 操作指南

## 如何切换网格/图表

如果使用默认布局配置，您可以修改 [show_grid](api/config/show_grid.md) 或 [show_chart](api/config/show_chart.md) 参数，并使用 [render()](api/method/render.md) 方法重新绘制变更。

~~~js
function toggleGrid(){
    gantt.config.show_grid = !gantt.config.show_grid;
    gantt.render();
}
~~~

**相关示例**  [Gantt. Toggle grid (default layout)](https://snippet.dhtmlx.com/gnloz505)

~~~js
function toggleChart(){
    gantt.config.show_chart = !gantt.config.show_chart;
    gantt.render();
}
~~~

**相关示例**  [Gantt. Toggle timeline (default layout)](https://snippet.dhtmlx.com/kqe1hqp2)
 
如果使用自定义布局配置，您需要创建多种布局配置 —— 同时包含网格/时间线和不包含网格/时间线的情况。要在它们之间切换，需要修改 [gantt.config.layout](api/config/layout.md) 参数并应用 [init()](api/method/init.md) 方法以查看变更：

~~~js
let showGrid = true;

function toggleGrid() {
    showGrid = !showGrid;
    if (showGrid) {
        gantt.config.layout = gridAndChart; // 同时包含网格和时间线的布局
    }
    else {
        gantt.config.layout = onlyChart; // 仅包含时间线的布局

    }
    gantt.init("gantt_here");
}
~~~

**相关示例**  [Gantt. Toggle grid (custom layout)](https://snippet.dhtmlx.com/omk98l0x)

~~~js
let showChart = true;

function toggleChart() {
    showChart = !showChart;
    if (showChart) {
        gantt.config.layout = gridAndChart; // 同时包含网格和时间线的布局
    }
    else {
        gantt.config.layout = onlyGrid; // 仅包含网格的布局

    }
    gantt.init("gantt_here");
}
~~~

**相关示例**  [Gantt. Toggle timeline (custom layout)](https://snippet.dhtmlx.com/aukjyqc8)

## 如何切换资源视图

与前面的用例类似，您需要创建多种布局配置 —— 同时包含资源视图和不包含资源视图。要在它们之间切换，需要修改 [gantt.config.layout](api/config/layout.md) 参数并应用 [init()](api/method/init.md) 方法以查看变更：

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

**相关示例**  [Gantt. Toggle resource load diagram](https://snippet.dhtmlx.com/vbaczl07)

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

**相关示例**  [Gantt. Toggle resource histogram](https://snippet.dhtmlx.com/isn2ger4)

或者，您也可以通过使用布局视图并重新初始化 Gantt 来查看变更来生成布局：

**相关示例**  [Gantt. Generate layout](https://snippet.dhtmlx.com/3dnzfhit)

## 如何在时间线实现无限滚动

实现无限滚动有多种方式，但在大多数情况下，您需要修改显示的日期范围（[gantt.config.start_date](api/config/start_date.md) 和 [gantt.config.end_date](api/config/end_date.md) 参数）：

### 使用滚动条时

您需要获取 [scroll position](api/event/onganttscroll.md) 并增加日期范围。请注意，过于频繁地重新绘制 Gantt 将影响性能，因此需要在超时后再进行绘制：

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

**相关示例**  [Gantt. Infinite scroll while using scrollbar](https://snippet.dhtmlx.com/4u52p5g3)

### 拖动时间线时

您需要获取当前滚动位置，并在时间线起始或结束附近时增加显示的日期范围：

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

**相关示例**  [Gantt. Infinite scroll while dragging the timeline](https://snippet.dhtmlx.com/zqob7lz5)

### 拖动任务时

如果未设置日期范围，您可以在任务拖动接近时间线起点或终点时每次调用 [render()](api/method/render.md) 方法来重新绘制：

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

**相关示例**  [Gantt. Infinite scroll while dragging a task (default range settings)](https://snippet.dhtmlx.com/44qcunjc)

如果已经设置了 [date range](api/config/start_date.md)，则需要修改它：

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

**相关示例**  [Gantt. Infinite scroll while dragging a task (explicit range settings)](https://snippet.dhtmlx.com/3lrm0wyp)

## 如何动态加载任务

您可以在 [onGanttScroll](api/event/onganttscroll.md) 事件中检测滚动到底部可见任务，并使用 [parse()](api/method/parse.md) 方法加载新任务：

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

**相关示例**  [Gantt. Load data dynamically](https://snippet.dhtmlx.com/39l7o0rm)

## 如何用按钮展开/折叠所有任务

您可以使用 [open()](api/method/open.md) 和 [close()](api/method/close.md) 方法来打开和关闭某个任务。要对图表中的所有任务执行此操作，您需要在 [eachTask()](api/method/eachtask.md) 函数中使用该方法。要仅绘制一次变更，您可以将函数包裹在 [batchUpdate()](api/method/batchupdate.md) 方法中：

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

**相关示例**  [Gantt. Add collapse/expand buttons into Gantt header](https://snippet.dhtmlx.com/z7o5qt9s)

**相关示例**  [Gantt. Collapse/expand all tasks](https://snippet.dhtmlx.com/72zahagy)

## 如何在网格单元格/表头显示多行文本

这可以通过添加一些样式规则实现。

网格表头：

~~~css
.gantt_grid_head_text{
    line-height: 12px;
    white-space:normal;
}
~~~

**相关示例**  [Gantt. Multiline text in the grid header](https://snippet.dhtmlx.com/lx70v5hw)

网格单元格：

~~~css
.gantt_tree_content, .gantt_task_content{
    line-height: 12px;
    white-space:normal;
    overflow-wrap: break-word; 
}
~~~

**相关示例**  [Gantt. Multiline text in Grid cells and Timeline](https://snippet.dhtmlx.com/55uy7ibo)

**相关示例**  [Gantt. Multiline text in cells of a Grid column](https://snippet.dhtmlx.com/bwil9sxs)

## 如何在网格中添加自定义列

要添加自定义列，您需要修改 [gantt.config.columns](api/config/columns.md) 参数。如果指定了 **name** 参数，Gantt 将返回具有同名的任务属性的值。您还可以使用 [template()](guides/specifying-columns.md#datamappingandtemplates) 函数返回任意自定义日期或 HTML 元素。

~~~js
gantt.config.columns = [
    /*
    其他列
    */
    {
        name: "progress", label: "Progress", width: 50, resize: true, align: "center", 
        template: function (task) {
            return Math.round(task.progress * 100) + "%"
        }
    },
    /*
    其他列
    */
];
~~~ 

**相关示例**  [Gantt. Custom column with template for task progress](https://snippet.dhtmlx.com/t5ba0gzu)

**相关示例**  [Gantt. Custom column with template for action buttons](https://snippet.dhtmlx.com/gfsdp121)

## 如何添加自定义（添加）按钮

您需要通过 [gantt.config.columns](api/config/columns.md) 参数创建自定义列。您可以为该列设置任意名称，除了 *add*，否则 Gantt 将添加默认的 *add* 列。可以在网格列中使用 [template](guides/specifying-columns.md#datamappingandtemplates) 函数返回任意 HTML 元素，并附加一个点击事件来实现添加任务的自定义逻辑。

~~~js
gantt.config.columns = [
    /*
    其他列
    */
    {
        name: "add_tasks", label: "+", width: 50, resize: true, align: "center", 
        template: function (task) {
            return `<button onclick='addTask(${task.id})';>`
        }
    },
];
~~~ 

**相关示例**  [Gantt. Custom columns with templates for add (+) buttons](https://snippet.dhtmlx.com/o36jnko3)

## 如何添加自定义刻度

您需要创建一个 [自定义刻度单位](guides/configuring-time-scale.md#customtimeunits) 并添加计算日期的逻辑。

一个带工作轮班小时（06:30, 18:30）自定义刻度的示例：

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

**相关示例**  [Gantt. Custom work shift hours on the scale](https://snippet.dhtmlx.com/0l49yvp2)

带数字而非天数的自定义刻度示例：

~~~js
gantt.config.scales = [
    {
        unit: "day", step: 1, format: function (date) {
            return gantt.getScale().trace_indexes[+date] + 1
        }
    }
]
~~~ 

**相关示例**  [Gantt. Numbers of days on the scale](https://snippet.dhtmlx.com/06bp4wdl)

一个带有5天工作周的自定义刻度示例：

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

**相关示例**  [5-day work weeks on the scale](https://snippet.dhtmlx.com/eq70o558)

一个以周为单位、但年份内的周数自定义刻度示例（周数从年初第一天开始）：

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

**相关示例**  [Gantt. Weeks of the year on the scale](https://snippet.dhtmlx.com/gbowxpmr)

## 如何复制与粘贴任务

您可以使用 [copy()](api/method/copy.md) 方法创建任务对象的深拷贝。然后，您可以更改克隆任务的 ID。之后，您可以使用 [addTask()](api/method/addtask.md) 或 [createTask()](api/method/createtask.md) 方法添加克隆任务。

以下示例演示如何添加一个按钮来克隆任务：

~~~js
function clone_task(id) {
    const task = gantt.getTask(id);
    const clone = gantt.copy(task);
    clone.id = +(new Date());
    gantt.addTask(clone, clone.parent, clone.$index)
}

gantt.config.columns = [
    /*
    其他列
    */
    {
        name: "clone", label: "clone", width: 44, template: function (task) {
            return "<input type="button" value='V' onclick="clone_task("" + task.id + ")>"
        }
    }
];
~~~ 

**相关示例**  [Gantt. Clone a task](https://snippet.dhtmlx.com/ii9u6wbe)

下面的示例展示了如何克隆一个任务及其所有子任务和链接：

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
  其他列
  */
  {
    name: "clone", label: "clone", width: 44, template: function (task) {
      return "<input type="button" value='V' onclick="clone_task("" + task.id + ")>"
    }
  }
];
~~~ 

**相关示例**  [Gantt. Clone a task with all its subtasks and links](https://snippet.dhtmlx.com/b33jfmws)

再举一个示例，展示如何通过键盘导航实现复制（选中任务，使用 Ctrl + C 复制，按 Ctrl + V 将其作为子任务粘贴到所选任务下）：

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

**相关示例**  [Gantt. Copy and paste tasks via Ctrl+C, Ctrl+V](https://snippet.dhtmlx.com/kck3pnmh)

## 如何在导出的 PDF 文件中添加资源图表或自定义样式

您需要在导出时以 [raw](guides/export.md#exportingcustommarkupandstyles) 模式导出数据，并将样式包含在导出函数的 [header](guides/export.md#customstylefortheoutputfile) 或 [footer](guides/export.md#customstylefortheoutputfile) 参数中。

例如，您可以将自定义样式保存到变量中，然后将该变量添加到 [header](guides/export.md#customstylefortheoutputfile) 参数中

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

**相关示例**  [Gantt. Export Gantt to PDF (styles from a variable)](https://snippet.dhtmlx.com/51ds6zwa)

或者，您可以在页面上找到 \<style\> 元素，并按如下方式将其内容添加为导出的一部分：

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

**相关示例**  [Gantt. Export Gantt to PDF (styles from &lt;style&gt; element)](https://snippet.dhtmlx.com/6qwzclr2)

**相关示例**  [Gantt. Export Gantt with custom icons to PDF](https://snippet.dhtmlx.com/2lqhkfhh)

导出带有图例的 Gantt 的示例：

**相关示例**  [Gantt. Export Gantt with legend to PDF](https://snippet.dhtmlx.com/gz4ddlnl)

导出资源加载图和直方图的示例：

**相关示例**  [Gantt. Export Gantt with resource load diagram to PDF](https://snippet.dhtmlx.com/lw5xcm31)

**相关示例**  [Gantt. Export Gantt with resource histogram to PDF](https://snippet.dhtmlx.com/i9me4oxl)

## 如何根据子任务计算任务进度

实现此功能的一种简单方法是在更新子任务后计算父任务的进度。要遍历父任务，您可以使用 [eachParent()](api/method/eachparent.md) 方法。

在下列示例中，父任务的进度仅取决于子任务的进度：

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

**相关示例**  [Gantt. Calculate progress of a parent task dynamically](https://snippet.dhtmlx.com/xuicd1q7)

在下一个示例中，父任务的进度不仅取决于子任务的进度，还取决于它们的持续时间：

~~~js
function calculateSummaryProgress(task) {
    if (task.type !== gantt.config.types.project) return task.progress;

    let totalToDo = 0;
    let totalDone = 0;

    gantt.eachTask(child => {
        if (child.type !== gantt.config.types.project) {
            totalToDo += child.duration;
            totalDone += (child.progress || 0) * child.duration;
        }
    }, task.id);

    return totalToDo ? totalDone / totalToDo : 0;
}

function refreshSummaryProgress(id, submit) {
    if (!gantt.isTaskExists(id)) return;

    const task = gantt.getTask(id);
    const newProgress = calculateSummaryProgress(task);

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

gantt.attachEvent("onParse", () => {
    gantt.eachTask(task => {
        task.progress = calculateSummaryProgress(task);
    });
});

gantt.attachEvent("onAfterTaskUpdate", id => {
    refreshSummaryProgress(gantt.getParent(id), true);
});

gantt.attachEvent("onTaskDrag", id => {
    refreshSummaryProgress(gantt.getParent(id), false);
});

gantt.attachEvent("onAfterTaskAdd", id => {
    refreshSummaryProgress(gantt.getParent(id), true);
});

(() => {
    let idParentBeforeDeleteTask = 0;

    gantt.attachEvent("onBeforeTaskDelete", id => {
        idParentBeforeDeleteTask = gantt.getParent(id);
    });

    gantt.attachEvent("onAfterTaskDelete", () => {
        refreshSummaryProgress(idParentBeforeDeleteTask, true);
    });
})();

gantt.config.auto_types = true;

gantt.templates.progress_text = (start, end, task) =>
    `<span style='text-align:left;'>${Math.round(task.progress * 100)}% </span>`;

// 第二个模板用于隐藏项目类型的任务的拖拽进度
gantt.templates.task_class = (start, end, task) =>
    task.type === gantt.config.types.project ? "hide_project_progress_drag" : "";
~~~ 

[Calculate Progress of Summary Tasks](https://docs.dhtmlx.com/gantt/samples/08_api/16_dynamic_progress.html)


## 如何在时间线中垂直重新排序任务

您可以使用 [addTaskLayer()](api/method/addtasklayer.md) 方法在时间线中显示自定义 HTML 元素，并为其添加垂直和水平拖动的功能。

在下列示例中，它将像网格中的常规任务重新排序一样工作：

**相关示例**  [Gantt. Reorder tasks vertically in timeline](https://snippet.dhtmlx.com/fla78m0y)

在下一个示例中，您可以对拆分任务进行重新排序，并将任务放在同一行上：

**相关示例**  [Gantt. Reorder split tasks vertically in timeline](https://snippet.dhtmlx.com/usfulweq)

## 如何冻结/固定网格中的列

这可以通过使用 CSS 实现。您需要将需要固定的列设置为相对定位。将 left 参数设为与滚动条位置相同的值，因此，您可以为滚动条添加事件处理程序并更新 CSS 变量：

~~~js
gantt.attachEvent("onGanttReady", () => {
    const el = document.querySelector(".gantt_hor_scroll");
    if (el) {
        el.addEventListener("scroll", () => {
            document.documentElement.style.setProperty(
                "--gantt-frozen-column-scroll-left",
                `${el.scrollLeft}px`
            );
        });
    }
});

const textEditor = { type: "text", map_to: "text" };
const startDateEditor = { type: "date", map_to: "start_date" };
const endDateEditor = { type: "date", map_to: "end_date" };
const durationEditor = { type: "number", map_to: "duration", min: 0, max: 100 };

gantt.config.columns = [
    { name: "text", tree: true, width: 150, resize: true, editor: textEditor },
    { name: "start_date", align: "center", width: 120, resize: true,
        editor: startDateEditor },
    { name: "end_date", label: "End Time", align: "center", width: 120, resize: true,
        editor: endDateEditor },
    { name: "duration", align: "center", width: 80, resize: true,
        editor: durationEditor },
    { name: "progress", label: "Progress", width: 80, align: "center", resize: true },
    { name: "custom", label: "Custom", width: 180, align: "center", resize: true,
        template: task => Math.round(Math.random() * 100) },
    { name: "add", width: 44 }
];

gantt.config.layout = {
    css: "gantt_container",
    cols: [
        {
            rows: [
                { view: "grid", scrollable: true, scrollX: "scrollHor1",
                    scrollY: "scrollVer" },
                { view: "scrollbar", id: "scrollHor1", croll: "x", group: "hor" }
            ]
        },
        { resizer: true, width: 1 },
        {
            rows: [
                { view: "timeline", scrollX: "scrollHor", scrollY: "scrollVer" },
                { view: "scrollbar", id: "scrollHor", scroll: "x", group: "hor" }
            ]
        },
        { view: "scrollbar", id: "scrollVer" }
    ]
};
~~~ 

并添加 CSS 样式：

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

**相关示例**  [Gantt. Frozen column in Grid (via CSS)](https://snippet.dhtmlx.com/jbiplpjz)

另一种方式是添加 [若干网格视图](guides/layout-config.md)，但它与行内编辑器并不很兼容：

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
            rows: [
                {
                    group: "gantt",
                    cols: [
                        {
                            rows: [
                                { view: "grid", config: fixedColumn, bind: "task",
                                    scrollY: "gridScrollY" }
                            ]
                        },
                        {
                            rows: [
                                { view: "grid", bind: "task", scrollX: "gridScrollX",
                                    scrollable: true, scrollY: "gridScrollY" },
                                { view: "scrollbar", id: "gridScrollX" }
                            ]
                        },
                        { view: "scrollbar", id: "gridScrollY" }
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
                                { view: "timeline", scrollX: "scrollHor",
                                    scrollY: "scrollVer" },
                                { view: "scrollbar", id: "scrollHor" }
                            ]
                        },
                        { view: "scrollbar", id: "scrollVer" }
                    ]
                }
            ]
        }
    ]
};
~~~ 

**相关示例**  [Gantt. Fixed column in Grid (several grid views)](https://snippet.dhtmlx.com/8dg2r8m9)

## 如何为甘特图添加图例

Gantt 中没有内置的显示图例的方法，最接近的是 [Overlay extension](guides/baselines.md#extra-overlay-for-the-chart)，但它并不完全相同，且不易自定义。

不过，图例实现起来相对简单。您可以用 HTML 编写图例元素，然后将其注入到甘特图节点中：

~~~js
gantt.$root.appendChild(legend);
~~~

这里有一个实时示例，要显示图例，请点击甘特图顶部的“Toggle legend”按钮：

**相关示例**  [Gantt. Add information legend](https://snippet.dhtmlx.com/1ui0lim5)

若要实现交互性，您可以直接为图例元素添加 DOM 事件监听，或者在甘特图根节点上使用事件代理来监听 DOM 事件：

~~~js
gantt.event(gantt.$root, "click", function(e){
    const closest = gantt.utils.dom.closest;
    if(closest(e.target, ".gantt-legend")) {
        gantt.message("Mouse click inside the legend element");
    }
});
~~~
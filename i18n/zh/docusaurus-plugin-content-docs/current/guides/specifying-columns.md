---
title: "指定列"
sidebar_label: "指定列"
---

# 指定列

网格的列通过 [columns](api/config/columns.md) 参数进行配置。

![gantt_left](/img/gantt_left.png)

~~~js
// 默认列定义
gantt.config.columns = [
    { name: "text",       label: "Task name",  width: "*", tree: true },
    { name: "start_date", label: "Start time", align: "center" },
    { name: "duration",   label: "Duration",   align: "center" },
    { name: "add",        label: "",           width: 44 }
];
~~~

你可以查看描述如何为网格指定列的视频指南。

<iframe width="676" height="400" src="https://www.youtube.com/embed/-BoznxJmJIo" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


## 概览

默认情况下，网格包含 4 列：

1. 任务名称
2. 开始日期
3. 持续时间
4. “+” 列。具有 <code>name="add"</code> 的特殊列，用于显示 “+” 符号，允许用户为任务添加子任务。

:::note
备注：在网格中显示默认列时，无需指定 [columns](api/config/columns.md) 参数。
:::

[columns](api/config/columns.md) 参数是一个数组，其中每个对象表示一个单独的列。因此，例如，要在网格中定义 5 列：'Task', 'Start Date', 'End Date', 'Holder', 'Progress'，请按如下方式指定 [columns](api/config/columns.md) 参数：

~~~js
gantt.config.columns = [
    { name: "text",       label: "Task name",  tree: true, width: "*" },
    { name: "holder",     label: "Holder",     align: "center" },
    { name: "start_date", label: "Start time", align: "center" },
    { name: "end_date",   label: "End date",   align: "center" },
    { name: "progress",   label: "Progress",   align: "center" }
];

gantt.init("gantt_here");
~~~

其中 'text', 'holder', 'start_date', 'end_date', 'progress' 是 [数据属性的名称](guides/specifying-columns.md#datamappingandtemplates) 的名称。


## 显示任务的结束日期

当任务数据对象包含以 "%Y-%m-%d" 或 "%d-%m-%Y"（即不包含时分部分）格式的开始和结束日期时，默认格式的结果日期可能不符合预期。有关结束日期格式的更多详细信息，请参阅 [Task end date display & Inclusive end dates](guides/loading.md#taskenddatedisplayampinclusiveenddates) 指南条目。


## 对某些任务隐藏“Add”按钮

通过 CSS 隐藏 “Add” 按钮以防止用户向特定任务添加子任务，是一种相当简单的做法。

首先，使用 [grid_row_class](api/template/grid_row_class.md) 模板为每个任务行分配一个 CSS 类：

~~~js
gantt.templates.grid_row_class = ( start, end, task ) => {
    if ( task.$level > 1 ) {
        return "nested_task"
    }

    return "";
};
~~~
然后，为这样的行隐藏 “Add” 按钮：

~~~css
.nested_task .gantt_add {
    display: none !important;
}
~~~

**相关示例**： [Predefined Project Structure](https://docs.dhtmlx.com/gantt/samples/08_api/11_project_structure.html)


## 宽度

要设置列的宽度，请在相关列对象中使用 [width](api/config/columns.md) 属性：

~~~js
gantt.config.columns = [
    { name: "text",       label: "Task name",  width: "*", tree: true },
    { name: "start_date", label: "Start time", width: 150 },
    { name: "duration",   label: "Duration",   width: 120 }
];

gantt.init("gantt_here");
~~~

:::note
使用 '*' 值，使列占用剩余的所有空间。
:::

**注意**，网格列的宽度取决于两个属性：列的 [width](api/config/columns.md) 与 [grid_width](api/config/grid_width.md)。如果列的宽度之和与网格的宽度不相等，Gantt 将修改其中一个参数。

- 当通过 [gantt.init()](api/method/init.md) 初始化 Gantt 时，[width](api/config/columns.md) 是优先级最高的参数。

 
**相关示例**：初始化时列宽优先于网格宽度（Column width priority over grid width at initialization）

- 通过 [gantt.render()](api/method/render.md) 渲染时，[grid_width](api/config/grid_width.md) 是优先级最高的参数。

 
**相关示例**：渲染时网格宽度优先于列宽（Grid width priority over column width during rendering）

- 通过 [gantt.init()](api/method/init.md) 初始化并且列宽未指定或设为 `'*'` 时，[grid_width](api/config/grid_width.md) 将成为优先值。

**相关示例**：初始化时列宽未定义或设为 `'*'` 时的网格宽度优先（Grid width priority when column width is undefined or set to `'*'` at initialization）

### 最小/最大列宽

可以使用 **min_width/max_width** 属性，在调整大小操作时限制列宽：

~~~js
gantt.config.columns = [
    { name: "text",       label: "Task name",  width: "*", tree: true, min_width: 150, max_width: 300 },
    { name: "start_date", label: "Start time", width: 150 },
    { name: "duration",   label: "Duration",   width: 120 }
];

gantt.init("gantt_here");
~~~

:::note
列的 **min_width** 属性在优先级上高于 gantt 的 [min_grid_column_width](api/config/min_grid_column_width.md) 属性。
:::

### 调整大小时的最小网格宽度

通过 [gantt.config.min_grid_column_width](api/config/min_grid_column_width.md) 选项定义网格可被调整到的最小宽度。该选项定义在调整网格宽度时每列可调整的最小宽度：

~~~js
gantt.config.columns = [
    { name: "text",       label: "Task name",  width: 150, tree: true },
    { name: "start_date", label: "Start time", width: 100 },
    { name: "duration",   label: "Duration",   width: 50 }
];

gantt.config.min_grid_column_width = 30; // 网格最小宽度可以调整到 90 px

gantt.init("gantt_here");
~~~

**相关示例**： [Minimal grid width](https://snippet.dhtmlx.com/zdza8tws)

请注意，调整网格宽度时网格的最小宽度还取决于 'add' 列的最小宽度（默认为 44）。若要将网格调整到小于 44 px，请在 'add' 列对象中指定 [min_width](api/config/columns.md) 选项：

~~~js
{ name: "add", label: "", min_width: 1 }
~~~


## 数据映射与模板 {#datamappingandtemplates}

默认情况下，dhtmlxGantt 使用与列名对应的数据属性来填充网格。例如，如果为某列设置 **name:"holder"**，dhtmlxGantt 将在输入的 JSON 数据中查找相应的数据属性，如果存在，则将其加载到该列。

#### 使用模板来定义列数据

如果你想在某列中展示多个数据属性的混合，可以为该列使用任意名称，但通过 [columns](api/config/columns.md) 参数的 **template** 属性来设置数据模板。  
例如，你可以为某列指定 **name:"staff"**，并定义一个模板函数，返回要加载到该列中的 *holder* 和 *progress* 数据属性。

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


## 文字对齐

要设置列中文本的水平对齐，请在相关列对象中使用 [align](api/config/columns.md) 属性：

~~~js
gantt.config.columns = [
    { name: "text",       label: "Task name",  align: "center", tree: true },
    { name: "start_date", label: "Start time", align: "center" },
    { name: "duration",   label: "Duration",   align: "center" }
];

gantt.init("gantt_here");
~~~


## WBS 码 {#wbscode}

你可以添加一列，用以显示任务的轮廓编号（它们的 WBS 码）。要实现这一点，需要在列模板中使用 [getWBSCode](api/method/getwbscode.md) 方法。

~~~js
gantt.config.columns = [
    { name: "wbs",        label: "WBS",        width: 40,  template: gantt.getWBSCode }, 
    { name: "text",       label: "Task name",  width: 170, tree: true },
    { name: "start_date", label: "Start time", width: 90,  align: "center" },
    { name: "duration",   label: "Duration",   width: 60,  align: "center" },
    { name: "add",        width: 40 }
];
~~~


**相关示例**： [Show Task WBS Codes (Outline Numbers)](https://docs.dhtmlx.com/gantt/samples/07_grid/09_wbs_column.html)


### 获取任务的 WBS 码

[getWBSCode](api/method/getwbscode.md) 方法返回所需任务的 WBS 码。比如，我们将以下任务加载到 gantt：

~~~js
gantt.parse({
    tasks: [
        { id: 1, text: "Project", start_date: "28-03-2025", duration: 5, open: true },
        { id: 2, text: "Task #1", start_date: "01-04-2025", duration: 3, parent: 1 },
        { id: 3, text: "Task #2", start_date: "02-04-2025", duration: 4, parent: 1 }
    ],
    links: []
});
~~~

我们想获取 id="3" 的任务的 WBS 码。为此，将任务对象作为参数传递给 [getWBSCode](api/method/getwbscode.md) 方法。它将返回该任务的 WBS 码字符串：

~~~js
const wbsCode = gantt.getWBSCode(gantt.getTask(3)); // -> returns "1.2"
~~~


### 通过 WBS 码获取任务对象

你也可以通过将任务的 WBS 码传递给 [getWBSCode](api/method/gettaskbywbscode.md) 方法来获取任务对象：

~~~js
const task = gantt.getTaskByWBSCode("1.2");
// => { id: 3, text: "Task #2", start_date: …}
~~~


## 任务的时间约束 {#timeconstraintsfortasks}

你可以添加单独的网格列，允许为任务设置 [time constraint](guides/auto-scheduling.md#timeconstraintsfortasks) 的类型以及若所选类型需要的约束日期。这些列分别使用名称 "constraint_type" 和 "constraint_date"。

~~~js
gantt.config.columns = [
    { name: "constraint_type", align: "center", width: 100, resize: true,
        editor: constraintTypeEditor, template: (task) => { //template logic }
    },
    { name: "constraint_date", align: "center", width: 120, resize: true,
        editor: constraintDateEditor, template: (task) => { //template logic }
    },
    ...
];
~~~

这些列链接到内联编辑器对象，允许在网格中为任务选择必要的约束类型并直接编辑其日期。

~~~js
const constraintTypeEditor = {
    type: "select", map_to: "constraint_type", options: [
        { key: "asap", label: gantt.locale.labels.asap },
        { key: "alap", label: gantt.locale.labels.alap },
        { key: "snet", label: gantt.locale.labels.snet },
        { key: "snlt", label: gantt.locale.labels.snlt },
        { key: "fnet", label: gantt.locale.labels.fnet },
        { key: "fnlt", label: gantt.locale.labels.fnlt },
        { key: "mso", label: gantt.locale.labels.mso },
        { key: "mfo", label: gantt.locale.labels.mfo }
    ]
};

const constraintDateEditor = {
    type: "date", 
    map_to: "constraint_date", 
    min: new Date(2025, 0, 1), 
    max: new Date(2030, 0, 1)
};
~~~


**相关示例**： [Auto-Schedule From Project Start & Constraints](https://docs.dhtmlx.com/gantt/samples/02_extensions/19_constraints_scheduling.html)


## 调整列宽 {#resizing}

:::info
此功能仅在 PRO 版本中可用
:::

要通过拖动右列边界让用户可以调整列宽，请在相关列对象中使用 [resize](api/config/columns.md) 属性：

~~~js
gantt.config.columns = [
    { name: "text",       resize: true, tree: true, width: "*" }, // 启用 'resize'
    { name: "start_date", resize: true, min_width: 100 }, // 受 'min_width' 限制
    { name: "duration",   align: "center" },              // 无法调整大小
    { name: "add",        width: "44" }
];
~~~


**相关示例**： [Grid columns resize events](https://docs.dhtmlx.com/gantt/samples/02_extensions/04_grid_resize.html)


要通过拖动网格边界使整个网格可调整大小，请使用 [gantt.config.layout](api/config/layout.md) 选项，并在其中指定网格与调整器对象及所需配置。

~~~js
gantt.config.layout = {
    css: "gantt_container",
    rows: [
        {
            cols: [
                { view: "grid", id: "grid", scrollX: "scrollHor",
                    scrollY: "scrollVer"
                },
                { resizer: true, width: 1 },
                { view: "timeline", id: "timeline", scrollX: "scrollHor",
                    scrollY: "scrollVer"
                },
                { view: "scrollbar", id: "scrollVer", scroll: "y" }
            ]
        },
        { view: "scrollbar", id: "scrollHor", scroll: "x", height: 20 }
    ]
};

gantt.init("gantt_here");
~~~

若要在调整列宽时保持网格的大小，请将 [keep_grid_width](api/config/keep_grid_width.md) 选项设为 *true*：

~~~js
gantt.config.columns = [
    { name: "text",       width: "*", tree: true, resize: true },
    { name: "start_date", width: 100, align: "center" },
    { name: "duration",   width: 70, align: "center" },
    { name: "add",        width: 44 }
];

gantt.config.keep_grid_width = true; /*!*/
gantt.init("gantt_here");
~~~


**相关示例**： [Grid columns resize events](https://docs.dhtmlx.com/gantt/samples/02_extensions/04_grid_resize.html)


### 事件

dhtmlxGantt 提供 6 个用于处理调整大小行为的事件：

- [onColumnResizeStart](api/event/oncolumnresizestart.md) - 在用户开始拖动列边界调整列宽之前触发
- [onColumnResize](api/event/oncolumnresize.md) - 当用户拖动列边界调整列宽时触发
- [onColumnResizeEnd](api/event/oncolumnresizeend.md) - 在用户完成拖动列边界调整列宽后触发
- [onGridResizeStart](api/event/ongridresizestart.md) - 在用户开始拖动网格边界调整网格之前触发
- [onGridResize](api/event/ongridresize.md) - 当用户拖动网格边界调整网格时触发
- [onGridResizeEnd](api/event/ongridresizeend.md) - 在用户完成拖动网格边界调整网格后触发


## 可见性 {#visibility}

要控制列的可见性，请在相关列对象中使用 [hide](api/config/columns.md) 属性。

可通过改变 'hide' 属性的值并刷新 Gantt 图动态切换可见性：

~~~jsx title="Switching between basic and detailed view"
gantt.config.columns = [
    { name: "text",          label: "Task name", width: "*", tree: true, resize: true },
    { name: "start_date",    label: "Start time" },
    { name: "duration",      label: "Duration",      width: 60, hide: true }, 
    { name: "planned_start", label: "Planned start", width: 80, hide: true }, 
    { name: "planned_end",   label: "Planned end",   width: 80, hide: true },
    { name: "add",           label: "",              width: 36 }
];

const showDetails = false;

function toggleView() {
    showDetails = !showDetails;
    gantt.getGridColumn("duration").hide = !showDetails;
    gantt.getGridColumn("planned_start").hide = !showDetails;
    gantt.getGridColumn("planned_end").hide = !showDetails;

    if (showDetails) {
        gantt.config.grid_width = 600;
    } else {
        gantt.config.grid_width = 300;
    }

    gantt.render();
};

gantt.init("gantt_here");
~~~


**相关示例**： [Hiding grid columns](https://docs.dhtmlx.com/gantt/samples/02_extensions/07_managing_grid_columns.html)


你可以查看演示网格中列可见性的 视频指南。

<iframe width="676" height="400" src="https://www.youtube.com/embed/rqYrqqoaI_U" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


## 渲染后修改单元格 {#modifyingcellsafterrendering}

在某些情况下，您可能需要在单元格渲染后改变网格单元格的外观或行为。

自 v7.1 版起，库提供了 [columns](api/config/columns.md) 参数的 **onrender** 属性，帮助您在渲染后修改单元格，例如：

~~~js
gantt.config.columns = [
    { name: "text", tree: true, width: "*", resize: true },
    { name: "start_date", align: "center", resize: true },
    { name: "duration",   align: "center", onrender: (task, node) => {
        node.setAttribute("title", task.text);
    } },
    { name: "add", width: 44 }
];
~~~


另一种使用 **onrender** 回调的方法是将外部组件注入到网格单元格中。例如，当你在 React 中使用 DHTMLX Gantt，需要将 React 组件注入到 Gantt 的网格单元格中。下面的代码示例展示了如何实现：

~~~js
gantt.config.columns = [
    { name: "text",       label: "Task name", tree: true, width: "*" },
    { name: "start_date", label: "Start time", align: "center" },
    { name: "duration",   label: "Duration",   align: "center" },
    { 
        name: "external", label: "Element 1",  align: "center",
        onrender: (item, node) => {
            return <DemoButton
                text="Edit 1"
                onClick="{()" => alert("Element as React Component")}
            />
        }
    }
];
~~~


要使其正常工作并显示 React 组件，必须定义 [gantt.config.external_render](api/config/external_render.md) 配置：

~~~js
import ReactDOM from 'react-dom';
import React from 'react';

gantt.config.external_render = { 
    // 检查元素是否是 React 元素
    isElement: (element) => {
        return React.isValidElement(element);
    },
    // 将 React 元素渲染到 DOM 中
    renderElement: (element, container) => {
        ReactDOM.render(element, container);
    }
};
~~~

逻辑如下：

- 首先，**onrender** 回调的返回对象将传递给 **isElement** 函数，以验证它是否是可由所使用的框架/库渲染的对象。
- 如果 **isElement** 返回 true，则对象将传递给 **renderElement**，该函数应在单元格的 DOM 元素中初始化该组件对象。


## 水平滚动条

你可以使用 [layout](guides/layout-config.md) 配置选项的 **scrollable** 属性使网格可滚动。  
[关于将布局视图绑定到滚动条的说明](guides/layout-config.md#scrollbar)。

网格中存在水平滚动条时，Gantt 将在调整网格宽度时自动调整列宽。有关如何启用此功能的更多信息，请参阅 [grid_elastic_columns.md](api/config/grid_elastic_columns.md)。

除了 **scrollable** 属性外，你还需要在布局中添加一个水平滚动条元素，并按如下方式将其连接到网格：

~~~js
gantt.config.layout = {
    css: "gantt_container",
    cols: [
        {
            width: 400,
            minWidth: 200,
            maxWidth: 600,

            // 通过 scrollX 属性向网格添加水平滚动条
            rows: [
                { view: "grid", scrollX: "gridScroll", scrollable: true, /*!*/
                    scrollY: "scrollVer" /*!*/
                }, /*!*/
                { view: "scrollbar", id: "gridScroll" } /*!*/
            ]
        },
        { resizer: true, width: 1 },
        {
            rows: [
                { view: "timeline", scrollX: "scrollHor", scrollY: "scrollVer" },
                { view: "scrollbar", id: "scrollHor" }
            ]
        },
        { view: "scrollbar", id: "scrollVer" }
    ]
};
~~~


由于你会为网格和时间轴显示单独的滚动条，你可能希望同步它们的可见性，这样两个滚动条就会同时可见或同时隐藏。

![scrollable_grid](/img/scrollable_grid.png)

可以通过将两个滚动条分配到同一个 *visibility group* 来实现：

~~~js
gantt.config.layout = {
    css: "gantt_container",
    cols: [
        {
            width: 400,
            minWidth: 200,
            maxWidth: 600,
            rows: [
                { view: "grid", scrollX: "gridScroll", scrollable: true,
                    scrollY: "scrollVer"
                },
                // 网格的水平滚动条
                { view: "scrollbar", id: "gridScroll", group: "horizontal" } 
            ]
        },
        { resizer: true, width: 1 },
        {
            rows: [
                { view: "timeline", scrollX: "scrollHor", scrollY: "scrollVer" },
                // 时间轴的水平滚动条
                { view: "scrollbar", id: "scrollHor", group: "horizontal" } 
            ]
        },
        { view: "scrollbar", id: "scrollVer" }
    ]
};
~~~


如果分配到同一组的滚动条中至少有一个可见，该组的所有滚动条都将可见。

**相关示例**： [Horizontal scroll inside Grid](https://docs.dhtmlx.com/gantt/samples/07_grid/10_scrollable_grid.html)


## 样式化

有关网格单元格样式的信息，请查看 [Work with Gantt Styles](guides/styling-guide.md#styling-grid)。
---
title: "指定列"
sidebar_label: "指定列"
---

# 指定列


可以通过 [columns](api/config/columns.md) 参数设置网格列。

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

我们还为如何配置网格列提供了视频教程。

<iframe width="676" height="400" src="https://www.youtube.com/embed/-BoznxJmJIo" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## 概述


默认情况下，网格显示 4 列:

1. Task name
2. Start date
3. Duration 
4. "+" 列。此特殊列，<code>name="add"</code>，显示一个"+"号，允许用户添加子任务。

:::note
注意，无需指定 [columns](api/config/columns.md) 参数即可在网格中显示默认列。
:::

[columns](api/config/columns.md) 参数是一个数组，每个对象定义一列。
例如，要定义名为 'Task'、'Start Date'、'End Date'、'Holder' 和 'Progress' 的 5 列，可以这样设置 [columns](api/config/columns.md) 参数:

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

这里，'text'、'holder'、'start_date'、'end_date' 和 'progress' 对应于[数据属性的名称](guides/specifying-columns.md#shujuyingsheyumoban)。

## 显示任务结束日期


如果任务数据对象包含格式为 "%Y-%m-%d" 或 "%d-%m-%Y"（不含小时和分钟）的开始和结束日期，默认格式下显示的结束日期可能不是你期望的。有关结束日期格式化的详细信息，请参阅 [Task end date display & Inclusive end dates](guides/loading.md#taskenddatedisplayampinclusiveenddates) 文章。

## 为特定任务隐藏"添加"按钮


一种简单的方式是通过 CSS 隐藏"Add"按钮，防止用户为某些任务添加子任务。

1. 首先，使用 [grid_row_class](api/template/grid_row_class.md) 模板为每一行任务分配 CSS 类:
~~~js
gantt.templates.grid_row_class = ( start, end, task ) => {
    if ( task.$level > 1 ) {
        return "nested_task"
    }

    return "";
};
~~~
2. 然后，用 CSS 隐藏这些行中的"Add"按钮:

~~~css
.nested_task .gantt_add {
    display: none !important;
}
~~~


[Predefined Project Structure](https://docs.dhtmlx.com/gantt/samples/08_api/11_project_structure.html)


## 宽度


要控制列的宽度，可在配置对象中使用 [width](api/config/columns.md) 属性:

~~~js
gantt.config.columns = [
    { name: "text",       label: "Task name",  width: "*", tree: true },
    { name: "start_date", label: "Start time", width: 150 },
    { name: "duration",   label: "Duration",   width: 120 }
];

gantt.init("gantt_here");
~~~

:::note
使用 '*' 作为宽度会让该列占据所有剩余空间。
:::

请注意，网格列的宽度取决于两项设置:列的 [width](api/config/columns.md) 和整体 [grid_width](api/config/grid_width.md)。如果所有列宽之和与网格宽度不一致，Gantt 会调整其中之一。

- 使用 [gantt.init()](api/method/init.md) 初始化 gantt 时，列的 [width](api/config/columns.md) 优先。


**Related example:** [Column width priority over grid width at initialization](https://snippet.dhtmlx.com/itnvg6z9)

- 使用 [gantt.render()](api/method/render.md) 渲染 gantt 时，[grid_width](api/config/grid_width.md) 优先。


**Related example:** [Grid width priority over column width during rendering](https://snippet.dhtmlx.com/4nb67z61)

- 通过 [gantt.init()](api/method/init.md) 初始化 gantt 且列宽未设置或为 **'*'** 时，[grid_width](api/config/grid_width.md) 优先。


**Related example:** [Grid width priority when column width is undefined or set to '*' at initialization](https://snippet.dhtmlx.com/qej8w5ix)


### 最小/最大列宽

你可以通过 **min_width** 和 **max_width** 属性限制列在调整大小时的宽度:

~~~js
gantt.config.columns = [
    { name: "text",       label: "Task name",  width: "*", tree: true, min_width: 150,
        max_width: 300
    },
    { name: "start_date", label: "Start time", width: 150 },
    { name: "duration",   label: "Duration",   width: 120 }
];

gantt.init("gantt_here");
~~~

:::note
列的 **min_width** 属性会覆盖 gantt 的 [min_grid_column_width](api/config/min_grid_column_width.md) 设置。
:::

### 调整大小时的最小网格宽度

网格可调整到的最小宽度由 [gantt.config.min_grid_column_width](api/config/min_grid_column_width.md) 设置。该选项定义了调整网格大小时每列的最小宽度:

~~~js
gantt.config.columns = [
    { name: "text",       label: "Task name",  width: 150, tree: true },
    { name: "start_date", label: "Start time", width: 100 },
    { name: "duration",   label: "Duration",   width: 50 }
];

gantt.config.min_grid_column_width = 30; // 网格总宽度最小可调整到 90 px

gantt.init("gantt_here");
~~~


**Related example:** [Minimal grid width](https://snippet.dhtmlx.com/zdza8tws)


另外，调整大小时的最小网格宽度还受"add"列的最小宽度影响（默认为 44）。如果要将网格缩小到小于 44 px，请为"add"列设置 [min_width](api/config/columns.md):

~~~js
{ name: "add", label: "", min_width: 1 }
~~~

## 数据映射与模板


默认情况下，dhtmlxGantt 使用与列名相同的数据属性填充网格。例如，如果某列为 **name:"holder"**，dhtmlxGantt 会查找 JSON 数据中的 'holder' 属性，并在该列显示。

#### 为列数据使用模板

如果你希望在一列中显示多个数据属性的组合，可以为该列指定任意名称，并通过 [columns](api/config/columns.md) 参数的 **template** 属性设置数据模板。

例如，你可以将列命名为 **name:"staff"**，并创建一个模板函数，返回 *holder* 和 *progress* 属性的组合值:

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

## 文本对齐 


要设置列中文本的水平对齐方式，可在该列配置中使用 [align](api/config/columns.md) 属性:

~~~js
gantt.config.columns = [
    { name: "text",       label: "Task name",  align: "center", tree: true },
    { name: "start_date", label: "Start time", align: "center" },
    { name: "duration",   label: "Duration",   align: "center" }
];

gantt.init("gantt_here");
~~~

## WBS 编码 {#wbscode}


你可以添加一列来显示任务的大纲编号（WBS 编码）。为此，在该列的模板中使用 [getWBSCode](api/method/getwbscode.md) 方法。

~~~js
gantt.config.columns = [
    { name: "wbs",        label: "WBS",        width: 40, template: gantt.getWBSCode }, /*!*/
    { name: "text",       label: "Task name",  width: 170, tree: true },
    { name: "start_date", label: "Start time", width: 90,  align: "center" },
    { name: "duration",   label: "Duration",   width: 60,  align: "center" },
    { name: "add",        width: 40 }
];
~~~


[Show Task WBS Codes (Outline Numbers)](https://docs.dhtmlx.com/gantt/samples/07_grid/09_wbs_column.html)


### 获取任务的 WBS 编码

[getWBSCode](api/method/getwbscode.md) 方法返回指定任务的 WBS 编码。例如，如果你将如下任务加载到 gantt:

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

如果你想获取 id="3" 的任务的 WBS 编码，只需将该任务对象传递给 [getWBSCode](api/method/getwbscode.md)。它会返回 WBS 编码字符串:

~~~js
const wbsCode = gantt.getWBSCode(gantt.getTask(3)); // -> 返回 "1.2"
~~~

### 通过 WBS 代码获取任务

可以通过将任务的 WBS 代码传递给 [getTaskByWBSCode](api/method/gettaskbywbscode.md) 方法来获取任务对象:

~~~js
const task = gantt.getTaskByWBSCode("1.2");
// => { id: 3, text: "Task #2", start_date: …}
~~~


## 任务的时间约束


:::info
此功能仅在 PRO 版本中可用
:::

你可以添加特定的网格列，以便为任务设置[时间约束类型](guides/auto-scheduling.md#renwudeshijianyueshu)，以及在所选类型需要时设置约束日期。这些列分别命名为 "constraint_type" 和 "constraint_date"。

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

这些列与内联编辑器对象关联，可让你直接在网格中选择任务的约束类型并修改其日期。

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


[Auto-Schedule From Project Start & Constraints](https://docs.dhtmlx.com/gantt/samples/02_extensions/19_constraints_scheduling.html)


## 调整列宽


:::info
此功能仅在 PRO 版本中可用
:::

若要允许用户通过拖动列的右边框来调整列宽，需要在相应列的配置中启用 [resize](api/config/columns.md) 属性:

~~~js
gantt.config.columns = [
    { name: "text",       resize: true, tree: true, width: "*" }, // 启用 'resize'
    { name: "start_date", resize: true, min_width: 100 }, // 受 'min_width' 限制
    { name: "duration",   align: "center" },              // 未启用调整
    { name: "add",        width: "44" }
];
~~~


[Grid columns resize events](https://docs.dhtmlx.com/gantt/samples/02_extensions/04_grid_resize.html)


如果要让整个网格通过拖动边界进行缩放，请使用 [gantt.config.layout](api/config/layout.md) 选项，并定义包含合适设置的 grid 和 resizer 对象:

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

若要在调整列宽时保持网格宽度不变，可将 [keep_grid_width](api/config/keep_grid_width.md) 选项设置为 *true*:

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


[Grid columns resize events](https://docs.dhtmlx.com/gantt/samples/02_extensions/04_grid_resize.html)


### 事件

dhtmlxGantt 提供了 6 个与调整大小相关的事件:

- [onColumnResizeStart](api/event/oncolumnresizestart.md) - 用户开始拖动列边框调整大小前触发
- [onColumnResize](api/event/oncolumnresize.md) - 用户拖动列边框调整大小时触发
- [onColumnResizeEnd](api/event/oncolumnresizeend.md) - 用户完成拖动列边框调整大小后触发


- [onGridResizeStart](api/event/ongridresizestart.md) - 用户开始拖动网格边界调整大小前触发
- [onGridResize](api/event/ongridresize.md) - 用户拖动网格边界调整大小时触发
- [onGridResizeEnd](api/event/ongridresizeend.md) - 用户完成拖动网格边界调整大小后触发


## 列可见性


要控制列的可见性，请在列配置中使用 [hide](api/config/columns.md) 属性。


你可以通过动态更新 'hide' 属性并刷新 Gantt 图来改变列的可见性:

:::info
此功能仅在 PRO 版本中可用
:::

**在基础视图和详细视图之间切换**
~~~
gantt.config.columns = [
    { name: "text",          label: "Task name", width: "*", tree: true, resize: true },
    { name: "start_date",    label: "Start time" },
    { name: "duration",      label: "Duration",      width: 60, hide: true }, /*!*/
    { name: "planned_start", label: "Planned start", width: 80, hide: true }, /*!*/
    { name: "planned_end",   label: "Planned end",   width: 80, hide: true }, /*!*/
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


[Hiding grid columns](https://docs.dhtmlx.com/gantt/samples/02_extensions/07_managing_grid_columns.html)


此外，还提供了一个视频指南，演示如何管理网格中列的可见性。

<iframe width="676" height="400" src="https://www.youtube.com/embed/rqYrqqoaI_U" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


## 渲染后修改单元格


有时需要在网格单元格渲染后调整其外观或行为。

自 7.1 版本起，库在 [columns](api/config/columns.md) 配置中引入了 **onrender** 属性，可以用来在渲染后修改单元格，例如:

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


**onrender** 回调的另一个用例是将外部组件注入到网格单元格中。例如，如果你在 DHTMLX Gantt 中使用 React，并希望在单元格中插入 React 组件，可以参考如下代码:

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

要启用 React 组件的渲染，必须指定 [gantt.config.external_render](api/config/external_render.md) 配置:

~~~js
import ReactDOM from 'react-dom';
import React from 'react';

gantt.config.external_render = { 
    // 检查元素是否为 React 元素
    isElement: (element) => {
        return React.isValidElement(element);
    },
    // 在 DOM 中渲染 React 元素
    renderElement: (element, container) => {
        ReactDOM.render(element, container);
    }
};
~~~

流程说明如下:

- **onrender** 回调返回的对象会传递给 **isElement** 函数，用于判断其是否为当前框架/库可渲染的对象。
- 如果 **isElement** 返回 *true*，则对象会传递给 **renderElement**，在单元格 DOM 元素内部初始化组件。


## 水平滚动条


通过在 [layout](guides/layout-config.md) 配置中启用 **scrollable** 属性，可以让网格支持滚动。
[了解更多关于将布局视图绑定到滚动条的信息](guides/layout-config.md#gundongtiao)。

为网格添加水平滚动条后，Gantt 可在调整网格大小时自动调整列宽。[了解更多关于启用此功能的信息](api/config/grid_elastic_columns.md)。

除了设置 **scrollable** 属性外，还需要在布局中添加 *水平滚动条元素* 并将其与网格关联，如下所示:

~~~js
gantt.config.layout = {
    css: "gantt_container",
    cols: [
        {
            width: 400,
            minWidth: 200,
            maxWidth: 600,

            // 通过 scrollX 属性为网格添加水平滚动条
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

当为网格和时间线分别使用滚动条时，可以通过同步它们的可见性，使两者同时显示或隐藏。

![scrollable_grid](/img/scrollable_grid.png)

实现方法是将两个滚动条分配到同一个 *visibility group*:

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
                { view: "scrollbar", id: "gridScroll", group: "horizontal" } /*!*/
            ]
        },
        { resizer: true, width: 1 },
        {
            rows: [
                { view: "timeline", scrollX: "scrollHor", scrollY: "scrollVer" },
                // 时间线的水平滚动条
                { view: "scrollbar", id: "scrollHor", group: "horizontal" } /*!*/
            ]
        },
        { view: "scrollbar", id: "scrollVer" }
    ]
};
~~~

只要组内有任意一个滚动条可见，组内所有滚动条都会显示。


[Horizontal scroll inside Grid](https://docs.dhtmlx.com/gantt/samples/07_grid/10_scrollable_grid.html)


## 样式


关于网格单元格样式的详细信息，请参见 [Gantt 스타일 작업하기](guides/styling-guide.md)


---
sidebar_label: columns
title: columns config
description: "设置表格中的 columns"
---

# columns

### Description

@short: 配置表格的列

@signature: columns: GridColumn[]

### Example

~~~jsx
// 默认的columns定义
gantt.config.columns = [
    { name: "text",       label: "任务名称",  width: "*", tree: true },
    { name: "start_date", label: "开始时间",  align: "center" },
    { name: "duration",   label: "持续时间",  align: "center" },
    { name: "add",        label: "",           width: 44 }
];

gantt.init("gantt_here");
~~~

### Related samples
- [进度灯箱](https://docs.dhtmlx.com/gantt/samples/05_lightbox/02_progress_lightbox.html)

### Details

数组中的每个对象指定一个单独的列。对象可以带有以下属性：

- **align?** - (*string*) - 设置水平标题对齐。可选值：*'left'*, *'center'*, 或 *'right'*;
- **hide?** - (*boolean*) - 隐藏/显示列（PRO）;
- **label?** - (*string | number | any*) - 指定列的标题；
- **max_width?** - (*number*) - 在调整大小操作中设置列的最大宽度；
- **min_width?** - (*number*) - 在调整大小操作中设置列的最小宽度；
- **name?** - (*string | number*) - 定义列的 id。名称 'add' 允许你使用 '+' 符号来添加列；
- **resize?** - (*boolean*) - 通过拖动列边界来调整列宽的可能性（PRO）;
- **sort? (task1, task2): number** - (*boolean | string | Function*) - 点击列头后的排序配置。若该属性设为 *false*，则禁用排序。你也可以在 *string* 中设置不同的任务属性来排序该列，或使用自定义排序函数。
    - **_task1_** - (*Task*) - 将要排序的首个 Task 对象。
    - **_task2_** - (*Task*) - 将要排序的第二个 Task 对象。
- **template? (task): any** - 设置数据模板。
    - **_task_** - (*Task*) - Task 对象。
- **tree?** - (*boolean*) - 指示相关列应显示树状结构；
- **width?** - (*number | string*) - 定义列的宽度；
- **onrender? (task, node): any** - 可选，为将单元格渲染到 DOM 的回调函数。该函数接收一个 task 对象和网格单元的 DOM 元素作为参数，可能返回框架的一个组件。详见此处；
    - **_task_** - (*Task*) - 任务对象。
    - **_node_** - (*HTMLElement*) - Grid 单元的 HTML 元素。
- **editor?** - (*object*) - 附带的 inline 编辑器。
    - **_type_** - (*string*) - inline 编辑器的类型。
    - **_map_to_** - (*string*) - 指定 inline 编辑器应更新任务的哪一个属性。
    - **_min?_** - (*Date | number*) - 日期与持续时间类型的最小值。
    - **_max?_** - (*Date | number*) - 日期与持续时间类型的最大值。
    - **_options?_** - (*Array &lt;any&gt;*) - 具有选项的数组，用于 select 类型。
    - **_formatter?_** - (*DurationFormatter | LinkFormatter*) - 日期与前置类型的格式化器。

Grid 列的宽度取决于两个属性：列的 **width** 和 [grid_width](api/config/grid_width.md)。如果列宽之和不等于网格宽度，Gantt 将修改其中一个参数。

- 当通过 [gantt.init()](api/method/init.md) 初始化 Gantt 时，列的 **width** 具有优先级。

:::note
 [初始化时列宽相对于网格宽度的优先权](https://snippet.dhtmlx.com/itnvg6z9)
:::
- 当通过 [gantt.render()](api/method/render.md) 渲染 Gantt 时， [grid_width](api/config/grid_width.md) 具有优先权。

:::note
示例：[渲染时网格宽度优先于列宽](https://snippet.dhtmlx.com/4nb67z61)
:::
- 当通过 [gantt.init()](api/method/init.md) 初始化 Gantt，且列宽未指定或设为 **'*'** 时， [grid_width](api/config/grid_width.md) 将成为优先项。

:::note
示例：[初始化时列宽未定义或设为 '*' 时的 grid_width 优先](https://snippet.dhtmlx.com/qej8w5ix)
:::

The **template** 属性是一个函数，接受数据项对象作为参数并返回最终的数据模板。该函数定义允许你呈现几乎任何内容。

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
- [指定列](guides/specifying-columns.md)
- [How-tos](guides/how-to.md#how-to-add-a-custom-column-in-the-grid) （关于如何在grid中添加自定义column的详细说明）
- [How-tos](guides/how-to.md#how-to-add-a-custom-add-button) （添加自定义add(+)按钮的说明）

### Change log
- 已在 v7.1 中新增 onrender 属性
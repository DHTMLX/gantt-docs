---
sidebar_label: columns
title: columns config
description: "设置表格中的columns"
---

# columns

### Description

@short: 设置表格中的columns

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
- [Progress lightbox](https://docs.dhtmlx.com/gantt/samples/05_lightbox/02_progress_lightbox.html)

### Details

数组中的每一项定义了一个column。对象可以包含以下属性:

- **align?** - (*string*) - 控制column标题的水平对齐方式。可选值为 *'left'*、*'center'* 或 *'right'*；
- **hide?** - (*boolean*) - 切换column的可见性（PRO版本支持）；
- **label?** - (*string | number | any*) - 设置column的标题文字；
- **max_width?** - (*number*) - 限制column调整大小时的最大宽度；
- **min_width?** - (*number*) - 设置column调整大小时的最小宽度；
- **name?** - (*string | number*) - 标识column。使用 'add' 会创建一个带有"+"按钮的column；
- **resize?** - (*boolean*) - 允许通过拖动边框调整column大小（PRO版本支持）；
- **sort? (task1, task2): number** - (*boolean | string | Function*) - 配置点击column标题时的排序行为。设置为 *false* 可禁用排序。可以通过字符串指定任务属性进行排序，或者提供自定义排序函数。
    - **_task1_** - (*Task*) - 排序时的第一个任务对象。
    - **_task2_** - (*Task*) - 排序时的第二个任务对象。
- **template? (task): any** - 定义column数据的模板函数。
    - **_task_** - (*Task*) - 任务对象。
- **tree?** - (*boolean*) - 标记该column显示树形结构；
- **width?** - (*number | string*) - 设置column宽度；
- **onrender? (task, node): any** - 可选回调，用于自定义单元格渲染。接收任务对象和单元格的DOM元素，可以返回一个框架组件。更多信息见 [这里](guides/specifying-columns.md)；
    - **_task_** - (*Task*) - 任务对象。
    - **_node_** - (*HTMLElement*) - grid单元格的HTML元素。
- **editor?** - (*object*) - 行内编辑器配置。
    - **_type_** - (*string*) - 编辑器类型。
    - **_map_to_** - (*string*) - 编辑器更新的任务属性。
    - **_min?_** - (*Date | number*) - 日期和持续时间编辑器的最小值。
    - **_max?_** - (*Date | number*) - 日期和持续时间编辑器的最大值。
    - **_options?_** - (*Array &lt;any&gt;*) - 下拉选择编辑器的选项数组。
    - **_formatter?_** - (*DurationFormatter | LinkFormatter*) - 日期和前置任务编辑器的格式化器。

<br>

grid columns的总宽度取决于每个column的**width**属性和[grid_width](api/config/grid_width.md)的设置。如果这两个宽度不匹配，Gantt会做相应调整。

- 使用[gantt.init()](api/method/init.md)初始化时，column的**width**优先。<br>
:::note
Sample: [初始化时column宽度优先于grid宽度](https://snippet.dhtmlx.com/itnvg6z9) 
:::
- 使用[gantt.render()](api/method/render.md)渲染时，[grid_width](api/config/grid_width.md)优先。<br>
:::note
Sample: [渲染时grid宽度优先于column宽度](https://snippet.dhtmlx.com/4nb67z61) 
:::
- 使用[gantt.init()](api/method/init.md)初始化且column宽度缺失或设置为**'*'**时，[grid_width](api/config/grid_width.md)优先。<br>
:::note
Sample: [初始化时column宽度未定义或为'*'时grid宽度优先](https://snippet.dhtmlx.com/qej8w5ix) 
:::

<br>

**template**属性是一个函数，接收一个数据项并返回要显示的内容。这样可以灵活定制column的显示内容。

~~~js
gantt.config.columns = [
    { name: "text",        label: "任务名称",  tree: true, width: "*" },
    { name: "start_date",  label: "开始时间", align: "center" },
    { name: "staff",       label: "负责人", template: (obj) => {
        return `${obj.holder} (${obj.progress})`;
    } }
];

gantt.init("gantt_here");
~~~

### Related Guides
- [指定列](guides/specifying-columns.md)
- [操作指南](guides/how-to.md) （关于如何在grid中添加自定义column的详细说明）
- [操作指南](guides/how-to.md) （添加自定义add(+)按钮的说明）

### Change log
- **onrender** 属性在v7.1版本中引入


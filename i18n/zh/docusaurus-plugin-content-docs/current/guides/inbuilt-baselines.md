---
title: "时间线中的额外元素"
sidebar_label: "时间线中的额外元素"
---

# 时间线中的额外元素

:::info
此功能仅在 PRO 版本中提供
:::

默认情况下，dhtmlxGantt 会按以下顺序将时间线元素作为图层渲染:

1. 时间线的网格
2. 依赖线（Links）
3. 任务（Tasks）
4. 额外元素

Gantt 包含内置的元素，如基线（baselines）、截止日期（deadlines）和时间约束（time constraints）。除了默认的额外元素外，您还可以[创建自定义元素作为额外图层](guides/baselines.md)。

## 基线（Baselines）

基线在像 Gantt 图这样的项目管理工具中起着至关重要的作用，它允许比较计划时间线与实际进度。Gantt API 提供了对基线的内置支持，使得使用这一关键特性变得更加简单。

![内置基线](/img/inbuilt_baselines.png)


[Display baselines](https://docs.dhtmlx.com/gantt/samples/04_customization/15_baselines.html)


### 基线自定义

如果默认的基线选项不完全符合您的项目需求，可以通过 [baselines](api/config/baselines.md) 配置项将其关闭。

~~~js
gantt.config.baselines = false;
~~~

关闭后，您可以通过以下方式之一自定义基线的显示方式:

1. 使用 **gantt.config.baselines** 配置对象

该对象允许您在将其设置为对象时调整基线的渲染方式。它包含以下属性:

- **datastore** (*string*) - 存储基线条目的数据存储名称。相关细节请参见 `getDatastore` 方法。
- **render_mode** (*boolean | string*) - 控制基线的显示方式:
    - `false` - 隐藏基线。
    - `"taskRow"` - 基线显示在任务条同一行。
    - `"separateRow"` - 基线显示在独立的子行中，增加任务行高度。
    - `"individualRow"` - 每条基线在任务下方各有一行。
- **dataprocessor_baselines** (*boolean*) - 是否在更新基线时单独触发 DataProcessor。
- **row_height** (*number*) - 基线子行的高度，仅在 `render_mode` 为 `"separateRow"` 或 `"individualRow"` 时有效。
- **bar_height** (*number*) - 基线条的高度。

示例:

~~~js
gantt.config.baselines = {
  datastore: "baselines",
  render_mode: false,
  dataprocessor_baselines: false,
  row_height: 16,
  bar_height: 8
};
gantt.init("gantt_here");
~~~

如果您动态更改 **gantt.config.baselines** 的显示设置，建议使用 [adjustTaskHeightForBaselines](api/method/adjusttaskheightforbaselines.md) 方法，以确保基线正确显示。

~~~js
const task = gantt.getTask(taskId);
gantt.adjustTaskHeightForBaselines(task); /*!*/
gantt.render();
~~~

2. [创建自定义基线元素](guides/baselines.md) 并添加到时间线中。

### 与任务一起加载基线

可以像下面这样与任务一起加载基线:

~~~js
gantt.parse({
  tasks: [
    {
      id: 2,
      start_date: "2025-04-04 00:00:00",
      duration: 2,
      text: "Task #1",
      progress: 0.5,
      parent: 0,
      open: true,
      end_date: "2025-04-06 00:00:00",
    },
    // 其他任务...
  ],
  links: [],
  baselines: [ /*!*/
    { /*!*/
      id: 2, /*!*/
      task_id: 2, /*!*/
      start_date: "2025-04-03 00:00:00", /*!*/
      duration: 2, /*!*/
      end_date: "2025-04-05 00:00:00", /*!*/
    }, /*!*/
    // 其他基线... /*!*/
  ], /*!*/
});
~~~

一旦加载，Gantt 会自动在时间线上显示基线，无需额外设置。

### 获取任务的基线

您可以使用 [getTaskBaselines](api/method/gettaskbaselines.md) 方法获取指定任务的基线。

~~~js
gantt.getTaskBaselines(5);
~~~

该方法返回与任务关联的基线对象数组，来源于数据存储。

~~~js
[
    {
        task_id: 5,
        id: 1, 
        duration: 2, 
        start_date: "03-04-2019 00:00", 
        end_date: "05-04-2019 00:00"
    },
    {
        task_id: 5,
        id: 2, 
        duration: 1, 
        start_date: "06-04-2019 00:00", 
        end_date: "07-04-2019 00:00"
    }
]
~~~

### 基线在弹窗（lightbox）中的管理

基线可以通过弹窗控件直接进行管理，支持在任务详情中添加、编辑和删除。

~~~js
gantt.config.lightbox.sections = [
  { name: "description", height: 38, map_to: "text", type: "textarea", focus: true },
  { name: "time", type: "duration", map_to: "auto" },
  { name: "baselines", height: 100, type: "baselines", map_to: "baselines" }, /*!*/
];
~~~

![基线弹窗](/img/baselines_lightbox.png)

### 基线渲染模式

有三种基线显示方式，可以通过 **gantt.config.baselines.render_mode** 选项进行选择:

- 与任务同一行显示（"taskRow"）

基线直接显示在任务条旁边:

~~~js
gantt.config.baselines.render_mode = "taskRow";
~~~

![任务行模式](/img/baselines_task_row.png)

- 在任务下方的独立子行显示（"separateRow"）

所有基线在每个任务下方的一个子行中显示:

~~~js
gantt.config.baselines.render_mode = "separateRow";
~~~

![子行模式](/img/baselines_subrow.png)

- 每条基线独立一行显示（"individualRow"）

每条基线在任务下方各有一行，便于区分:

~~~js
gantt.config.baselines.render_mode = "individualRow";
~~~

![独立行模式](/img/baselines_individual_row.png)

### 设置基线文本

如需在基线元素中添加自定义文本，可使用 [baseline_text](api/template/baseline_text.md) 模板:

~~~js
gantt.templates.baseline_text = function(task, baseline, index) {
    return "Baseline #" + (index + 1);
};
~~~

## 截止日期与约束

跟踪截止日期和任务约束对于项目成功交付至关重要。DHTMLX Gantt 提供了截止日期和约束的内置可视化，帮助提升项目时间线管理。

![截止日期](/img/deadlines.png)


[Displaying deadlines](https://docs.dhtmlx.com/gantt/samples/04_customization/14_deadline.html)


### 截止日期可视化

Gantt 支持 **task.deadline** 字段。设置后，会在图表上显示一个可视化标记，帮助监控截止日期。

~~~js
gantt.parse({
  data: [
    {
      id: 1,
      text: "Task with Deadline",
      start_date: "2025-04-04",
      duration: 5,
      deadline: new Date(2025, 3, 10), // 2025年4月10日 /*!*/
    },
    // 其他任务...
  ],
});
~~~

### 截止日期自定义

如果默认的截止日期功能不符合您的需求，可以通过 [deadlines](api/config/deadlines.md) 选项将其禁用。

~~~js
gantt.config.deadlines = false;
~~~

关闭后，您可以通过[创建自定义截止日期元素](guides/baselines.md)来添加到时间线中。

**gantt.config.deadlines** 设置用于切换截止日期元素的显示。当启用时，Gantt 会检查 **task.deadline** 属性，如果包含有效日期，则在时间线上显示截止日期标记。

### 任务约束 (#taskconstraints)

自 v9.0 起，当[自动调度](guides/auto-scheduling.md)启用并处于约束模式（[auto_scheduling_compatibility](api/config/auto_scheduling_compatibility.md) 设置为 *false*）时，Gantt 会自动在图表上显示约束日期。

~~~js
gantt.parse({
  data: [
    { 
      id: 1, 
      text: "Task #1", 
      start_date: "2025-04-04", 
      duration: 4, 
      constraint_date: "2025-04-04", 
      constraint_type: "snet", 
      parent: 0
    },
    // 其他任务
  ]
})
~~~

您可以通过 [auto_scheduling](api/config/auto_scheduling.md) 配置中的 `show_constraints` 选项来控制约束的显示。默认情况下约束是可见的，但可以通过将 `show_constraints` 设置为 `false` 隐藏:

~~~js
gantt.config.auto_scheduling = {
  enabled: true,
  show_constraints: false
};
~~~


[Auto-Schedule From Project Start & Constraints](https://docs.dhtmlx.com/gantt/samples/02_extensions/19_constraints_scheduling.html)


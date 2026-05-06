--- 
title: "时间线中的额外元素" 
sidebar_label: "时间线中的额外元素" 
---

# 时间线中的额外元素

:::info
此功能仅在 PRO 版中可用
:::


默认情况下，dhtmlxGantt 将时间线区域的元素渲染为层，并按以下顺序进行：

1. 时间线的网格
2. 连线
3. 任务
4. 附加元素

Gantt 包括一些内置元素，如基线、截止日期和时间约束。除了默认的额外元素，您也可以 [创建自定义的附加层](guides/baselines.md)。

## 基线

在像甘特图这样的项目管理工具中，基线对于将计划的项目时间线与实际进度进行比较至关重要。Gantt API 提供对基线实体的内置支持，极大地简化了与这一重要元素相关的工作。

![Inbuilt baselines](/img/inbuilt_baselines.png)

[显示基线](https://docs.dhtmlx.com/gantt/samples/04_customization/15_baselines.html)

### 自定义 baselines

如果默认的 baselines 功能不符合您的项目要求，您可以使用 [baselines] 配置选项将其禁用。

~~~js
gantt.config.baselines = false;
~~~

之后，您可以通过以下任一方式自定义 baselines 的显示：

1. 使用 **gantt.config.baselines** 配置对象

**baselines** 配置选项允许在将其设置为对象时自定义甘特图中基线的呈现。对象配置包含以下属性：

- **datastore** (*string*) - 用于存储基线条目的数据存储名称。有关相关功能，请参阅 `getDatastore` 方法。
- **render_mode** (*boolean | string*) - 决定基线的显示方式：
    - `false` - 基线不显示。
    - `"taskRow"` - 基线在与任务条同一行显示。
    - `"separateRow"` - 基线在一个单独的子行中显示，扩大任务行高度。
    - `"individualRow"` - 每个基线在其下面的独立子行中显示。
- **dataprocessor_baselines** (*boolean*) - 指定基线更新是否作为单独条目触发 DataProcessor。
- **row_height** (*number*) - 定义 baselines 子行的高度，仅在 render_mode 设置为 `"separateRow"` 或 `"individualRow"` 时适用。
- **bar_height** (*number*) - 设置基线条的高度。

例如：

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

如果你动态修改 **gantt.config.baselines** 配置的显示设置，应该使用 [adjustTaskHeightForBaselines](api/method/adjusttaskheightforbaselines.md) 方法以便正确显示基线元素。

~~~js
const task = gantt.getTask(taskId);
gantt.adjustTaskHeightForBaselines(task); /*!*/
gantt.render();
~~~

2. [创建自定义基线元素](guides/baselines.md) 以添加到时间线中。

### 与任务一起加载基线

基线可以直接与任务一起加载。请查看下面的示例：

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


一旦 baselines 加载完成，Gantt 将在时间线中自动显示它们，无需额外配置。

### 获取任务基线

您可以使用 [getTaskBaselines](api/method/gettaskbaselines.md) 方法获取特定任务的基线。

~~~js
gantt.getTaskBaselines(5);
~~~

该方法将返回数据存储中指定任务的基线对象数组。

~~~
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

### 基线在灯箱中的显示

您可以通过灯箱控件管理基线。直接从任务详情中添加、编辑和删除基线。

~~~js
gantt.config.lightbox.sections = [
  { name: "description", height: 38, map_to: "text", type: "textarea", focus: true },
  { name: "time", type: "duration", map_to: "auto" },
  { name: "baselines", height: 100, type: "baselines", map_to: "baselines" }, /*!*/
];
~~~

![基线灯箱](/img/baselines_lightbox.png)

### Baselines rendering modes

Gantt 提供三种基线显示模式。您可以通过将 **gantt.config.baselines.render_mode** 配置选项设置为相应的值来选择最适合您需求的呈现模式。共有三种模式可用：

- 在与任务同一行显示（"taskRow"）

基线直接在与任务条同一行中显示：

~~~js
gantt.config.baselines.render_mode = "taskRow";
~~~

![任务行模式](/img/baselines_task_row.png)

- 在任务下方的单独子行中显示（"separateRow"）

所有基线都显示在每个任务下方的一个单独子行中：

~~~js
gantt.config.baselines.render_mode = "separateRow";
~~~

![子行模式](/img/baselines_subrow.png)

- 在一个单独的子行中显示（"individualRow"）

每个基线都显示在其子行中，以达到最大清晰度：

~~~js
gantt.config.baselines.render_mode = "individualRow";
~~~

![单独行模式](/img/baselines_individual_row.png)

### 设置基线文本

要指定应在基线元素内显示的文本，请使用 [baseline_text](api/template/baseline_text.md) 模板：

~~~js
gantt.templates.baseline_text = function(task, baseline, index) {
    return "Baseline #" + (index + 1);
};
~~~

## 截止日期与约束

在项目管理中，跟踪截止日期以及理解任务约束对于按时交付至关重要。DHTMLX Gantt 具备内置的截止日期和约束可视化，提升了有效管理项目时间线的能力。

![截止日期](/img/deadlines.png)

[显示截止日期](https://docs.dhtmlx.com/gantt/samples/04_customization/14_deadline.html)

### 截止日期可视化

Gantt 支持 **task.deadline** 字段。若已指定，它将在图表上显示一个可视化指示器，从而简化对任务截止日期的跟踪。

~~~js
gantt.parse({
  data: [
    {
      id: 1,
      text: "Task with Deadline",
      start_date: "2025-04-04",
      duration: 5,
      deadline: new Date(2025, 3, 10), // April 10, 2025 /*!*/
    },
    // 其他任务...
  ],
});
~~~

### 自定义截止日期

如果默认的截止日期功能不符合您的项目需求，您可以使用 [deadlines](api/config/deadlines.md) 配置选项将其禁用。

~~~js
gantt.config.deadlines = false;
~~~

之后，您可以通过 [创建自定义截止日期元素](guides/baselines.md) 将其添加到时间线并自定义显示。

配置项 **gantt.config.deadlines** 启用或禁用任务的截止日期元素的显示。如果启用，Gantt 将检查 **task.deadline** 属性；如果包含有效日期，则在时间线中显示截止日期元素。

### 任务约束

从 v9.0 开始，当启用并在约束模式下工作时（[自动排程](guides/auto-scheduling.md) 并且 [auto_scheduling_compatibility](api/config/auto_scheduling_compatibility.md) 设置为 *false*），Gantt 将在图表中自动显示约束日期。

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

约束的显示可以通过在 [auto_scheduling](api/config/auto_scheduling.md) 配置中的 `show_constraints` 选项进行控制。默认情况下会显示约束，但您可以通过将 `show_constraints` 设置为 `false` 来禁用它们：

~~~js
gantt.config.auto_scheduling = {
  enabled: true,
  show_constraints: false
};
~~~

[从项目开始的自动排程与约束](https://docs.dhtmlx.com/gantt/samples/02_extensions/19_constraints_scheduling.html)
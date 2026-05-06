---
title: "自动排程"
sidebar_label: "自动排程"
---

# 自动排程

:::info
该功能仅在 PRO 版本中提供。
:::

该库提供了 **auto_scheduling** 扩展，使 Gantt 能够根据任务之间的关系自动安排任务的开始时间和结束时间。

![auto_scheduling](/img/auto_scheduling.png)

例如，假设你有两个通过依赖关系连接的任务，第二个任务在第一个任务结束时开始，并且你需要通过将第一个任务移动到新日期来改变其时间表。

自动排程会在第一任务结束日期每次更改时，自动更新第二任务的开始日期。该特性允许你通过指定任务之间的关系来生成和维护项目进度，而无需手动为每个任务设置日期。

## 如何使用

要使用自动排程功能，请通过 [gantt.plugins](api/method/plugins.md) 方法启用 [auto_scheduling](guides/extensions-list.md#autoscheduling) 插件：

~~~js
gantt.plugins({
    auto_scheduling: true
});
~~~

并将 **auto_scheduling** 配置中的 **enabled** 属性设置为 *true*：

~~~js
gantt.config.auto_scheduling = {
    enabled: true
};
~~~


[Auto Scheduling extension](https://docs.dhtmlx.com/gantt/samples/02_extensions/12_auto_scheduling.html)


启用自动排程后，单个任务仍然可以手动进行排程。 

## Forward/backward planning {#forwardbackwardplanning}

### 项目计划策略

项目中有两种任务规划策略：正向规划和逆向规划。它们由以下配置设置的组合来定义：

- [gantt.config.auto_scheduling.schedule_from_end](api/config/auto_scheduling.md#schedule_from_end) - (*boolean*) 定义规划策略的类型
- [project_start](api/config/project_start.md) - (*Date*) 项目的开始日期；若应用正向规划，默认作为任务的开始日期，默认值为 *null*
- [project_end](api/config/project_end.md) - (*Date*) 项目的结束日期；若应用逆向规划，用作任务的默认结束时间，默认值为 *null*

### 正向规划

默认使用正向规划，即 **gantt.config.auto_scheduling.schedule_from_end** 设置为 *false*。

~~~js
// 正向规划将被使用
gantt.config.auto_scheduling = {
    enabled: true,
    schedule_from_end: false
};
~~~

在这种情况下，任务的排程从开始日期或最早任务的日期开始实现。若没有其他约束，任务将尽快排程。

项目开始日期可以通过 **gantt.config.project_start** 配置进行可选设置：

~~~js
gantt.config.project_start = new Date(2025, 2, 1);
~~~


[Auto-Schedule From Project Start & Constraints](https://docs.dhtmlx.com/gantt/samples/02_extensions/19_constraints_scheduling.html)


### 逆向规划 {#backwardscheduling}

同样也可以从项目结束日期开始对任务进行排程，即应用逆向规划。为此，需要将 **gantt.config.auto_scheduling.schedule_from_end** 属性设置为 *true*，并通过 **gantt.config.project_end** 配置项指定项目结束日期：

~~~js
gantt.config.project_end = new Date(2025, 10, 1);
gantt.config.auto_scheduling = {
    enabled: true,
    schedule_from_end: true
};
~~~

在这种情况下，任务将尽可能晚地被排程。最后一个任务应在项目结束日期结束。


[Auto-Schedule From Project End (backward)](https://docs.dhtmlx.com/gantt/samples/02_extensions/20_backwards_scheduling.html)


## 任务的时间约束 {#timeconstraintsfortasks}

dhtmlxGantt 提供为任务设置额外时间约束的能力。

:::note
时间约束仅适用于任务和 [milestones](guides/milestones.md)。项目不受其影响。
:::

### 通过弹出层设置约束

你可以通过任务弹出层中的 [**Constraint** 控件](guides/constraint.md) 指定任务的约束。

![Inbuilt datepicker for constraints](/img/inbuilt_constraint_datepicker.png)

~~~js
gantt.config.lightbox.sections = [
    { name: "description", height: 38, map_to: "text", type: "textarea", focus: true},
    { name: "constraint", type: "constraint" }, /*!*/
    { name: "time", type: "duration", map_to: "auto" }
];
~~~

### 通过内联编辑器设置约束

还可以在网格中 [为约束类型及其日期指定独立的列](guides/specifying-columns.md#timeconstraintsfortasks)，并使用内联编辑器为任务定义约束。

![Constraints columns](/img/constraints_columns.png)

分别使用列名 **constraint_type** 和 **constraint_date**。

~~~js
const constraintTypeEditor = {
    type: "select", map_to: "constraint_type", options: [
        { key: "asap", label: gantt.locale.labels.asap },
        { key: "alap", label: gantt.locale.labels.alap },
        { key: "snet", label: gantt.locale.labels.snet },
        // more options
    ]
};

const constraintDateEditor = {
    type: "date",
    map_to: "constraint_date",
    min: new Date(2025, 0, 1),
    max: new Date(2026, 0, 1)
};

gantt.config.columns = [
    { /* previous column */ },
    {
        name: "constraint_type", align: "center", width: 100,
        template: task => gantt.locale.labels[gantt.getConstraintType(task)],
        resize: true, editor: constraintTypeEditor
    },
    {
        name: "constraint_date", align: "center", width: 120, template: (task) => {
            // template logic
        },
        resize: true, editor: constraintDateEditor
    },
    { name: "add", width: 44 }
];
~~~


[Auto-Schedule From Project Start & Constraints](https://docs.dhtmlx.com/gantt/samples/02_extensions/19_constraints_scheduling.html)


### 约束类型

时间约束有多种类型：

1. **As soon as possible** - 如果此约束设为独立任务且开启了严格模式，则任务在与项目相同的时间开始。如果严格模式被禁用，任务在指定日期开始。

若此约束设为依赖任务，任务将在其前驱任务结束后立即开始。

2. **As late as possible** - 如果此约束设为独立任务，则任务在与项目相同的时间结束。如果此约束设为依赖任务，则任务结束与其直接后续任务的开始时间相同。

其他约束类型无论任务的类型为依赖还是独立，均会影响任务：

3. **Start no earlier than** - 任务应在指定日期或之后开始。

4. **Start no later than** - 任务应在指定日期或之前开始。

5. **Finish no earlier than** - 任务应在指定日期或之后结束。

6. **Finish no later than** - 任务应在指定日期或之前结束。

7. **Must start on** - 任务应在指定日期开始。

8. **Must finish on** - 任务应在指定日期结束。

:::note
在这里所说的独立任务，是指没有任何后继或前驱的任务。换言之，这些任务之间没有相互连接的链接/关系，且它们的父任务也没有与其他任务建立链接。
:::

## 设定任务之间的滞后与提前时间 {#settinglagandleadtimesbetweentasks}

滞后和提前时间是用于在任务之间创建复杂关系的特殊数值。

Lag 是由一个依赖关系连接的任务之间的延迟。Lead 是由依赖关系连接的任务之间的重叠。

后继任务可能有两种类型：

- 可以在前驱任务结束前开始的任务（任务 B 在任务 A 结束前开始）

例如：如果我们为依赖链接设置一个提前时间 lead 为 1 天，任务 B 将在任务 A 结束前一天开始；

- 不能在前驱任务结束后的一段延迟才开始的任务（任务 B 在任务 A 结束后的一段时间才开始）

例如：如果我们为依赖链接设置一个滞后时间 lag 为 1 天，任务 B 将在任务 A 结束后一日开始。

Lag 和 Lead 值在链接对象的附加属性 - **link.lag** 中设置：

- lag - 任何正整数值，
- lead - 滞后值的负值。

默认情况下，假设每条依赖链接的 lag 值为 0。

### 从 UI 编辑链接值

Gantt 不提供用于编辑滞后或链接其他属性的内置 UI。不过，你可以按照 [相关章节](guides/crud-dependency.md#editing-link-values-from-ui) 中的建议手动实现。

**相关示例** [Edit-lag Popup](https://snippet.dhtmlx.com/2208ic0t)

## 禁用特定任务的自动排程

若要为特定任务禁用自动排程并使其手动排程，请将任务对象的 **auto_scheduling** 属性设置为 *false*：

~~~js
const task = gantt.getTask(id);
task.auto_scheduling = false;
~~~

你也可以使用 [onBeforeTaskAutoSchedule](api/event/onbeforetaskautoschedule.md) 处理程序来阻止特定任务的自动排程：

~~~js
gantt.attachEvent("onBeforeTaskAutoSchedule", (task, start, link, predecessor) => {
    return !task.completed;
});
~~~

## 已排程完成的任务的排程

默认情况下，自动排程算法对已完成的任务（进度值为 1 的任务）与未完成的任务处理没有区别。你也可以选择启用 [auto_scheduling.use_progress](api/config/auto_scheduling.md#use_progress) 配置来改变这一行为：

~~~js
gantt.config.auto_scheduling = {
    enabled: true,
    use_progress: true
};
 
gantt.init("gantt_here");
~~~

启用该配置后，已完成的任务将不再进入关键路径和自动排程。

你可以在 [API 页面](api/config/auto_scheduling_use_progress.md) 找到更多细节。


## API 概览

可用的方法和属性列表：

- [auto_scheduling](api/config/auto_scheduling.md)
- [project_start](api/config/project_start.md)
- [project_end](api/config/project_end.md)
- [autoSchedule](api/method/autoschedule.md)
- [isUnscheduledTask](api/method/isunscheduledtask.md)
- [findCycles](api/method/findcycles.md)
- [isCircularLink](api/method/iscircularlink.md)
- [getConnectedGroup](api/method/getconnectedgroup.md)

### 启用

要在 Gantt 图中启用自动排程，请将 **auto_scheduling** 配置的 **enabled** 属性设置为 *true*：

~~~js
gantt.config.auto_scheduling = {
    enabled: true
};
~~~

### 严格模式

默认情况下，任务仅在新的日期违反约束时才重新排程。若要始终将任务排程到最早的日期，请使用属性 [auto_scheduling.gap_behavior](api/config/auto_scheduling.md#gap_behavior)：

~~~js
gantt.config.auto_scheduling = {
    enabled: true,
    apply_constraints: false,
    gap_behavior: "compress"
};
~~~

:::note
请注意，在版本 6.1.0 - 7.1.3 中，该配置仅在启用 [auto_scheduling_compatibility](api/config/auto_scheduling_compatibility.md) 选项时才生效。
:::

### 初始自动排程

[auto_scheduling.schedule_on_parse](api/config/auto_scheduling.md#schedule_on_parse) 属性指定在数据加载时 Gantt 是否执行自动排程。默认设置为 *true*：

~~~js
gantt.config.auto_scheduling = {
    enabled: true,
    schedule_on_parse: true
};
~~~

### 项目约束的继承

[auto_scheduling.project_constraint](api/config/auto_scheduling.md#project_constraint) 属性定义没有指定约束类型的任务是否应从其父项目继承约束类型：

~~~js
gantt.config.auto_scheduling = {
    enabled: true,
    project_constraint: true
};
~~~

### 重新计算项目

要重新计算整个项目的排程，请使用 [autoSchedule](api/method/autoschedule.md) 方法：

~~~js
gantt.autoSchedule();
~~~

如果需要从某个特定任务开始重新计算排程，请将该任务的 id 作为参数传递给 [autoSchedule](api/method/autoschedule.md) 方法：

~~~js
gantt.autoSchedule(taskId);
~~~

### 检查任务是否未排程

若需要检查任务是否未排程，请将任务对象作为参数调用 [isUnscheduledTask](api/method/isunscheduledtask.md) 方法：

~~~js
const isUnscheduled = gantt.isUnscheduledTask(task);
~~~

### 查找循环引用

要在图表中查找所有循环引用，请使用 [findCycles](api/method/findcycles.md) 方法：

~~~js
gantt.findCycles();
~~~

### 检查链接是否循环

若需要检查链接是否循环，可以应用 [isCircularLink](api/method/iscircularlink.md) 方法：

~~~js
const isCircular = gantt.isCircularLink(link);
~~~

### 获取连接的任务和链接

要获取一个任务连接的任务和链接的列表，请使用 [getConnectedGroup](api/method/getconnectedgroup.md) 方法：

~~~js
gantt.getConnectedGroup(18);
// => {links:["16", "17", "18"], tasks:[18, 17, 19, 20]}
~~~


## 事件列表

可用的事件如下所示：

- [onBeforeAutoSchedule](api/event/onbeforeautoschedule.md)
- [onAfterAutoSchedule](api/event/onafterautoschedule.md)
- [onBeforeTaskAutoSchedule](api/event/onbeforetaskautoschedule.md)
- [onAfterTaskAutoSchedule](api/event/onaftertaskautoschedule.md)
- [onCircularLinkError](api/event/oncircularlinkerror.md)
- [onAutoScheduleCircularLink](api/event/onautoschedulecircularlink.md)

~~~js
// 自动排程开始之前
gantt.attachEvent("onBeforeAutoSchedule", (taskId) => {
    // 这里可以放置自定义逻辑
    return true;
});

// 自动排程完成之后
gantt.attachEvent("onAfterAutoSchedule", (taskId, updatedTasks) => {
    // 这里可以放置自定义逻辑
});

// 特定任务被重新排程之前
gantt.attachEvent("onBeforeTaskAutoSchedule", (task, start, link, predecessor) => {
    // 这里可以放置自定义逻辑
    return true;
});

// 特定任务被重新排程之后
gantt.attachEvent("onAfterTaskAutoSchedule", (task, start, link, predecessor) => {
    // 这里可以放置自定义逻辑
});

// 若检测到循环引用且无法进行自动排程
gantt.attachEvent("onCircularLinkError", (link, group) => {
    // 这里可以放置自定义逻辑
});

// 若在自动排程过程中发现了循环链接
gantt.attachEvent("onAutoScheduleCircularLink", (groups) => {
    // 这里可以放置自定义逻辑
});
~~~

## 版本兼容性

当用户通过鼠标拖动任务日期或通过弹出层修改日期时，任务会自动获得两种约束类型之一：要么是 **start no earlier than+%start date%**，要么是
**finish no later than+%end date%**，具体取决于所选的规划策略。

因此，如果 UI 设置了较晚的日期，任务不会被排程到最早日期。这对于未做好准备的用户可能会造成困惑，尤其是约束默认不会在图表中显示时。

从 **v9.1** 开始，你可以通过 [auto_scheduling.show_constraints](api/config/auto_scheduling.md#show_constraints) 属性启用显示约束。较旧的版本则需要使用 [addTasklayer](api/method/addtasklayer.md) 方法将约束添加到图表中。

[Auto-Schedule From Project Start & Constraints](https://docs.dhtmlx.com/gantt/samples/02_extensions/19_constraints_scheduling.html)


此行为与 Gantt 在 **v6.1** 之前的自动排程逻辑不同，但被认为是正确的，因为它与 MS Project 的自动计划工作方式相同。

如果这不是你想要的，可以通过以下方式切换回 6.1 之前的自动排程，禁用约束：

~~~js
gantt.config.auto_scheduling = {
    enabled: true,
    apply_constraints: false
};
~~~

### 相关 API
- [auto_scheduling](api/config/auto_scheduling.md)
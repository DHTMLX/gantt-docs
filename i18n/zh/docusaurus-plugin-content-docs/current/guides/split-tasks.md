---
title: "拆分任务"
sidebar_label: "拆分任务"
---

# 拆分任务

:::note
此功能仅在 PRO 版中提供。
:::

如果你有一个不连续且可能被中断的大任务，你可以将其分成若干部分。所需部分可以按需要任意多。
在数据层面，这类任务可以表示为一个汇总任务（project）及其子任务，其中每个子任务定义主任务的一个独立部分。

![汇总任务](/img/split_task_inside.png)

你可以将其在单行中显示为一个任务：

![拆分任务](/img/split_task.png)

要将项目显示为拆分任务，需要将其 `render` 属性设置为 `split`：

~~~js
const tasks = [
    { id: 1, text: "Task #2", start_date: "03-04-2027 00:00", type: "project", render: "split" },
    { id: 2, text: "Stage #1", start_date: "03-04-2027 00:00", duration: 1, parent: 1 },
    { id: 3, text: "Stage #2", start_date: "05-04-2027 00:00", duration: 2, parent: 1 },
    { id: 4, text: "Stage #3", start_date: "08-04-2027 00:00", duration: 1, parent: 1 }
];
~~~

任务 "Task #2" 已被拆分并渲染为一组任务："Stage #1"、"Stage #2" 和 "Stage #3"，它们均可交互。

**相关示例**: [Split task](https://docs.dhtmlx.com/gantt/samples/04_customization/11_split_task.html)

要在其典型的树形模式下显示拆分任务，即作为带有子任务的项目，你只需更改 `task.render` 属性的值并重新渲染 Gantt：

~~~js
const task = gantt.getTask(1);

// 在 'split' 模式下重新绘制任务
task.render = "split";
gantt.render();

// 在常规（树形）模式下重新绘制任务
task.render = "";
gantt.render();
~~~

例如，可以将映射到 `task.render` 属性的控件添加到 lightbox，以在拆分视图和层级视图之间动态切换。请参见下节中的示例。

### 动态切换拆分模式

你可以配置 lightbox，使其允许对任务的拆分模式进行开关切换。为此，可以通过修改针对任务类型为 project 的配置设置 [`gantt.config.lightbox.project_sections`](guides/task-types.md#specificlightboxpertasktype) 并为新分区添加标签：

~~~js
gantt.locale.labels.section_split = "Display";
gantt.config.lightbox.project_sections = [
    { name: "description", height: 70, map_to: "text", type: "textarea", focus: true },
    {
        name: "split",
        type: "checkbox",
        map_to: "render",
        options: [
            { key: "split", label: "Split Task" }
        ]
    },
    { name: "time", type: "duration", readonly: true, map_to: "auto" }
];
~~~

结果将如下所示：

![拆分任务复选框](/img/split_task_checkbox.png)

当未勾选复选框时，拆分任务将作为带有子任务的项目呈现。

**相关示例**: [Split task](https://docs.dhtmlx.com/gantt/samples/04_customization/11_split_task.html)

## 检查任务是否拆分

你可以使用 [`isSplitTask()`](api/method/issplittask.md) 方法来检查任务是否已拆分。它接受任务对象作为参数，如果任务已拆分则返回 true。

~~~js
const task = gantt.getTask(1);

if (gantt.isSplitTask(task)) {
    // ...
}
~~~

## 展开/折叠拆分任务 {#expandingcollapsingsplittasks}

如果你希望直接从网格界面展开/折叠拆分任务，有一个特殊的配置选项可以帮助你。它被称为 [`open_split_tasks`](api/config/open_split_tasks.md)，它接受一个布尔值来使拆分任务可展开，反之亦然。

~~~js
gantt.config.open_split_tasks = true;
~~~

![展开拆分任务](/img/expand_split_task.png)

## 每个子任务的拆分放置

默认情况下，当父行折叠时，拆分子任务会在父行内逐条渲染；当父行展开时，它们会移动到子行。你可以通过任务对象的 `split_placement` 属性按子任务单独控制此行为，并根据父行的状态选择相应的拆分任务模式：

- 当父行处于折叠状态时：
    - `split_placement: "auto" (default)` - 子任务在父行渲染
    - `split_placement: "inline"` - 子任务在父行渲染
    - `split_placement: "subrow"` - 子任务不可见
- 当父行处于展开状态时：
    - `split_placement: "auto" (default)` - 子任务渲染为子行
    - `split_placement: "inline"` - 子任务在父行渲染
    - `split_placement: "subrow"` - 子任务渲染为子行

~~~js
const tasks = [
    // 父行在渲染时展开
    { id: 10, text: "Creative Production", start_date: "01-04-2027", render: "split", duration: 35, parent: 1 },
    // 子任务在父行渲染
    { id: 11, text: "Photo Shoot", start_date: "03-04-2027", split_placement: "inline", duration: 3, parent: 10 },
    // 子任务渲染为子行
    { id: 12, text: "Video Editing", start_date: "08-04-2027", split_placement: "subrow", duration: 10, parent: 10 },
    // 子任务在父行渲染（默认）
    { id: 13, text: "Copywriting", start_date: "04-04-2027", duration: 7, parent: 10 }
];
~~~

**相关示例**: [Per-child placement of split subtasks](https://docs.dhtmlx.com/gantt/samples/04_customization/26_custom_child_split_tasks.html)

## 过滤拆分任务

要过滤在甘特图上呈现的拆分任务的子任务，请应用 [`onBeforeSplitTaskDisplay`](api/event/onbeforesplittaskdisplay.md) 事件并返回：

- true，表示要显示的子任务
- false，表示不要显示

~~~js
gantt.attachEvent("onBeforeSplitTaskDisplay", (id, task, parent) => {
    if (task.duration < 3) {
        return false;
    }
    return true;
});
~~~

## 样式

拆分任务被定义为父项的子任务，背景中的淡绿色条是该父项的条形，并应用了额外的样式。

当拆分任务被折叠并在单行中显示时，父项的淡绿色条仍然在同一位置呈现，但不透明度和 z-index 值会有所调整。

![](/img/split_task_style.png)

**相关示例**: [Expand and collapse split tasks](https://docs.dhtmlx.com/gantt/samples/04_customization/21_open_split_task.html)

你可以像样式化时间线中的所有条一样，改变父项条的颜色，或者通过 CSS 将其完全隐藏：

~~~css
.gantt_task_line.gantt_split_parent {
    display: none;
}
~~~

**相关示例**: [Hide transparent parent bar of the split tasks](https://snippet.dhtmlx.com/svgo5vfn)

当只有一个拆分任务时，汇总项（`type="project"`）将不可见，因为它被拆分任务完全覆盖。如果没有拆分子任务，汇总项具有默认日期和持续时间。

### 样式化独立的拆分任务

从 v8.0 版本起，拆分任务进入模板函数，具有 `task.$rendered_at` 属性，包含拆分任务显示在哪一行的 id。因此，要基于显示所在的行对特定拆分任务进行样式设置，可以使用 [`task_class`](api/template/task_class.md) 模板：

~~~js
gantt.templates.task_class = (startDate, endDate, task) => {
    if (task.$rendered_at) {
        if (gantt.calculateTaskLevel(gantt.getTask(task.$rendered_at)) === 1) {
            return "phase-level-split-task";
        }
    }
    return "";
};
~~~
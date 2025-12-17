---
title: "拆分任务"
sidebar_label: "拆分任务"
---

拆分任务
=================

:::info
此功能仅在 PRO 版本中可用。
:::

如果你有一个较大的任务，该任务不是连续进行的，可以暂停和恢复，那么你可以将其拆分为多个部分。你可以创建任意数量的部分，没有数量限制。

在数据层面，这类任务表现为一个汇总任务（项目）及其子任务，每个子任务对应主任务的一个独立片段。

![汇总任务](/img/split_task_inside.png)

这些子任务可以在同一行中显示，呈现为一个任务:

![拆分任务](/img/split_task.png)

要将项目显示为拆分任务，请将其 **render** 属性设置为 *split*:

~~~js
{id: 1, text: "Task #2", start_date: "03-04-2018 00:00", type: "project", 
    render:"split", parent: 0},  /*!*/
{id: 2, text: "Task #2.1", start_date: "03-04-2018 00:00", duration: 1, 
    parent: 1},
{id: 3, text: "Task #2.2", start_date: "05-04-2018 00:00", duration: 2, 
    parent: 1},
{id: 4, text: "Task #2.3", start_date: "08-04-2018 00:00", duration: 1, 
    parent: 1}
~~~

在上述示例中，"Task#2" 被拆分并显示为任务 "Task#2.1"、"Task#2.2" 和 "Task#2.3"，这些任务都保持完全可交互。


[Split task](https://docs.dhtmlx.com/gantt/samples/04_customization/11_split_task.html)


如需切换回拆分任务的常规树形视图（即作为带子任务的项目显示），只需更改 **task.render** 属性并重新渲染 gantt:

~~~js
// 以“split”模式重新绘制任务
task.render = "split";
gantt.render();

// 以常规（树形）模式重新绘制任务
task.render = "";
gantt.render();
~~~

例如，你可以在 lightbox 中添加一个与 **task.render** 属性关联的控件，以便动态切换拆分视图和层级视图。下面提供了一个示例。

### 动态切换拆分模式

你可以通过配置 lightbox，让用户为任务开启或关闭拆分模式。为此，请在项目类型任务的设置中添加一个带复选框的新分区 -- [**gantt.config.lightbox.project_sections**](guides/task-types.md#zhenduibutongrenwuleixingdezhuanshulightbox) -- 并为新分区提供标签:

~~~js
gantt.locale.labels.section_split = "Display";
gantt.config.lightbox.project_sections = [
    {name: "description", height: 70, map_to: "text", type: "textarea", focus: true},
    {name: "split", type:"checkbox", map_to: "render", options:[
        {key:"split", label:"Split Task"}
    ]},
    {name: "time", type: "duration", readonly: true, map_to: "auto"}
];
~~~

这将生成如下界面:

![拆分任务复选框](/img/split_task_checkbox.png)

如果未勾选复选框，拆分任务将作为带有子任务的项目显示。


[Split task](https://docs.dhtmlx.com/gantt/samples/04_customization/11_split_task.html)


## 检测任务是否为拆分任务

要判断某个任务是否为拆分任务，请使用 [isSplitTask](api/method/issplittask.md) 方法。该方法接收一个任务对象，如果该任务为拆分任务，则返回 true。

~~~js
var task = gantt.getTask(1);
if(gantt.isSplitTask(task)){
  ...
}
~~~

## 展开与收起拆分任务

如果你希望直接在网格中展开或收起拆分任务，可以通过配置选项实现。该选项为 [open_split_tasks](api/config/open_split_tasks.md)，接受一个布尔值用于开启或禁用此行为。

~~~js
gantt.config.open_split_tasks = true;
~~~

![展开拆分任务](/img/expand_split_task.png)

## 筛选拆分任务

如需筛选哪些子任务显示在甘特图中，可以使用 [onBeforeSplitTaskDisplay](api/event/onbeforesplittaskdisplay.md) 事件。返回:

- *true* 显示该子任务
- *false* 隐藏该子任务

~~~js
gantt.attachEvent("onBeforeSplitTaskDisplay", function (id, task, parent) {
    if (task.duration < 3) {
        return false;
    }
    return true;
});
~~~

样式
-------------------

拆分任务是父项的子任务，子任务后方的浅绿色条代表父项的条，并带有额外样式。

当拆分任务被收起、以单行显示时，父项的浅绿色条依然存在，但会调整透明度和 z-index。

![](/img/split_task_style.png)


[Expand and collapse split tasks](https://docs.dhtmlx.com/gantt/samples/04_customization/21_open_split_task.html)


你可以像自定义 [时间线](guides/css-overview.md#shijianzhouquyuyangshistylingtimeline) 中其他条一样自定义父项条的颜色，或者通过 CSS 完全隐藏它:

~~~css
.gantt_task_line.gantt_split_parent {
    display: none;
}
~~~


当只有一个拆分任务时，汇总项（type=""project"）会变为不可见，因为它被拆分任务完全覆盖。如果没有拆分子任务，汇总项将使用默认日期和工期。"

### 单独设置拆分任务样式

从 v8.0 开始，拆分任务在模板函数中包含 *task.$rendered_at* 属性，表示拆分任务被渲染的行 ID。这样你可以通过 [task_class](api/template/task_class.md) 模板，根据显示行为特定拆分任务设置样式:

~~~js
gantt.templates.task_class = function(start, end, task) {
    if(task.$rendered_at) {
        if(gantt.calculateTaskLevel(gantt.getTask(task.$rendered_at)) === 1) {
            return "phase-level-split-task";
        }
    }
    return "";
};
~~~


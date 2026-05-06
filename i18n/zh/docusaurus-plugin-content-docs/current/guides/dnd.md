---
title: "拖动时间线中的任务"
sidebar_label: "拖动时间线中的任务"
---

# 拖动时间线中的任务

拖动允许用户快速修改任务的开始日期（结束日期）、持续时间。默认情况下，拖放功能已启用，用户可以在时间线的其行中拖动任务。

要自定义拖放行为，请使用以下事件：

- [onBeforeTaskDrag](api/event/onbeforetaskdrag.md) - 用于禁止特定任务的拖动
- [onTaskDrag](api/event/ontaskdrag.md) - 用于限制拖动区域或在用户拖动任务时提供其他逻辑
- [onAfterTaskDrag](api/event/onaftertaskdrag.md) - 在任务拖放至新位置后对其进行后处理

让我们考虑在需要自定义默认拖动行为时的典型场景：

1. [拒绝特定任务的拖动](#denying-dragging-of-specific-tasks)。
2. [拒绝将任务拖出特定日期范围](#denying-dragging-tasks-out-of-specific-dates)。
3. [在拖动父任务时同时拖动子任务](#dragging-children-together-with-the-parent)。
4. [拖动带有子任务的项目](#draggingprojectswithsubtasks)。
5. [设置最小任务时长](#setting-minimal-task-duration)。
6. [在任务拖动时自动滚动](#autoscrollduringtasksdragging)。

## 拒绝特定任务的拖动

要禁止特定任务的拖动，请使用 [onBeforeTaskDrag](api/event/onbeforetaskdrag.md) 事件：

~~~js
gantt.attachEvent("onBeforeTaskDrag", (taskId, dragMode, event) => {
    if (gantt.getGlobalTaskIndex(taskId) % 2 === 0) {
        return false; // 当全局任务索引为偶数时拒绝拖动
    }
    return true; // 当全局任务索引为奇数时允许拖动
});
~~~

## 拒绝将任务拖出特定日期范围

要禁止将任务拖出特定日期，请使用 [onTaskDrag](api/event/ontaskdrag.md) 事件。

<p style="margin-top: 20px; font-weight: bold;"> The onTaskDrag 事件： </p>

<ul style="margin-top:5px;">
  <li>在用户在时间线区域进行拖动移动（移动、调整任务大小或更改任务进度）时触发。</li>
  <li>拖动的类型作为第2个参数传递 - <b>mode</b>。</li>
  <li>拖动类型的所有可用值存储在 [drag_mode](api/config/drag_mode.md) 属性中。</li>
</ul>

<p style="margin-top: 20px; font-weight: bold;">简而言之，整个过程按以下顺序进行：</p>

<ol style="margin-top:5px;">
    <li>用户进行移动。</li>
    <li>dhtmlxGantt 根据新位置重新计算任务的日期。</li>
    <li>dhtmlxGantt 触发 [onTaskDrag](api/event/ontaskdrag.md) 事件。</li>
    <li>dhtmlxGantt 重新在甘特图中渲染任务。<br><i>由于 [onTaskDrag](api/event/ontaskdrag.md) 事件在重新计算之后触发，因此你可以在事件处理程序中为被拖动的任务指定任何自定义值，而不必担心这些值会被覆盖。结果，任务将以期望的位置呈现。</i></li>
</ol>

设想你想禁止用户将任务拖出固定的区间 **“2028年3月31日 - 2028年4月11日”**。

![custom_dnd](/img/custom_dnd.png)

那么，你可以像下面这样编写代码：

~~~js
const leftLimit = new Date(2028, 2, 31);
const rightLimit = new Date(2028, 3, 12);
const millisecondsInDay = 24 * 60 * 60 * 1000;

gantt.attachEvent("onTaskDrag", (taskId, dragMode, task, originalTask) => {
    const dragModes = gantt.config.drag_mode;

    if (dragMode === dragModes.move || dragMode === dragModes.resize) {
        const taskDuration = originalTask.duration * millisecondsInDay;

        if (+task.end_date > +rightLimit) {
            task.end_date = new Date(rightLimit);
            if (dragMode === dragModes.move) {
                task.start_date = new Date(task.end_date - taskDuration);
            }
        }

        if (+task.start_date < +leftLimit) {
            task.start_date = new Date(leftLimit);
            if (dragMode === dragModes.move) {
                task.end_date = new Date(+task.start_date + taskDuration);
            }
        }
    }
});
~~~

## 拖动子任务与父任务一起拖动

要在用户拖动父任务时同时允许拖动子任务，请使用 [onTaskDrag](api/event/ontaskdrag.md) 事件（见上文对该事件的说明）：

~~~js
gantt.attachEvent("onTaskDrag", (taskId, dragMode, task, originalTask) => {
    const dragModes = gantt.config.drag_mode;

    if (dragMode === dragModes.move) {
        const dateShift = task.start_date - originalTask.start_date;
        gantt.eachTask((child) => {
            child.start_date = new Date(+child.start_date + dateShift);
            child.end_date = new Date(+child.end_date + dateShift);
            gantt.refreshTask(child.id, true);
        }, taskId);
    }
});

// 将子任务的位置四舍五入到刻度
gantt.attachEvent("onAfterTaskDrag", (taskId, dragMode, event) => {
    const dragModes = gantt.config.drag_mode;

    if (dragMode === dragModes.move) {
        const ganttState = gantt.getState();
        gantt.eachTask((child) => {
            child.start_date = gantt.roundDate({
                date: child.start_date,
                unit: ganttState.scale_unit,
                step: ganttState.scale_step
            });
            child.end_date = gantt.calculateEndDate(
                child.start_date,
                child.duration,
                gantt.config.duration_unit
            );
            gantt.updateTask(child.id);
        }, taskId);
    }
});
~~~

**相关示例**: [拖动父任务及其子任务](https://docs.dhtmlx.com/gantt/samples/08_api/05_limit_drag_dates.html)

## 拖动带有子任务的项目 {#draggingprojectswithsubtasks}

:::info
此功能仅在 Gantt PRO 版中可用。
:::

类型为 [project type](api/config/types.md) 的任务默认不可拖动。你可以使用 [drag_project](api/config/drag_project.md) 配置来启用项目的拖放：

~~~js
gantt.config.drag_project = true;
~~~

**相关示例**: [Draggable projects](https://docs.dhtmlx.com/gantt/samples/08_api/19_draggable_projects.html)

## 将依赖任务与独立任务一起拖动

实现任务及其依赖任务一起移动有多种方式。你可以在单独的文章中了解它们 [Dragging Tasks Together with Their Dependent Tasks](guides/dragging-dependent-tasks.md)。

## 设置最小任务时长

最小任务时长可以通过 [min_duration](api/config/min_duration.md) 设置。

该选项定义在调整大小时可设置的任务最小尺寸，并可用于防止用户设置为零时长。

该值以毫秒为单位：
~~~js
// 1 天
gantt.config.min_duration = 24 * 60 * 60 * 1000;

// 或者

// 1 小时
gantt.config.min_duration = 60 * 60 * 1000;
~~~

## 在任务拖动时自动滚动 {#autoscrollduringtasksdragging}

如果你的 Gantt 图数据集很大，通常需要将任务拖到较远的位置或在距离较远的任务之间建立链接。

在这种情况下，自动滚动功能会非常有用。默认启用，但你可以通过 [autoscroll](api/config/autoscroll.md) 配置选项来管理此行为。

~~~js
gantt.config.autoscroll = false;
gantt.init("gantt_here");
~~~

此外，你还可以通过相应属性 [autoscroll_speed](api/config/autoscroll_speed.md) 调整自动滚动的速度，单位为毫秒：

~~~js
gantt.config.autoscroll = true;
gantt.config.autoscroll_speed = 50;

gantt.init("gantt_here");
~~~



## 禁用特定任务的调整大小

如果你想阻止某些任务被调整大小，可以有两种做法：

1. 通过 CSS 从 UI 中移除任务的调整大小手柄。为此，需要使用 **task_class** 模板为所需项添加额外的 CSS 类，以便通过选择器定位它们：

~~~js
gantt.templates.task_class = (startDate, endDate, task) => {
    if (task.no_resize) { // no_resize 是演示中自定义的属性
        return "no_resize";
    }
    return "";
};
~~~

然后，可以使用以下 CSS 隐藏调整大小手柄：

~~~css
.no_resize .gantt_task_drag {
    display: none !important;
}
~~~

2. 通过代码使用 [onBeforeTaskDrag](api/event/onbeforetaskdrag.md) 事件来阻止拖放。处理程序返回 *false* 将阻止调整大小：

~~~js
gantt.attachEvent("onBeforeTaskDrag", (taskId, dragMode, event) => {
    if (dragMode === "resize" && gantt.getTask(taskId).no_resize) {
        return false;
    }
    return true;
});
~~~

## 哪一边在调整任务的大小

拖放的 ["resize"](api/event/onbeforetaskdrag.md) 模式意味着用户从开始日期或结束日期之一调整任务的大小。

如果你需要知道用户在调整大小时修改的是哪个日期，可以使用 **gantt.getState().drag_from_start** 标志：

~~~js
gantt.attachEvent("onBeforeTaskDrag", (taskId, dragMode, event) => {
    if (dragMode === "resize") {
        if (gantt.getState().drag_from_start === true) {
            // 改变任务的开始日期
        } else {
            // 改变任务的结束日期
        }
    }
    return true;
});
~~~

## 禁用任务的开始日期或结束日期的调整大小

你可以使用以下选择器定位调整大小手柄：

- `.gantt_task_drag[data-bind-property="start_date"]`
- `.gantt_task_drag[data-bind-property="end_date"]`

以下 CSS 可用于禁用任务开始日期的调整大小：

~~~css
.gantt_task_drag[data-bind-property="start_date"] {
    display: none !important;
}
~~~

同样，阻止结束日期的调整大小如下：

~~~css
.gantt_task_drag[data-bind-property="end_date"] {
    display: none !important;
}
~~~

另一种方法是使用 [onBeforeTaskDrag](api/event/onbeforetaskdrag.md) 事件。处理程序返回 *false* 将阻止调整大小：

~~~js
gantt.attachEvent("onBeforeTaskDrag", (taskId, dragMode, event) => {
    if (dragMode === "resize") {
        if (gantt.getState().drag_from_start === true) {
            return false;
        } else {
            // 改变任务的结束日期
        }
    }
    return true;
});
~~~
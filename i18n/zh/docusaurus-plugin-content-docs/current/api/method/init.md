---
sidebar_label: init
title: init method
description: "在一个容器中初始化一个 dhtmlxGantt"
---

# init

### Description

@short: 在一个容器中初始化一个 dhtmlxGantt

@signature: init: (container: string | HTMLElement, from?: Date, to?: Date) =\> void

### Parameters

- `container` - (required) *string | HTMLElement* -  一个 HTML 容器（或其 id），将在其中初始化一个 dhtmlxGantt 对象

### Example

~~~jsx
gantt.config.scale_unit = "month";
gantt.config.date_scale = "%F, %Y";

gantt.init("gantt_here");
gantt.load("tasks.json");
~~~

### Details

使用 `init()` 的第二个和第三个参数来设置时间刻度的边界值：

~~~js
gantt.init("gantt_here", new Date(2027, 8, 10), new Date(2027, 8, 20));
~~~

请注意，`init()` 的日期参数是 [start_date](api/config/start_date.md) 和 [end_date](api/config/end_date.md) 配置的快捷方式。
下面的两段代码彼此等价：

~~~js
gantt.init("gantt_here", new Date(2027, 8, 10), new Date(2027, 8, 20));
~~~

和

~~~js
gantt.config.start_date = new Date(2027, 8, 10);
gantt.config.end_date = new Date(2027, 8, 20);
gantt.init("gantt_here");
~~~

这些配置的作用是定义并限制显示的日期范围。超出该范围的任务将不会被显示。

使用 `init()` 的日期参数，以及 [start_date](api/config/start_date.md) 和 [end_date](api/config/end_date.md) 配置，将取消 [fit_tasks](api/config/fit_tasks.md) 设置。

如果你希望时间刻度根据日期范围动态调整，可以跳过这些参数，或 [动态管理时间范围](guides/configuring-time-scale.md#range)。

:::note
此方法会重置通过 [`addTaskLayer()`](api/method/addtasklayer.md) 和 [`addLinkLayer()`](api/method/addlinklayer.md) 方法添加到时间线区域的自定义图层。因此，在调用 `init()` 之后，你需要重新定义它们，以便在页面上显示自定义图层。
:::

### Related API
- [start_date](api/config/start_date.md)
- [end_date](api/config/end_date.md)
- [fit_tasks](api/config/fit_tasks.md)

### Related Guides
- [dhtmlxGantt in Plain JS/HTML](guides/initializing-gantt-chart.md)
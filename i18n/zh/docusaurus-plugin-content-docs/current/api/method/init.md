---
sidebar_label: init
title: init method
description: "在指定的容器内设置一个 dhtmlxGantt"
---

# init

### Description

@short: 在指定的容器内设置一个 dhtmlxGantt

@signature: init: (container: string | HTMLElement, from?: Date, to?: Date) =\> void

### Parameters

- `container` - (required) *string | HTMLElement* -        用于创建 dhtmlxGantt 的 HTML 容器（或其 id）
- `from` - (optional) *Date* - 时间刻度（X 轴）的起始点
- `to` - (optional) *Date* - 时间刻度（X 轴）的结束点

### Example

~~~jsx
gantt.config.scale_unit = "month";
gantt.config.date_scale = "%F, %Y";

gantt.init("gantt_here");
gantt.load("tasks.json");
~~~

### Details

向此方法提供第 2 和第 3 个参数，是设置时间刻度范围的简便方式:

~~~js
gantt.init("gantt_here", new Date(2023, 08, 10), new Date(2023, 08, 20));
~~~

请注意，`gantt.init` 中的日期参数相当于对 [start_date](api/config/start_date.md) 和 [end_date](api/config/end_date.md) 配置的快捷设置。
下面的两个示例效果相同:

~~~js
gantt.init("gantt_here", new Date(2023, 08, 10), new Date(2023, 08, 20));
~~~

和

~~~js
gantt.config.start_date = new Date(2023, 08, 10);
gantt.config.end_date = new Date(2023, 08, 20);
gantt.init("gantt_here");
~~~

这些设置定义并限制了可见的日期范围，超出此范围的任务将不会显示。

在 `gantt.init` 中使用日期参数，或使用 [start_date](api/config/start_date.md) 和 [end_date](api/config/end_date.md) 配置，会覆盖 [fit_tasks](api/config/fit_tasks.md) 选项。

如果你希望时间刻度根据日期范围自动调整，可以省略这些参数，或[动态处理时间范围](guides/configuring-time-scale.md)。

:::note
 此方法会重置通过 [addTaskLayer](api/method/addtasklayer.md) 和 [addLinkLayer](api/method/addlinklayer.md) 方法添加到时间线区域的任何自定义层。因此，在调用 **gantt.init** 后，需要重新应用这些自定义层，才能使它们在页面上显示。 
:::

### Related API
- [start_date](api/config/start_date.md)
- [end_date](api/config/end_date.md)
- [fit_tasks](api/config/fit_tasks.md)

### Related Guides
- [dhtmlxGantt 在纯 JS/HTML 中的使用](guides/initializing-gantt-chart.md)


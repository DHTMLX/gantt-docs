---
title: "性能优化:提升方法"
sidebar_label: "性能优化:提升方法"
---

# 性能优化:提升方法

## 常用技术

当任务数量达到 10,000 到 20,000 条时，根据您的配置和插件，您可能会注意到在页面上渲染甘特图时出现一定的延迟。

以下是几种应对该问题的方法:

1. 禁用单元格渲染，仅渲染行（将 [show_task_cells](api/config/show_task_cells.md) 选项设置为 'false'）。
2. 在时间线区域使用背景图片代替实际线条渲染（将 [static_background](api/config/static_background.md) 选项设置为 'true'）（**PRO** 功能，适用于 v6.3 之前的版本，[详见下文](#static_background)）。
3. 启用动态加载（将 [branch_loading](api/config/branch_loading.md) 选项设置为 'true'）。
4. 通过设置 [scales](api/config/scales.md) 选项的 **unit** 属性为 "month" 或 "year" 来增加时间刻度的步长。
5. 缩小可显示日期的范围（使用 [start_date](api/config/start_date.md) 和 [end_date](api/config/end_date.md) 选项）。
6. 移除任务的进度条（将 [show_progress](api/config/show_progress.md) 选项设置为 'false'）。
7. 如果尚未启用，可通过开启 [smart_scales](api/config/smart_scales.md) 选项来加快刻度渲染速度。
8. 如果使用了 [工作时间日历](guides/working-time.md)，请务必在加载数据前配置工作时间设置。否则，任务工期会被重新计算两次--一次在加载任务时，另一次在应用新日历时。虽然不会造成错误，但可能会增加应用初始化时间。
9. 如果将 [duration_unit](api/config/duration_unit.md) 配置为 "hour" 或 "minute"，请确保 [duration_step](api/config/duration_step.md) 设置为 1。该组合会触发仅在步长为 1 时有效的工作时间计算优化。请注意，"优化"与"非优化"模式之间存在显著性能差异。


[Performance tweaks](https://docs.dhtmlx.com/gantt/samples/08_api/10_performance_tweaks.html)


## 智能渲染

智能渲染在处理大量数据时能显著提升数据渲染速度。此模式仅渲染当前屏幕可见的任务和链接。

自 v6.2 版本起，智能渲染已默认集成在核心 *dhtmlxgantt.js* 文件中，无需再单独引入 *dhtmlxgantt_smart_rendering.js* 文件。

:::note
如果您引入了旧版 *dhtmlxgantt_smart_rendering.js* 文件，将会覆盖新内置 **smart_rendering** 扩展的改进。
:::

如需关闭智能渲染，可将配置参数设置为 false:

~~~js
gantt.config.smart_rendering = false;
~~~


[Working with 30000 tasks](https://docs.dhtmlx.com/gantt/samples/02_extensions/13_smart_rendering.html)


常规的智能渲染流程会检查甘特图元素的位置是否在可视区域内，并决定是否显示该元素。

然而，对于 [自定义层](guides/baselines.md) 的智能渲染，默认仅支持垂直方向的智能渲染。这意味着自定义层会在任务所在行可见时渲染，但无法计算自定义元素的具体水平方向位置，因此整个任务行会被视为其位置。

 *关于如何为自定义层启用水平方向智能渲染，详见 [addTaskLayer](api/method/addtasklayer.md) 文章。*


### 处理大时间范围 {#static_background} 

:::info
此功能仅在 PRO 版本中提供
:::

如果您的项目使用了较大的时间范围，并且甘特图版本低于 v6.3，则可以结合启用 [static_background](api/config/static_background.md) 选项和智能渲染，在时间线区域使用背景图片代替实际线条渲染。

~~~js
gantt.config.static_background = true;
~~~

对于 v6.3 及以上版本，该选项主要用于在数据导出时减少发送到导出服务器的请求大小。


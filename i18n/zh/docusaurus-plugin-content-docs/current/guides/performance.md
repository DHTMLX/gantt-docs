--- 
title: "性能：提升性能的方法" 
sidebar_label: "性能：提升性能的方法" 
--- 

# 性能：提升性能的方法

## 常用技巧

从 10,000–20,000 个任务开始，取决于你使用的配置选项和插件，页面上的甘特图渲染可能会有延迟。

下面是解决此问题的几种方法：

1. 禁用单个单元格的渲染，仅保留行的渲染（将 [show_task_cells](api/config/show_task_cells.md) 选项设置为 'false'）
2. 将时间轴区域的背景图像设置为显示，而不是渲染实际的线条（将 [static_background](api/config/static_background.md) 选项设置为 'true'）(**PRO** 功能，对于 v6.3 之前的版本，请[在下方读取详情](#working-with-a-large-date-range)）
3. 启用动态加载（将 [branch_loading](api/config/branch_loading.md) 选项设置为 'true'）
4. 增大刻度的步长（将 [scales](api/config/scales.md) 选项的 **unit** 属性设置为 "month" 或 "year"）
5. 缩小可显示日期的范围（使用 [start_date](api/config/start_date.md) 和 [end_date](api/config/end_date.md) 选项）
6. 从任务中移除进度条（将 [show_progress](api/config/show_progress.md) 选项设置为 'false'）
7. 提升刻度渲染的速度（若未启用，请启用 [smart_scales](api/config/smart_scales.md) 选项）
8. 如果你使用 [work time calendars](guides/working-time.md)，请在加载数据到甘特图之前设置工作时间设置。否则，所有任务的持续时间将在加载任务时首次计算一次，在应用新日历时再次计算一次。无论如何，一切都应正常工作，但这种重新计算可能会增加应用程序的初始化时间。
9. 如果将 [duration_unit](api/config/duration_unit.md) 配置设置为 "hour" 或 "minute"，请确保将 [duration_step](api/config/duration_step.md) 设置为 1。这种组合在工作时间计算中激活某些优化，只有步长设置为 1 时才起作用。请注意，"优化" 模式与 "非优化" 模式之间存在显著的性能差异。

**相关示例**： [Performance tweaks](https://docs.dhtmlx.com/gantt/samples/08_api/10_performance_tweaks.html)

## 智能渲染

智能渲染技术在处理大量数据时能够显著提升数据渲染的速度。在此模式下，只对屏幕上当前可见的任务和链接进行渲染。

从 v6.2 开始，智能渲染默认启用，因为它已包含在核心的 *dhtmlxgantt.js* 文件中。因此，你不需要在页面中包含 *dhtmlxgantt_smart_rendering.js* 文件来使智能渲染工作。

:::note
如果你连接了来自旧版本的 *dhtmlxgantt_smart_rendering.js* 文件，它将覆盖新内置的 **smart_rendering** 扩展的改进。
::: 

如果你需要禁用智能渲染模式，可以将相应的配置参数设置为 false：

~~~js
gantt.config.smart_rendering = false;
~~~

**相关示例**： [Working with 30000 tasks](https://docs.dhtmlx.com/gantt/samples/02_extensions/13_smart_rendering.html)

普通智能渲染的过程是检查甘特图元素的位置是否落在屏幕可见区域内，并据此决定是否显示。

然而， [custom layers](guides/baselines.md) 的智能渲染默认仅启用垂直方向的智能渲染。这意味着，当指定任务的行位于视口中时，自定义图层将被渲染。但自定义元素的确切坐标无法计算，因此在时间轴上，整行任务将被视为其位置。

 *你可以参考 [addTaskLayer](api/method/addtasklayer.md#smart-rendering-for-custom-layers) 文章，了解如何为自定义图层启用水平智能渲染。*

### 处理大日期范围

:::note
该功能仅在 PRO 版本中可用
::: 

如果在你的项目中使用较大的日期范围，且 Gantt 版本在 v6.3 之前，你可以在智能渲染之外启用 [static_background](api/config/static_background.md) 参数，以在时间轴区域设置背景图像而不是渲染实际的线条。

~~~js
gantt.config.static_background = true;
~~~

对于 Gantt 版本高于 v6.3，此配置选项仅在你导出数据时希望减少导出服务器请求大小时才有用。
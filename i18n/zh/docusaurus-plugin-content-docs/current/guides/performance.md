--- 
title: "性能：提升性能的方法" 
sidebar_label: "性能：提升性能的方法" 
--- 

# 性能：提升性能的方法

## 常用技巧 {#common-techniques}

DHTMLX Gantt 支持大型数据集。最多包含 100,000 个任务的数据集的已发布性能测量结果可在 [JavaScript Gantt benchmarks](https://github.com/DHTMLX/js-gantt-benchmarks) 中查看。要查看 Gantt 处理大型数据集的效果，请打开[大型数据集演示](https://docs.dhtmlx.com/gantt/demos/large-dataset-performance/)。

应用程序中的性能取决于其配置、任务依赖关系、日历、自定义渲染、浏览器和硬件。请将服务器响应和数据传输与客户端渲染和调度分开测量。

处理大型数据集时，请保持[智能渲染](#smart-rendering)（渲染虚拟化）处于启用状态。如果应用程序中的某项操作很慢，请对其进行测量，并应用下面相关的技巧：

1. 将时间轴区域的背景图像设置为显示，而不是渲染实际的线条（将 [static_background](api/config/static_background.md) 选项设置为 'true'；带有自定义 CSS 类的单元格仍会作为单元格渲染）(**PRO** 功能，[在下方阅读详情](#working-with-a-large-date-range)）
2. 当只需要部分分支时，为减少初始数据传输量和浏览器内存占用，请使用[动态加载](guides/dynamic-loading.md)（将 [branch_loading](api/config/branch_loading.md) 选项设置为 'true'，**PRO** 功能）
3. 使用更粗的时间刻度（将 [scales](api/config/scales.md) 选项的 **unit** 属性设置为 "month" 或 "year"，或增大其 **step**）
4. 缩小可显示日期的范围（使用 [start_date](api/config/start_date.md) 和 [end_date](api/config/end_date.md) 选项）
5. 提升刻度渲染的速度（若未启用，请启用 [smart_scales](api/config/smart_scales.md) 选项）
6. 如果你使用 [work time calendars](guides/working-time.md)，请在加载数据到甘特图之前设置工作时间设置。如果在加载后更改工作时间设置，则必须重新计算受影响任务的持续时间。这可能不会自动发生，因此你的代码可能需要执行此操作（[查看方法](guides/working-time.md#动态更改日历)）。这种重新计算可能会增加应用程序的初始化时间。
7. 如果将 [duration_unit](api/config/duration_unit.md) 配置设置为 "hour" 或 "minute"，请确保将 [duration_step](api/config/duration_step.md) 设置为 1。这种组合在工作时间计算中激活某些优化，只有步长设置为 1 时才起作用。请注意，"优化" 模式与 "非优化" 模式之间存在显著的性能差异。
8. 若要通过一次重绘应用多个任务或链接的更改，请使用 [batchUpdate](api/method/batchupdate.md)。
9. 为保持智能渲染有效，请勿对大型图表启用 [autosize](api/config/autosize.md) 选项。在 autosize 模式下，Gantt 会增大其容器以显示所有任务，因此所有行都位于可见区域内，并且所有行都会被渲染。
10. 为避免额外的重绘，请仅在用户需要查看[关键路径](guides/critical-path.md)时才启用 [highlight_critical_path](api/config/highlight_critical_path.md)。启用此选项后，任务或链接的每次更改都会重绘整个图表。
11. 为减少时间轴中的渲染工作，请移除不需要的[自定义图层](guides/baselines.md)，尤其是经常重绘的图层。
12. 为减少每次更改时所做的工作，请检查在 Gantt 事件处理程序和模板中运行的自定义代码。例如，如果你的代码计算项目的进度，请仅在任务的进度发生变化时重新计算，而不是在每次更新或重绘时都重新计算。这同样适用于自定义图层所显示的数据。

**相关示例**： [Performance tweaks](https://docs.dhtmlx.com/gantt/samples/08_api/10_performance_tweaks.html)

## 智能渲染 {#smart-rendering}

智能渲染是 DHTMLX Gantt 对渲染虚拟化的实现。它通过仅渲染视口中可见的任务和链接来提升大型数据集的性能，同时保持所有已加载的数据可用。

从 v6.2 开始，智能渲染默认启用，因为它已包含在核心的 *dhtmlxgantt.js* 文件中。因此，你不需要在页面中包含 *dhtmlxgantt_smart_rendering.js* 文件来使智能渲染工作。

:::note
如果你连接了来自旧版本的 *dhtmlxgantt_smart_rendering.js* 文件，它将覆盖新内置的 **smart_rendering** 扩展的改进。
::: 

如果你需要禁用智能渲染模式，可以将相应的配置参数设置为 false：

~~~js
gantt.config.smart_rendering = false;
~~~

**相关示例**： [Working with 30000 tasks](https://docs.dhtmlx.com/gantt/samples/02_extensions/13_smart_rendering.html)

[custom layers](guides/baselines.md) 的智能渲染默认仅启用垂直方向的智能渲染。这意味着，当指定任务的行位于视口中时，自定义图层将被渲染。但自定义元素的确切坐标无法计算，因此在时间轴上，整行任务将被视为其位置。

 *你可以参考 [addTaskLayer](api/method/addtasklayer.md#smart-rendering-for-custom-layers) 文章，了解如何为自定义图层启用水平智能渲染。*

### 处理大日期范围 {#working-with-a-large-date-range}

:::note
该功能仅在 PRO 版本中可用
::: 

如果在你的项目中使用较大的日期范围，你可以在智能渲染之外启用 [static_background](api/config/static_background.md) 参数，以在时间轴区域设置背景图像而不是渲染实际的线条。该选项默认禁用。

~~~js
gantt.config.static_background = true;
~~~

在此模式下，通过 [timeline_cell_class](api/template/timeline_cell_class.md) 或 [timeline_cell_content](api/template/timeline_cell_content.md) 模板获得 CSS 类或内容的单元格，仍会作为单元格渲染在背景图像之上。为此，必须启用 [show_task_cells](api/config/show_task_cells.md) 和 [static_background_cells](api/config/static_background_cells.md) 选项（它们默认处于启用状态）。

自 v6.3 起，智能渲染仅渲染时间轴可见部分中的单元格，因此该选项的影响小于早期版本。该选项还会在导出数据时减小发送到导出服务器的请求的大小。
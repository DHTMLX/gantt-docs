---
title: "让 Gantt 实现自适应"
sidebar_label: "让 Gantt 实现自适应"
---

# 让 Gantt 实现自适应

在智能手机上使用 Gantt 可能会因为屏幕较小而显得不太舒适，无法一次显示所有数据。然而，可以通过配置 Gantt 以适应不同的屏幕尺寸，从而在桌面和移动设备上使用。

如果将 Gantt 的尺寸以百分比设置（例如，`width: 100%; height: 100%`），它将根据可用的容器大小进行调整。然而，默认情况下，每个网格列的最小宽度由 [`min_column_width`](api/config/min_column_width.md) 与 [`min_grid_column_width`](api/config/min_grid_column_width.md) 参数定义。当容器的宽度小于总的最小列宽时，网格将不再继续缩小。这可能会让人觉得 Gantt 不是自适应的。下列各节介绍了应对这一点、使 Gantt 真正自适应的方法。

### 调整最小列宽

一种方法是降低 [`min_column_width`](api/config/min_column_width.md) 与 [`min_grid_column_width`](api/config/min_grid_column_width.md) 的数值。随着容器变小，Gantt 能进一步收缩，从而实现类似自适应的行为：

~~~jsx
gantt.config.min_column_width = 30;
gantt.config.min_grid_column_width = 30;
~~~

**相关示例** [Gantt. Responsive container](https://snippet.dhtmlx.com/kjibqqbb)

### 为小屏幕调整布局

另一种方法是根据可用宽度切换 Gantt 的布局。当空间充足时，显示带有网格和时间线的完整布局。在窄屏幕上，为了更好地利用有限的空间，只显示网格或时间线中的一个。

这可以通过 [`onGanttRender`](api/event/onganttrender.md) 事件来实现。事件处理程序会检查 Gantt 容器的宽度、当前 [layout](api/config/layout.md) 配置，并相应地更新 Gantt 的布局。

**相关示例** [Gantt. Responsive layout: dynamically hide/show the grid depending on the screen width](https://snippet.dhtmlx.com/w4nwk5wf)
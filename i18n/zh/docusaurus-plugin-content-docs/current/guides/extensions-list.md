---
title: "全部扩展列表"
sidebar_label: "全部扩展列表"
---

# 全部扩展列表

dhtmlxGantt 包含一组扩展，用于在标准行为的基础上添加额外功能。

要使用扩展，应通过 [gantt.plugins](api/method/plugins.md) 方法来激活插件。

## 高级拖拽

提供通过拖拽创建和选择任务的功能。

~~~js
gantt.plugins({
    click_drag: true
});
~~~

#### 相关资源

文章：[通过 Drag and Drop 创建/选择任务](guides/advanced-dnd.md)

API： [click_drag](api/config/click_drag.md)

示例：[通过拖放创建新任务](https://docs.dhtmlx.com/gantt/samples/02_extensions/24_click_drag.html)

## 自动排程 {#autoscheduling}

:::note
此扩展仅在 PRO 版本中可用
:::

允许你根据任务之间的关系自动对任务进行排程。

~~~js
gantt.plugins({
    auto_scheduling: true
});
~~~

#### 相关资源

文章：[Auto Scheduling](guides/auto-scheduling.md)

API： [auto_scheduling](api/config/auto_scheduling.md)

示例：[Auto Scheduling extension](https://docs.dhtmlx.com/gantt/samples/02_extensions/12_auto_scheduling.html)

## 关键路径 {#critical-path}

:::note
此扩展仅在 PRO 版本中可用
:::

展示一组不能被延迟而不影响整个项目截止日期的任务序列。
关键路径也决定了项目可能达到的最短完成时间。

~~~js
gantt.plugins({
    critical_path: true
});
~~~

#### 相关资源

文章：[关键路径](guides/critical-path.md)

API： [highlight_critical_path](api/config/highlight_critical_path.md)

示例：[关键路径](https://docs.dhtmlx.com/gantt/samples/02_extensions/03_critical_path.html)

## 拖动时间线

允许通过鼠标拖拽来滚动时间线视图。

~~~js
gantt.plugins({
    drag_timeline: true
});
~~~

#### 相关资源

API： [drag_timeline](api/config/drag_timeline.md)

示例：[拖动时间线](https://docs.dhtmlx.com/gantt/samples/02_extensions/27_drag_timeline.html)

## 额外覆盖层

:::note
此扩展仅在 PRO 版本中可用。
:::

提供在甘特图上添加一层额外覆盖层以放置自定义内容的功能。

~~~js
gantt.plugins({
    overlay: true
});
~~~

#### 相关资源

文章：[Timeline 区域的自定义元素](guides/baselines.md#extra-overlay-for-the-chart)

示例：[带覆盖层和缩放的甘特图（S-曲线）](https://docs.dhtmlx.com/gantt/samples/02_extensions/21_overlay.html)

## 导出服务

提供启用在线导出服务的能力。

~~~js
gantt.plugins({
    export_api: true
});
~~~

#### 相关资源

文章：[导出与导入数据](guides/export-common.md)

## 全屏 {#fullscreen}

将甘特图显示为全屏模式。

~~~js
gantt.plugins({
    fullscreen: true
});
~~~

#### 相关资源

文章：[全屏模式](guides/fullscreen-mode.md)

示例：[全屏](https://docs.dhtmlx.com/gantt/samples/02_extensions/11_full_screen.html)

## 分组

:::note
此扩展仅在 PRO 版本中可用
:::

允许你按任意任务属性对任务进行分组。

~~~js
gantt.plugins({
    grouping: true
});
~~~

#### 相关资源

文章：[分组任务](guides/grouping.md)

API： [groupBy](api/method/groupby.md)

示例：[任务分组](https://docs.dhtmlx.com/gantt/samples/02_extensions/08_tasks_grouping.html)

## 键盘导航 {#keyboardnavigation}

允许借助键盘对甘特图进行导航。

~~~js
gantt.plugins({
    keyboard_navigation: true
});
~~~

#### 相关资源

文章：[无障碍访问](guides/accessibility.md)，[键盘导航](guides/keyboard-navigation.md)

API： [keyboard_navigation](api/config/keyboard_navigation.md)，[keyboard_navigation_cells](api/config/keyboard_navigation_cells.md)

## 多任务选择 {#multitaskselection}

允许一次在甘特图中选择多个任务。

~~~js
gantt.plugins({
    multiselect: true
});
~~~

#### 相关资源

文章：[多任务选择](guides/multiselection.md)

API： [multiselect](api/config/multiselect.md)

示例：[多选与缩进/取消缩进任务](https://docs.dhtmlx.com/gantt/samples/02_extensions/09_multiselection.html)

## 快速信息

提供带有任务详情的弹出信息。

~~~js
gantt.plugins({
    quick_info: true
});
~~~

#### 相关资源

文章：[“快速信息”扩展的模板（触控支持）](guides/touch-templates.md)，

[快速信息（触控支持）](guides/quick-info.md)

示例：[快速信息扩展](https://docs.dhtmlx.com/gantt/samples/02_extensions/01_quickinfo.html)

## 工具提示

为用户添加额外信息的同时避免文本溢出屏幕。

~~~js
gantt.plugins({
    tooltip: true
});
~~~

#### 相关资源

文章：[甘特元素的工具提示](guides/tooltips.md)

示例：[工具提示](https://docs.dhtmlx.com/gantt/samples/02_extensions/02_tooltip.html)

## 撤销

允许你撤销/重做所做的更改。

~~~js
gantt.plugins({
    undo: true
});
~~~

#### 相关资源

文章：[撤销/重做功能](guides/undo-redo.md)

API： [undo](api/config/undo.md)， [redo](api/config/redo.md)

示例：[在甘特图中撤销/重做更改](https://docs.dhtmlx.com/gantt/samples/02_extensions/14_undo.html)

## 垂直标记

高亮显示某些日期或日期区间。

~~~js
gantt.plugins({
    marker: true
});
~~~

#### 相关资源

文章：[添加垂直标记](guides/markers.md)

API： [addMarker](api/method/addmarker.md)，[show_markers](api/config/show_markers.md)

示例：[今日线与状态线在甘特图中（垂直标记）](https://docs.dhtmlx.com/gantt/samples/02_extensions/05_today_line.html)
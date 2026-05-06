---
sidebar_label: getState
title: getState 方法
description: "获取甘特图的当前状态"
---

# getState

### Description

@short: 获取甘特图的当前状态

@signature: getState: () =\> GanttUIState

### Returns
- ` obj` - (GanttUIState) - 状态对象

### Example

~~~jsx
const opened_task = gantt.getState().lightbox;
~~~

### Details
- **autoscroll** - (*boolean*) - 表示 Gantt 是否会自动滚动（*true*）。仅在启用 [*click_drag*](guides/extensions-list.md#advanced-drag-n-drop) 扩展时添加  
- **batch_update** - (*boolean*) - 更新模式。若在 [*batchUpdate*](api/method/batchupdate.md) 方法内部调用，则为 *true*。  
- **drag_from_start** - (*boolean | null*) - 任务调整大小的模式。*true* 表示从起始处调整大小，*false* 表示从末端调整大小。当未进行调整时，为 *null*。  
- **drag_id** - (*string | null | undefined*) - 用户当前在 Gantt 图中拖动的任务的 id。若没有任务被拖动，则为 *undefined* 或 *null*。  
- **drag_mode** - (*string | null | undefined*) - 拖拽模式。拖拽时的取值为: 'move','resize','progress','ignore'。否则为 *null* 或 *undefined*。  
- **fullscreen** - (*boolean*) - 全屏模式的标志。若 Gantt 图处于全屏模式，则为 *true*，否则为 *false*。  
- **lightbox** - (*string | null | undefined*) - 当前在 lightbox 中打开的任务的 id。若没有任务在 lightbox 中打开，则为 *undefined* 或 *null*。  
- **link_from_start** - (*boolean | null*) - 新的链接创建状态。当从前驱任务的起始处创建链接时返回 *true*。  
- **link_landing_area** - (*boolean*) - 新的链接创建状态。当鼠标指向链接拖拽元素（气泡）时返回 *true*。  
- **link_source_id** - (*string | number | null*) - 新的链接创建状态。源任务的 id。  
- **link_target_id** - (*string | number | null*) - 新的链接创建状态。目标任务的 id。  
- **link_to_start** - (*boolean*) - 新的链接创建状态。当链接创建于后继任务的起始处时返回 *true*。  
- **min_date** - (*Date*) - 图表中任务显示的起始日期  
- **max_date** - (*Date*) - 图表中任务显示的结束日期  
- **scale_unit** - (*string*) - 时间线背景网格的单位  
- **scale_step** - (*number*) - 时间线背景网格的步长  
- **selected_task** - (*string | null | undefined*) - 当前选中的任务的 id。若在 Gantt 图中没有选中任何任务，则为 *undefined* 或 *null*。

:::note
請注意，修改此物件無法改變甘特圖的行為。
:::
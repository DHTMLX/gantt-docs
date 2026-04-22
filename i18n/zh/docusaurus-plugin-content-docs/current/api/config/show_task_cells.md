---
sidebar_label: show_task_cells
title: show_task_cells config
description: "启用/禁用在图表区域显示列边框"
---

# show_task_cells

### Description

@short: 启用/禁用在图表区域显示列边框

@signature: show_task_cells: boolean

### Example

~~~jsx
//隐藏时间刻度中的列边框
gantt.config.show_task_cells = false;
 
gantt.init("gantt_here");
~~~

**Default value:** true

### Details

当属性被设为 *'false'* 时，它将禁用对单个单元格的渲染——仅渲染行。它可用于提升性能，尤其是在图表中显示大量任务时。
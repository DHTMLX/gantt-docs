---
sidebar_label: show_task_cells
title: show_task_cells config
description: "控制图表区域中列边框的显示与隐藏"
---

# show_task_cells

### Description

@short: 控制图表区域中列边框的显示与隐藏

@signature: show_task_cells: boolean

### Example

~~~jsx
//隐藏时间刻度中的列边框
gantt.config.show_task_cells = false;

gantt.init("gantt_here");
~~~

**Default value:** true

### Details

将此属性设置为 *'false'* 会停止绘制单元格，仅显示行。<br> 这有助于提升性能，尤其是在图表中处理大量任务时。

---
sidebar_label: scale_offset_minimal
title: scale_offset_minimal config
description: "控制是否使用最小刻度单位（当使用多个刻度时）作为前导和尾随空白空间的大小"
---

# scale_offset_minimal

### Description

@short: 控制是否使用最小刻度单位（当使用多个刻度时）作为前导和尾随空白空间的大小

@signature: scale_offset_minimal: boolean

### Example

~~~jsx
gantt.config.scale_offset_minimal = false;
~~~

**Default value:** true

### Details

当刻度间隔未通过 [start_date](api/config/start_date.md) 和 [end_date](api/config/end_date.md) 选项显式设置时，dhtmlxGantt 会根据最早和最晚的任务日期来确定刻度间隔。同时，它会在刻度的开始和结束处添加一个空白间隔。默认情况下，这个空白间隔与所使用的多个刻度中的最小单位相匹配。

如果关闭此选项，dhtmlxGantt 将根据 [scales](api/config/scales.md) 选项中定义的 **unit** 属性添加空白间隔。


---
sidebar_label: scale_offset_minimal
title: scale_offset_minimal 配置
description: "将最小刻度单位（在使用多条刻度时）设为前导/尾部空白区间的间隔"
---

# scale_offset_minimal

### Description

@short: 将最小刻度单位（在使用多条刻度时）设为前导/尾部空白区间的间隔

@signature: scale_offset_minimal: boolean

### Example

~~~jsx
gantt.config.scale_offset_minimal = false;
~~~

**Default value:** true

### Details

如果刻度区间未被明确指定（通过 [start_date](api/config/start_date.md)、 [end_date](api/config/end_date.md) 选项），dhtmlxGantt 将基于最早任务和最晚任务的日期来计算它。 此外，它在刻度的开头和结尾处添加一个空区间。默认情况下，这个“空区间”等于所使用刻度的最小单位（若使用多条刻度）。 

如果你禁用该选项，dhtmlxGantt 将添加一个空区间，其值等于 [scales](api/config/scales.md) 选项的 **unit** 属性的值。
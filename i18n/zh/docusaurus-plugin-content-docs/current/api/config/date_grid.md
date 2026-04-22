---
sidebar_label: date_grid
title: date_grid 配置
description: "设置表格中“Start time”列日期的格式"
---

# date_grid

### Description

@short: 设置表格中“Start time”列日期的格式

@signature: date_grid: string

### Example

~~~jsx
gantt.config.date_grid = "%d/%m/%Y";

gantt.init("gantt_here");
~~~

**Default value:** "%Y-%m-%d"

### Details

要动态更改 **grid_date** 配置（例如，在用户更改区域设置语言后），你需要重新定义 [grid_date_format](api/template/grid_date_format.md) 模板：

~~~js
function change_grid_date(){
  gantt.config.date_grid = "%d.%m.%Y";
  gantt.render()
}
gantt.templates.grid_date_format = function(date, column){
  return gantt.date.date_to_str(gantt.config.date_grid)(date);
};
~~~

**相关示例:** [动态更改 grid 中的日期](https://snippet.dhtmlx.com/qo5s7lfs)

### Related API
- [date_grid](api/template/date_grid.md)
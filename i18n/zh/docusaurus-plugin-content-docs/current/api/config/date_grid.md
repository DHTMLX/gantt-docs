---
sidebar_label: date_grid
title: date_grid config
description: "设置表格中'开始时间'列所使用的日期格式"
---

# date_grid

### Description

@short: 设置表格中"开始时间"列所使用的日期格式

@signature: date_grid: string

### Example

~~~jsx
gantt.config.date_grid = "%d/%m/%Y";

gantt.init("gantt_here");
~~~

**Default value:** "%Y-%m-%d"

### Details

要动态更新 **grid_date** 设置（例如，当用户更改语言环境时），可以重新定义 [grid_date_format](api/template/grid_date_format.md) 模板:

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


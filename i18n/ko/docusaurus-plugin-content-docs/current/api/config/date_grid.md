---
sidebar_label: date_grid
title: date_grid config
description: "테이블의 'Start time' 열에 사용되는 날짜 형식을 설정합니다."
---

# date_grid

### Description

@short: 테이블의 "Start time" 열에 사용되는 날짜 형식을 설정합니다.

@signature: date_grid: string

### Example

~~~jsx
gantt.config.date_grid = "%d/%m/%Y";

gantt.init("gantt_here");
~~~

**Default value:** "%Y-%m-%d"

### Details

**grid_date** 설정을 동적으로 변경하려면 (예: 사용자가 로케일을 변경할 때), [grid_date_format](api/template/grid_date_format.md) 템플릿을 재정의할 수 있습니다:

~~~js
function change_grid_date(){
  gantt.config.date_grid = "%d.%m.%Y";
  gantt.render()
}
gantt.templates.grid_date_format = function(date, column){
  return gantt.date.date_to_str(gantt.config.date_grid)(date);
};
~~~

**관련 샘플:** [Changing date in grid dynamically](https://snippet.dhtmlx.com/qo5s7lfs)

### Related API
- [date_grid](api/template/date_grid.md)


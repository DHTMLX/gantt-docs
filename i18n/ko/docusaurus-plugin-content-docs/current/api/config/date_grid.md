---
sidebar_label: date_grid
title: date_grid 구성
description: "표의 'Start time' 열에 표시되는 날짜 형식을 설정합니다"
---

# date_grid

### Description

@short: 표의 "Start time" 열에 표시되는 날짜 형식을 설정합니다

@signature: date_grid: string

### Example

~~~jsx
gantt.config.date_grid = "%d/%m/%Y";

gantt.init("gantt_here");
~~~

**Default value:** "%Y-%m-%d"

### Details

사용자가 로케일(locale) 언어를 변경한 후처럼 동적으로 **grid_date** 구성을 변경하려면, [grid_date_format](api/template/grid_date_format.md) 템플릿을 재정의해야 합니다:

~~~js
function change_grid_date(){
  gantt.config.date_grid = "%d.%m.%Y";
  gantt.render()
}
gantt.templates.grid_date_format = function(date, column){
  return gantt.date.date_to_str(gantt.config.date_grid)(date);
};
~~~

**Related sample:** [Changing date in grid dynamically](https://snippet.dhtmlx.com/qo5s7lfs)

### Related API
- [date_grid](api/template/date_grid.md)
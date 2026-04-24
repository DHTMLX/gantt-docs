---
sidebar_label: date_grid
title: конфигурация date_grid
description: "задает формат дат в столбце 'Start time' таблицы"
---

# date_grid

### Description

@short: Задает формат дат в столбце "Start time" таблицы

@signature: date_grid: string

### Example

~~~jsx
gantt.config.date_grid = "%d/%m/%Y";

gantt.init("gantt_here");
~~~

**Значение по умолчанию:** "%Y-%m-%d"

### Details

Чтобы динамически изменить конфигурацию **grid_date** (например, после изменения языка локали пользователем), необходимо переопределить шаблон [grid_date_format](api/template/grid_date_format.md):

~~~js
function change_grid_date(){
  gantt.config.date_grid = "%d.%m.%Y";
  gantt.render()
}
gantt.templates.grid_date_format = function(date, column){
  return gantt.date.date_to_str(gantt.config.date_grid)(date);
};
~~~

**Связанный пример:** [Changing date in grid dynamically](https://snippet.dhtmlx.com/qo5s7lfs)

### Related API
- [date_grid](api/template/date_grid.md)
---
sidebar_label: reorder_grid_columns
title: reorder_grid_columns config
description: "позволяет изменять порядок колонок в grid с помощью drag and drop"
---

# reorder_grid_columns

### Description

@short: Позволяет изменять порядок колонок в grid с помощью drag and drop

@signature: reorder_grid_columns: boolean

### Example

~~~jsx
gantt.config.reorder_grid_columns = true;
gantt.init("gantt_here");
~~~

**Default value:** false

### Related samples
- [Work and material resources](https://docs.dhtmlx.com/gantt/samples/11_resources/12_work_and_material_resources.html)

### Details

Эта функция работает как в grid, так и в resource view.

Она вводит два CSS класса:

- **.gantt_column_drag_marker** - отмечает позицию, куда будет помещена перетаскиваемая колонка
- **.gantt_grid_head_cell_dragged** - применяется к колонке, которая в данный момент перетаскивается

## События

Внутренние события grid позволяют контролировать процесс перетаскивания и сброса колонок: **onBeforeColumnDragStart**, **onAfterColumnReorder** и **onColumnDragMove**. Например:


~~~js
gantt.attachEvent("onGanttReady", function(){
      var grid = gantt.$ui.getView("grid");
      grid.attachEvent("onBeforeColumnDragStart", function(column, index){
        // пользовательский код
        return true; // вернуть false, чтобы запретить перетаскивание этой колонки
      });
      grid.attachEvent("onColumnDragMove",function(
          dragColumn, targetColumn, dragIndex, targetIndex){
        // пользовательский код
        return true; // вернуть false, чтобы заблокировать изменение порядка в эту позицию
      });
});
~~~

и

snippet "onBeforeColumnDragStart"/"onAfterColumnReorder" :
~~~js
gantt.attachEvent("onGanttReady", function(){
      var grid = gantt.$ui.getView("grid");
      grid.attachEvent("onBeforeColumnDragStart", function(column, index){
        if(column.draggedColumn.name == "text"){
              return false;
        }
        return true;
     });
      grid.attachEvent("onAfterColumnReorder", function(object){
        // доступ к конфигурации колонок после изменения порядка
        console.log(object)
      });
});
~~~

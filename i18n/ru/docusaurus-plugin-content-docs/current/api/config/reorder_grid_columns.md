---
sidebar_label: reorder_grid_columns
title: reorder_grid_columns config
description: "позволяет перемещать столбцы сетки методом перетаскивания"
---

# reorder_grid_columns

### Description

@short: Позволяет упорядочивать столбцы сетки методом перетаскивания

@signature: reorder_grid_columns: boolean

### Example

~~~jsx
gantt.config.reorder_grid_columns = true;
gantt.init("gantt_here");
~~~

**Default value:** false

### Related samples
- [Рабочие и материальные ресурсы](https://docs.dhtmlx.com/gantt/samples/11_resources/12_work_and_material_resources.html)

### Details

Эта функциональность работает как в grid, так и в resource view.

У свойства есть два CSS-класса:

- **.gantt_column_drag_marker** - CSS-класс маркера, который задаёт позицию, в которую будет помещён перетаскиваемый столбец
- **.gantt_grid_head_cell_dragged** - CSS-класс перетаскиваемого столбца

## События

Вы можете управлять поведением столбцов grid во время перетаскивания через внутренние события сетки: **onBeforeColumnDragStart**, **onAfterColumnReorder**, и **onColumnDragMove**. Например:

пример "onBeforeColumnDragStart"/"onColumnDragMove":
~~~js 
gantt.attachEvent("onGanttReady", function(){
      var grid = gantt.$ui.getView("grid");
      grid.attachEvent("onBeforeColumnDragStart", function(column, index){
        // custom code
        return true; // return false to cancel dragging a column
      });
      grid.attachEvent("onColumnDragMove",function(
          dragColumn, targetColumn, dragIndex, targetIndex){
        // custom code
        return true; //return false to cancel reordering to this position
      });
});
~~~

пример "onBeforeColumnDragStart"/"onAfterColumnReorder":
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
        // get the config of a column after reordering
        console.log(object)
      });
});
~~~
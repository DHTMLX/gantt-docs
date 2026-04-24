---
sidebar_label: reorder_grid_columns
title: reorder_grid_columns 配置
description: "启用通过拖放重新排序网格列的功能"
---

# reorder_grid_columns

### Description

@short: 允许通过拖放来重新排序 grid 列

@signature: reorder_grid_columns: boolean

### Example

~~~jsx
gantt.config.reorder_grid_columns = true;
gantt.init("gantt_here");
~~~

**Default value:** false

### Related samples
- [工作与材料资源](https://docs.dhtmlx.com/gantt/samples/11_resources/12_work_and_material_resources.html)

### Details

此功能适用于 grid 视图和资源视图。

该属性提供两种 CSS 类：

- **.gantt_column_drag_marker** - 指定拖动列将放置到的位置的标记的 CSS 类
- **.gantt_grid_head_cell_dragged** - 拖动列的 CSS 类

## 事件

您可以通过网格的内部事件在拖拽过程中处理网格列的行为：**onBeforeColumnDragStart**、**onAfterColumnReorder**、和 **onColumnDragMove**。例如：

snippet "onBeforeColumnDragStart"/"onColumnDragMove":
~~~js 
gantt.attachEvent("onGanttReady", function(){
      var grid = gantt.$ui.getView("grid");
      grid.attachEvent("onBeforeColumnDragStart", function(column, index){
        // 自定义代码
        return true; // 返回 false 可阻止拖动此列
      });
      grid.attachEvent("onColumnDragMove",function(
          dragColumn, targetColumn, dragIndex, targetIndex){
        // 自定义代码
        return true; // 返回 false 可阻止重新排序到此位置
      });
});
~~~

并且片段 "onBeforeColumnDragStart"/"onAfterColumnReorder":
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
        // 重新排序后访问列配置
        console.log(object)
      });
});
~~~
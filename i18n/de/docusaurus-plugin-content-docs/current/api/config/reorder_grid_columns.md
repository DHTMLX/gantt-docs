---
sidebar_label: reorder_grid_columns
title: reorder_grid_columns config
description: "Ermöglicht das Verschieben von Grid-Spalten per Drag & Drop"
---

# reorder_grid_columns

### Description

@short: Ermöglicht das Verschieben von Grid-Spalten per Drag & Drop

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

Diese Funktion funktioniert sowohl in der Grid- als auch in der Ressourcenansicht.

Sie führt zwei CSS-Klassen ein:

- **.gantt_column_drag_marker** - markiert die Position, an der die verschobene Spalte abgelegt wird
- **.gantt_grid_head_cell_dragged** - wird auf die aktuell verschobene Spalte angewendet

## Events

Die internen Events des Grids ermöglichen die Steuerung des Spaltenziehens und -ablegens: **onBeforeColumnDragStart**, **onAfterColumnReorder** und **onColumnDragMove**. Zum Beispiel:


~~~js
gantt.attachEvent("onGanttReady", function(){
      var grid = gantt.$ui.getView("grid");
      grid.attachEvent("onBeforeColumnDragStart", function(column, index){
        // eigener Code
        return true; // false zurückgeben, um das Ziehen dieser Spalte zu verhindern
      });
      grid.attachEvent("onColumnDragMove",function(
          dragColumn, targetColumn, dragIndex, targetIndex){
        // eigener Code
        return true; // false zurückgeben, um das Verschieben an diese Position zu blockieren
      });
});
~~~

und

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
        // Zugriff auf die Spaltenkonfiguration nach dem Verschieben
        console.log(object)
      });
});
~~~

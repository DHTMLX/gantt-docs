---
sidebar_label: reorder_grid_columns
title: reorder_grid_columns config
description: "ermöglicht das Neuordnen von Grid-Spalten per Drag-and-Drop"
---

# reorder_grid_columns

### Description

@short: Ermöglicht das Neuordnen von Grid-Spalten per Drag-and-Drop

@signature: reorder_grid_columns: boolean

### Example

~~~jsx
gantt.config.reorder_grid_columns = true;
gantt.init("gantt_here");
~~~

**Standardwert:** false

### Related samples
- [Arbeits- und Materialressourcen](https://docs.dhtmlx.com/gantt/samples/11_resources/12_work_and_material_resources.html)

### Details

Diese Funktionalität funktioniert sowohl in der Grid- als auch in der Ressourcenansicht.

Die Eigenschaft liefert zwei CSS-Klassen:

- **.gantt_column_drag_marker** - Die CSS-Klasse des Markers, der die Position angibt, an der die gezogene Spalte platziert wird
- **.gantt_grid_head_cell_dragged** - Die CSS-Klasse der gezogenen Spalte

## Ereignisse

Sie können das Verhalten der Grid-Spalten während des Ziehens und Ablegens über interne Grid-Ereignisse steuern: **onBeforeColumnDragStart**, **onAfterColumnReorder** und **onColumnDragMove**. Zum Beispiel:

snippet "onBeforeColumnDragStart"/"onColumnDragMove":
~~~js 
gantt.attachEvent("onGanttReady", function(){
      var grid = gantt.$ui.getView("grid");
      grid.attachEvent("onBeforeColumnDragStart", function(column, index){
        // benutzerdefinierter Code
        return true; // Rückgabe false zum Abbrechen des Drag-Vorgangs einer Spalte
      });
      grid.attachEvent("onColumnDragMove",function(
          dragColumn, targetColumn, dragIndex, targetIndex){
        // benutzerdefinierter Code
        return true; //Rückgabe false zum Abbrechen der Neuordnung an dieser Position
      });
});
~~~

und Snippet "onBeforeColumnDragStart"/"onAfterColumnReorder":
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
        // Abruf der Konfiguration einer Spalte nach der Neuordnung
        console.log(object)
      });
});
~~~
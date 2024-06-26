reorder_grid_columns
=============

@short: enables the possibility to reorder grid columns by drag and drop
	

@type: boolean

@default: false
@example:
gantt.config.reorder_grid_columns = true;
gantt.init("gantt_here");

@template:	api_config
@descr:
This functionality works both in grid and resource view.

The property provides two CSS classes:

- **.gantt_column_drag_marker** - the CSS class of the marker that specifies the position the dragged column will be placed to
- **.gantt_grid_head_cell_dragged** - the CSS class of the dragged column

### Events

You can handle the behavior of grid columns while they are dragged and dropped via internal events of the grid: **onBeforeColumnDragStart**, **onAfterColumnReorder**, and **onColumnDragMove**. For example:

{{snippet "onBeforeColumnDragStart"/"onColumnDragMove"}}
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

and

{{snippet "onBeforeColumnDragStart"/"onAfterColumnReorder"}}
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


@relatedsample: 11_resources/12_work_and_material_resources.html

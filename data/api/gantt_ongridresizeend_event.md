onGridResizeEnd
=============

@short: fires after the user finished dragging the grid's border to resize the grid
	
@edition: pro
@params:
- old_width	number	the initial grid's width
- new_width		number	the new grid's width

@returns:  
  - result     boolean       defines whether the default action of the event will be triggered (<b>true</b>) or canceled (<b>false</b>) 

@example:
// return false to discard the resize action
gantt.attachEvent("onGridResizeEnd", function(old_width, new_width){
	dhtmlx.message.hide(message);
	message = null;
	dhtmlx.message("Grid is now <b>" + new_width + "</b>px width" );
	return true;
});
@template:	api_event
@descr:
{{pronote This functionality is available in the PRO edition only.}}

The event is blockable. Returning *false* will cancel grid resizing.

@related:
	desktop/specifying_columns.md#resizingcolumns
@relatedapi:
	api/gantt_ongridresize_event.md
    api/gantt_ongridresizestart_event.md
    api/gantt_oncolumnresizeend_event.md
@relatedsample:
	02_extensions/04_grid_resize.html
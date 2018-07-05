onColumnResizeEnd
=============
@short: fires after the user finished dragging the column's border to resize the column
	
@edition: pro
@params:
- index			number		the column index
- column		object		the column object
- new_width		number		the new column's width

@returns:  
- result     boolean       defines whether the default action of the event will be triggered (<b>true</b>) or canceled (<b>false</b>) 

@example:
// return false to discard the resize action
gantt.attachEvent("onColumnResizeEnd", function(index, column, new_width){
	dhtmlx.message.hide(message);
	message = null;
	dhtmlx.message("Column <b>" +gantt.locale.labels["column_"+column.name]
    + "</b> is now " + new_width + "px width" );
	return true;
});

@template:	api_event
@descr:
{{pronote This functionality is available in the PRO edition only.}}

The event is blockable. Returning *false* will cancel column resizing.

@related:
	desktop/specifying_columns.md#resizingcolumns
@relatedapi:
	api/gantt_oncolumnresize_event.md
    api/gantt_oncolumnresizestart_event.md
    api/gantt_ongridresizeend_event.md
@relatedsample:
	02_extensions/04_grid_resize.html
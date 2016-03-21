onColumnResizeStart
=============

@short: fires before the user starts to drag the column's border to resize the column
	
@edition: pro
@params:
- index	number	the column index
- column	object	the column object

@returns:  
  - result     boolean       defines whether the default action of the event will be triggered (<b>true</b>) or canceled (<b>false</b>) 

@example:
// return false to discard the resize action
gantt.attachEvent("onColumnResizeStart", function(index, column){
	dhtmlx.message("Start resizing " + gantt.locale.labels["column_"+column.name]);
	return true;
});

@template:	api_event
@descr:
The event is blockable. Returning false won't allow column resizing

@related:
	desktop/specifying_columns.md#resizingcolumns
@relatedapi:
	api/gantt_oncolumnresize_event.md
    api/gantt_oncolumnresizeend_event.md
    api/gantt_ongridresizestart_event.md
@relatedsample:
	02_extensions/04_grid_resize.html
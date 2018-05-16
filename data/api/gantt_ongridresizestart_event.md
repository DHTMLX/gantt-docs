onGridResizeStart
=============

@short: fires before the user starts to drag the grid's border to resize the grid
	
@edition: pro
@params:
- old_width		number	the initial grid's width

@returns:  
- result     boolean       defines whether the default action of the event will be triggered (<b>true</b>) or canceled (<b>false</b>) 

@example:
// return false to discard the resize action
gantt.attachEvent("onGridResizeStart", function(old_width){
	dhtmlx.message("Start grid resizing");
	return true;
});

@template:	api_event
@descr:
{{pronote This functionality is available in the PRO edition only.}}

The event is blockable. Returning *false* won't allow grid resizing.

@related:
	desktop/specifying_columns.md#resizingcolumns
@relatedapi:
	api/gantt_ongridresize_event.md
    api/gantt_ongridresizeend_event.md
    api/gantt_oncolumnresizestart_event.md
@relatedsample:
	02_extensions/04_grid_resize.html
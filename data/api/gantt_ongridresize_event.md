onGridResize
=============
@short: fires when the user is dragging the grid's border to resize the grid
	
@edition: pro
@params:
- old_width		number	the initial grid's width
- new_width		number	the new grid's width


@example:
gantt.attachEvent("onGridResize", function(old_width, new_width){
	if(!message){
		message = dhtmlx.message({expire:-1,
		text:"Grid is now <b id='width_placeholder'></b><b>px</b> width"});
	}
	document.getElementById("width_placeholder").innerText = new_width;
});

@template:	api_event
@descr:

@related:
	desktop/specifying_columns.md#resizingcolumns
@relatedapi:
	api/gantt_ongridresizestart_event.md
    api/gantt_ongridresizeend_event.md
    api/gantt_oncolumnresize_event.md
@relatedsample:
	02_extensions/04_grid_resize.html
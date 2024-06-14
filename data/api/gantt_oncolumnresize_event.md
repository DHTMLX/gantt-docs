onColumnResize
=============
@short: fires when the user is dragging the column's border to resize the column
	
@edition: pro
@params:
- index			number		the column index
- column		GridColumn		the column object
- new_width		number		the new column's width


@example:
gantt.attachEvent("onColumnResize", function(index, column, new_width){
	if(!message){
		message = gantt.message({expire:-1,
		text:`<b>${gantt.locale.labels["column_"+column.name]}
        </b> is now <b id='width_placeholder'></b><b>px</b> width`});
	}
	document.getElementById("width_placeholder").innerText = new_width
});

@template:	api_event
@descr:
{{pronote This functionality is available in the PRO edition only.}}

@related:
	desktop/specifying_columns.md#resizingcolumns
@relatedapi:
	api/gantt_oncolumnresizestart_event.md
    api/gantt_oncolumnresizeend_event.md
    api/gantt_ongridresize_event.md
@relatedsample:
	02_extensions/04_grid_resize.html
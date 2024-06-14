onScaleClick
=============
@short:fires when the user clicks on the cell in the time scale

@params:
- e 	Event	a native event object
- date 	Date	the date of the clicked cell

@example:
gantt.attachEvent("onScaleClick", function (e, date) {
	//your custom code
});


@template:	api_event
@descr:

~~~js
let selected_column = null;

gantt.attachEvent("onScaleClick", function (e, date) {
	selected_column = date;
	const pos = gantt.getScrollState();
	gantt.render();
	gantt.scrollTo(pos.x, pos.y);
});

function is_selected_column (column_date){
	if(selected_column && column_date.valueOf() == selected_column.valueOf()){
		return true;
	}
	return false;
}
~~~
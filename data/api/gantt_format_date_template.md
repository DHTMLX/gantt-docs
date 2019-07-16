format_date
=============

@todo:
	check example


@short:
	сonverts a date object to a date string. Used to send data back to the server

@params:
- date		Date		the date which needs formatting

@example:
var dateToStr = gantt.date.date_to_str("%Y-%m-%d %H:%i");
gantt.templates.format_date = function(date){
    return dateToStr (date);
};

@template:	api_template

@returns:
- text    string     a text representation of the date

@descr: Check desktop/date_format.md.

@related:
	desktop/loading.md
    desktop/date_operations.md
    desktop/server_side.md
    desktop/date_format.md

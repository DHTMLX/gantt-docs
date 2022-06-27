format_date
=============

@todo:
	check example


@short:
	converts a date object to a date string. Used to send data back to the server

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

### Loading dates in ISO format

You can use ISO date format in Gantt. For this, you need to redefine functions that parse and serialize dates in Gantt:

~~~js
gantt.templates.parse_date = function(date) { 
    return new Date(date);
};
gantt.templates.format_date = function(date) { 
    return date.toISOString();
};
~~~

@related:
	desktop/loading.md
    desktop/date_operations.md
    desktop/server_side.md
    desktop/date_format.md

format_date
=============

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

### Changing the date format dynamically

If you need to change the [date format](api/gantt_date_format_config.md) dynamically, it is necessary to modify the [parse_date](api/gantt_parse_date_template.md) template in the following way:

~~~js
var cfg = gantt.config;
var strToDate = gantt.date.str_to_date(cfg.date_format, cfg.server_utc);

gantt.templates.parse_date = function(date){
    return strToDate (date);
};
~~~

@related:
	desktop/loading.md
    desktop/date_operations.md
    desktop/server_side.md
    desktop/date_format.md

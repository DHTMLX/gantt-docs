parse_date
=============

@short: converts date string into a Date object
	
@params:
- date		string		the string which need to be parsed

@example:
var cfg = gantt.config;
var strToDate = gantt.date.str_to_date(cfg.date_format, cfg.server_utc);

gantt.templates.parse_date = function(date){
    return strToDate (date);
};


@template:	api_template
@returns:
- date    Date     date object 

@descr:
This function is called from **gantt.load()** or **gantt.parse()** call to parse the *start_date/end_date* properties of tasks, if they are provided in the string format. 
This function can be redefined if you use a custom format that the default method can't parse. Check desktop/date_format.md.

[Read more about date objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date).

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

@relatedapi:
api/gantt_parse.md
api/gantt_load.md

@related:
	desktop/loading.md
    desktop/date_format.md
    desktop/server_side.md


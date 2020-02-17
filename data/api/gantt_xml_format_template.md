xml_format
=============

@short:a date object is converted into a string in conformity with this template. Used to send data back to the server
@params:
- date	Date	the date which needs formatting

@example:
gantt.templates.xml_format = function(date){
	return gantt.date.date_to_str(gantt.config.xml_date)(date);
};
@template:	api_config
@returns:
- text		string		html text which will be rendered in the gantt
@descr:

{{note The template is deprecated. Use api/gantt_format_date_template.md instead:}}

~~~js
var dateToStr = gantt.date.date_to_str("%Y-%m-%d %H:%i");
gantt.templates.format_date = function(date){
    return dateToStr (date);
};
~~~

This template is automatically generated from the api/gantt_xml_date_config.md config and can be redefined after the [initialization of gantt](api/gantt_init.md).

A custom template function can be used, if the server side expects a format that is not supported by the [gantt date helper](api/gantt_date_other.md).

For example, let's say the server side expects **start_date** as a UNIX timestamp and the request parameters should look like this:

- **start_date**:1503608400
- **duration**:4
- **text**:Task #2.2
- **parent**:3
- **end_date**:1503694800


You should set the Gantt configuration as follows:

~~~js
gantt.attachEvent("onTemplatesReady", function(){
	gantt.templates.xml_format = function(date){
		return (date.valueOf() / 1000) + "";
	}
});

gantt.init("gantt_here");
gantt.load("/data");

var dp = new gantt.dataProcessor("/data");
dp.init(gantt);
dp.setTransactionMode("REST");
~~~

@relatedapi:
	api/gantt_xml_date_config.md
	api/gantt_date_other.md
	api/gantt_xml_date_template.md
	
@related:
	desktop/conversion_templates.md
	desktop/server_side.md

@deprecated:
Use api/gantt_format_date_template.md instead:

~~~js
var dateToStr = gantt.date.date_to_str("%Y-%m-%d %H:%i");
gantt.templates.format_date = function(date){
    return dateToStr (date);
};
~~~

@changelog:
deprecated since v6.2
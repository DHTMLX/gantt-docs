date_format
=============

@short:
sets the date format that is used to parse data from a data set and to send dates back to the server
	

@type:string
@example:
gantt.config.date_format = "%Y-%m-%d %H:%i";
...
gantt.init("gantt_here");
gantt.load("/data/tasks");

@template:api_config
@descr:
This config value is used to generate api/gantt_parse_date_template.md and api/gantt_format_date_template.md template functions. 
If you want to use a custom format, you can either change this config, or redefine **parse_date** and **format_date** templates directly.

@default:"%d-%m-%Y %H:%i"
@related:
	desktop/date_format.md

    
@apigroup: Date format

@relatedapi:
api/gantt_parse_date_template.md
api/gantt_format_date_template.md


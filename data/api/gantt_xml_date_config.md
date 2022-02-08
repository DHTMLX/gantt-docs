xml_date
=============

@short: defines date formats that are used to parse data from a data set and to send data to a server
	

@deprecated: The property is deprecated.

@type: string
@default:"%d-%m-%Y %H:%i"
@example:
gantt.config.xml_date="%Y-%m-%d %H:%i";
...
gantt.init("gantt_here");
gantt.load("../data/tasks.json");


@template:	api_config
@descr:
{{note The **xml_date** property is deprecated. Use api/gantt_date_format_config.md instead:}}

~~~js
gantt.config.date_format = "%Y-%m-%d %H:%i";
...
gantt.init("gantt_here");
gantt.load("../data/tasks.json");
~~~

@related:
	desktop/date_format.md
@relatedapi:
	api/gantt_xml_date_template.md
	api/gantt_xml_format_template.md
    
@changelog:
deprecated since v6.2, removed since v7.0
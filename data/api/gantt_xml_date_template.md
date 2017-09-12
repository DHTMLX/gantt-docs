xml_date
=============
@short:a string from an XML file is converted into a date object in conformity with this template
	
@params:
- date	Date	the date which needs formatting
@example:
gantt.templates.xml_date = function(date){
	return gantt.date.date_to_str(gantt.config.xml_date)(date);
};
@template:	api_template
@returns:
- text		string		html text which will be rendered in the gantt
@descr:
This template is automatically generated from the api/gantt_xml_date_config.md config and can be redefined after the [initialization of gantt](api/gantt_init.md).

A custom template function can be used, if the format of server dates is not supported by the [gantt date helper](api/gantt_date_other.md).

For example, using UNIX time for **start_date**: 
{{snippet /data}}
~~~js
{
	"data":[
	{
		"id":1,
		"start_date":1503608400,
		"duration":10,
		"text":"Task #1",
		"parent":0,
	},
	{
		"id":2,
		"start_date":1503694800,
		"duration":4,
		"text":"Task #2",
		"parent":0,
	}],

	"links":[
	]
}
~~~

You should set the Gantt configuration as follows:

~~~js
gantt.attachEvent("onTemplatesReady", function(){
	gantt.templates.xml_date = function(dateString){
		return new Date(dateString * 1000);
	}
});

gantt.init("gantt_here");
gantt.load("/data");
~~~



@relatedapi:
	api/gantt_xml_date_config.md
	api/gantt_xml_format_template.md
	api/gantt_date_other.md
@related:
	desktop/conversion_templates.md
	
@todo:
	checked and updated